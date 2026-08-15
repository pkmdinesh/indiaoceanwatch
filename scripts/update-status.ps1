param(
    [switch]$Quiet,
    [double]$MinimumAgeHours = 0
)

$ErrorActionPreference = 'Stop'
$scriptsRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptsRoot
$outputPath = Join-Path $projectRoot 'status.json'
$attemptedAt = (Get-Date).ToString('o')

if ($MinimumAgeHours -gt 0 -and (Test-Path -LiteralPath $outputPath)) {
    try {
        $existingStatus = Get-Content -Raw -LiteralPath $outputPath | ConvertFrom-Json
        $lastUpdate = [DateTimeOffset]::Parse("$($existingStatus.updatedAt)")
        if (([DateTimeOffset]::Now - $lastUpdate).TotalHours -lt $MinimumAgeHours) {
            if (-not $Quiet) { Write-Output "Snapshot is newer than $MinimumAgeHours hours; no update required." }
            exit 0
        }
    } catch { }
}

function Get-TextContent([string]$Url) {
    (Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 45).Content
}

function Get-DailyProductAgeHours([object[]]$DateValues) {
    [string[]]$formats = @('d MMM yyyy','dd MMM yyyy','d MMMM yyyy','dd MMMM yyyy','d-MMM-yyyy','dd-MMM-yyyy','dd-MM-yyyy','yyyy-MM-dd')
    $latestIssue = $null
    foreach ($value in @($DateValues)) {
        if ([string]::IsNullOrWhiteSpace("$value")) { continue }
        $parsed = [DateTime]::MinValue
        if (-not [DateTime]::TryParseExact(
            ("$value").Trim(),
            $formats,
            [Globalization.CultureInfo]::InvariantCulture,
            [Globalization.DateTimeStyles]::AllowWhiteSpaces,
            [ref]$parsed
        )) { continue }

        # Daily OSF/PFZ products normally arrive between 17:00 and 20:00 IST.
        # Use 17:00 IST as the conservative start of the publication window.
        $issueAtFive = [DateTime]::SpecifyKind($parsed.Date.AddHours(17), [DateTimeKind]::Unspecified)
        $issueOffset = [DateTimeOffset]::new($issueAtFive, [TimeSpan]::FromMinutes(330))
        if ($null -eq $latestIssue -or $issueOffset -gt $latestIssue) { $latestIssue = $issueOffset }
    }
    if ($null -eq $latestIssue) { return $null }
    return ([DateTimeOffset]::UtcNow - $latestIssue.ToUniversalTime()).TotalHours
}

function New-HealthAlert([string]$Code, [string]$Message, [string]$LinkLabel, [string]$Url) {
    [ordered]@{ code = $Code; message = $Message; linkLabel = $LinkLabel; url = $Url }
}


function Convert-GebcoResponseToElevation([string]$Content) {
    if ([string]::IsNullOrWhiteSpace($Content)) { return $null }

    try {
        $payload = $Content | ConvertFrom-Json
        $candidates = @(
            $payload.elevation,
            $payload.value,
            $payload.value_0,
            $payload.value_list,
            $payload.features[0].properties.elevation,
            $payload.features[0].properties.value,
            $payload.features[0].properties.value_0,
            $payload.features[0].properties.value_list
        )
        foreach ($candidate in $candidates) {
            $number = 0.0
            if ($null -ne $candidate -and [double]::TryParse(
                "$candidate",
                [Globalization.NumberStyles]::Float,
                [Globalization.CultureInfo]::InvariantCulture,
                [ref]$number
            )) { return $number }
        }
    } catch { }

    foreach ($pattern in @(
        '(?i)value_0\s*[=:]\s*["'']?(-?\d+(?:\.\d+)?)',
        '(?i)value_list\s*[=:]\s*["'']?(-?\d+(?:\.\d+)?)',
        '(?i)(?:elevation|depth|bathymetry)\s*[=:]\s*["'']?(-?\d+(?:\.\d+)?)',
        '(?i)Band\s*1\s*(?:Value)?\s*[=:]\s*["'']?(-?\d+(?:\.\d+)?)',
        '(?i)pixel[_\s-]*value\s*[=:]\s*["'']?(-?\d+(?:\.\d+)?)'
    )) {
        if ($Content -match $pattern) {
            $number = 0.0
            if ([double]::TryParse(
                $Matches[1],
                [Globalization.NumberStyles]::Float,
                [Globalization.CultureInfo]::InvariantCulture,
                [ref]$number
            )) { return $number }
        }
    }
    return $null
}

function Get-GebcoElevation([double]$Latitude, [double]$Longitude) {
    if ($Latitude -lt -90 -or $Latitude -gt 90 -or $Longitude -lt -180 -or $Longitude -gt 360) { return $null }

    $delta = 0.005
    $bbox = '{0},{1},{2},{3}' -f `
        ($Longitude - $delta).ToString([Globalization.CultureInfo]::InvariantCulture), `
        ($Latitude - $delta).ToString([Globalization.CultureInfo]::InvariantCulture), `
        ($Longitude + $delta).ToString([Globalization.CultureInfo]::InvariantCulture), `
        ($Latitude + $delta).ToString([Globalization.CultureInfo]::InvariantCulture)

    foreach ($infoFormat in @('text/plain','application/json','text/html')) {
        $query = (@{
            service = 'WMS'
            version = '1.1.1'
            request = 'GetFeatureInfo'
            layers = 'GEBCO_LATEST_2'
            query_layers = 'GEBCO_LATEST_2'
            styles = ''
            format = 'image/png'
            srs = 'EPSG:4326'
            bbox = $bbox
            width = '101'
            height = '101'
            x = '50'
            y = '50'
            feature_count = '1'
            info_format = $infoFormat
        }.GetEnumerator() | ForEach-Object {
            '{0}={1}' -f [uri]::EscapeDataString($_.Key), [uri]::EscapeDataString("$($_.Value)")
        }) -join '&'
        $url = 'https://wms.gebco.net/mapserv?' + $query

        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 30
            $responseText = if ($response.Content -is [byte[]]) { [Text.Encoding]::UTF8.GetString($response.Content) } else { "$($response.Content)" }
            $elevation = Convert-GebcoResponseToElevation $responseText
            if ($null -ne $elevation) { return [double]$elevation }
        } catch { }
    }
    return $null
}

$script:CoastlineFeatures = $null
function Get-NaturalEarthCoastlineFeatures {
    if ($null -eq $script:CoastlineFeatures) {
        $coastline = Invoke-RestMethod -Uri 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_coastline.geojson' -TimeoutSec 90
        $script:CoastlineFeatures = @($coastline.features)
    }
    return $script:CoastlineFeatures
}

function Get-NearestCoastDistanceKm([double]$Latitude, [double]$Longitude) {
    try { $features = @(Get-NaturalEarthCoastlineFeatures) } catch { return $null }
    if (-not $features.Count) { return $null }
    $kmPerLongitudeDegree = 111.320 * [math]::Cos($Latitude * [math]::PI / 180)
    $kmPerLatitudeDegree = 110.574
    $minimum = [double]::PositiveInfinity
    foreach ($feature in $features) {
        $geometry = $feature.geometry
        $lines = [System.Collections.ArrayList]::new()
        if ("$($geometry.type)" -eq 'MultiLineString') {
            foreach ($coordinateLine in @($geometry.coordinates)) { [void]$lines.Add($coordinateLine) }
        } else {
            [void]$lines.Add($geometry.coordinates)
        }
        foreach ($line in $lines) {
            for ($index = 1; $index -lt $line.Count; $index++) {
                $first = $line[$index - 1]; $second = $line[$index]
                $firstDeltaLongitude = [double]$first[0] - $Longitude
                $secondDeltaLongitude = [double]$second[0] - $Longitude
                while ($firstDeltaLongitude -gt 180) { $firstDeltaLongitude -= 360 }
                while ($firstDeltaLongitude -lt -180) { $firstDeltaLongitude += 360 }
                while ($secondDeltaLongitude -gt 180) { $secondDeltaLongitude -= 360 }
                while ($secondDeltaLongitude -lt -180) { $secondDeltaLongitude += 360 }
                $ax = $firstDeltaLongitude * $kmPerLongitudeDegree
                $ay = ([double]$first[1] - $Latitude) * $kmPerLatitudeDegree
                $bx = $secondDeltaLongitude * $kmPerLongitudeDegree
                $by = ([double]$second[1] - $Latitude) * $kmPerLatitudeDegree
                $dx = $bx - $ax; $dy = $by - $ay
                if ([math]::Abs($dx) -gt 10000) { continue }
                $denominator = $dx * $dx + $dy * $dy
                $position = if ($denominator -gt 0) { -($ax * $dx + $ay * $dy) / $denominator } else { 0 }
                $position = [math]::Max(0,[math]::Min(1,$position))
                $nearestX = $ax + $position * $dx; $nearestY = $ay + $position * $dy
                $distance = [math]::Sqrt($nearestX * $nearestX + $nearestY * $nearestY)
                if ($distance -lt $minimum) { $minimum = $distance }
            }
        }
    }
    if ([double]::IsInfinity($minimum)) { return $null }
    return [math]::Round($minimum)
}

function Add-GebcoEventMetadata {
    param(
        [Parameter(Mandatory=$true)]$Event,
        [string]$TopoBathy = ''
    )

    $latitudeText = if ($Event.PSObject.Properties.Name -contains 'LATITUDE') { "$($Event.LATITUDE)" } else { "$($Event.latitude)" }
    $longitudeText = if ($Event.PSObject.Properties.Name -contains 'LONGITUDE') { "$($Event.LONGITUDE)" } else { "$($Event.longitude)" }
    $latitude = 0.0
    $longitude = 0.0
    $hasLatitude = [double]::TryParse($latitudeText,[Globalization.NumberStyles]::Float,[Globalization.CultureInfo]::InvariantCulture,[ref]$latitude)
    $hasLongitude = [double]::TryParse($longitudeText,[Globalization.NumberStyles]::Float,[Globalization.CultureInfo]::InvariantCulture,[ref]$longitude)
    $explicitlyLand = $TopoBathy -match '(?i)\bon\s+land\b|\bland\b' -and $TopoBathy -notmatch '(?i)island'

    $setting = if ($explicitlyLand) { 'LAND' } else { 'OCEANIC / MARINE' }
    $elevation = $null
    $bathymetry = $null
    $bathymetrySource = $null
    $officialDepthMatch = [regex]::Match($TopoBathy, '(?i)(\d[\d,.]*)\s*(?:m|metres?|meters?)\b')
    if (-not $explicitlyLand -and $officialDepthMatch.Success) {
        $officialDepth = 0.0
        if ([double]::TryParse(($officialDepthMatch.Groups[1].Value -replace ',',''),[Globalization.NumberStyles]::Float,[Globalization.CultureInfo]::InvariantCulture,[ref]$officialDepth)) {
            $bathymetry = [math]::Round([math]::Abs($officialDepth))
            $bathymetrySource = 'ITEWC topo_bathy'
        }
    }

    if (-not $explicitlyLand -and $null -eq $bathymetry -and $hasLatitude -and $hasLongitude) {
        $elevation = Get-GebcoElevation -Latitude $latitude -Longitude $longitude
        if ($null -ne $elevation) {
            if ([double]$elevation -ge 0) {
                $setting = 'LAND'
            } else {
                $setting = 'OCEANIC / MARINE'
                $bathymetry = [math]::Round([math]::Abs([double]$elevation))
                $bathymetrySource = 'GEBCO_LATEST_2'
            }
        }
    }

    $distanceFromCoast = $null
    $distanceMatch = [regex]::Match($TopoBathy, '(?i)(?:distance|distnace)\s+of\s+([\d,.]+)\s*km\s+from\s+(?:the\s+)?coast(?:line)?')
    if ($distanceMatch.Success) {
        $parsedDistance = 0.0
        if ([double]::TryParse(($distanceMatch.Groups[1].Value -replace ',',''),[Globalization.NumberStyles]::Float,[Globalization.CultureInfo]::InvariantCulture,[ref]$parsedDistance)) { $distanceFromCoast = [math]::Round($parsedDistance) }
    } elseif ($hasLatitude -and $hasLongitude) {
        $distanceFromCoast = Get-NearestCoastDistanceKm -Latitude $latitude -Longitude $longitude
    }

    $Event | Add-Member -NotePropertyName tectonicSetting -NotePropertyValue $setting -Force
    $Event | Add-Member -NotePropertyName gebcoElevationMeters -NotePropertyValue $elevation -Force
    $Event | Add-Member -NotePropertyName bathymetryMeters -NotePropertyValue $bathymetry -Force
    $Event | Add-Member -NotePropertyName bathymetrySource -NotePropertyValue $bathymetrySource -Force
    $Event | Add-Member -NotePropertyName distanceFromCoastKm -NotePropertyValue $distanceFromCoast -Force
    return $Event
}

function Convert-HtmlFragmentToText([string]$Html) {
    if ([string]::IsNullOrWhiteSpace($Html)) { return '' }
    $text = $Html `
        -replace '(?is)<script\b.*?</script>', ' ' `
        -replace '(?is)<style\b.*?</style>', ' ' `
        -replace '(?is)<br\s*/?>', ' ' `
        -replace '(?is)<[^>]+>', ' '
    $text = [Net.WebUtility]::HtmlDecode($text)
    $text = $text -replace "$([char]0x00A0)", ' ' -replace '\s+', ' '
    return $text.Trim()
}

function Resolve-IncoisUrl([string]$Href, [string]$BaseUrl = 'https://incois.gov.in/site/services/jointbulletin.jsp') {
    $value = [Net.WebUtility]::HtmlDecode("$Href").Trim()
    if (-not $value) { return $null }
    try { return ([Uri]::new([Uri]$BaseUrl, $value)).AbsoluteUri }
    catch { return $value }
}

function Clean-JointBulletinMessage([string]$Value) {
    $message = Convert-HtmlFragmentToText $Value
    if (-not $message) { return '' }
    $message = $message -replace '(?i)^\s*INCOIS\s*[-\u2013\u2014]\s*IMD\s+Joint(?:\s+Special)?\s+Bulletin\s*[-\u2013\u2014:]?\s*', ''
    $message = $message -replace '(?i)^\s*Ocean\s+State\s+Forecast\s+associated\s+with\s*[-\u2013\u2014:]?\s*', ''
    return $message.Trim()
}

function Get-JointBulletinSummary {
    $sourcePage = 'https://incois.gov.in/site/services/jointbulletin.jsp'
    $html = Get-TextContent $sourcePage
    $candidates = @()

    foreach ($rowMatch in [regex]::Matches($html, '(?is)<tr\b[^>]*>(?<row>.*?)</tr>')) {
        $rowHtml = $rowMatch.Groups['row'].Value
        $links = @([regex]::Matches($rowHtml, '(?is)<a\b[^>]*\bhref\s*=\s*([''"])(?<href>.*?)\1[^>]*>(?<label>.*?)</a>'))
        foreach ($linkMatch in $links) {
            $href = [Net.WebUtility]::HtmlDecode($linkMatch.Groups['href'].Value).Trim()
            if ($href -notmatch '(?i)\.pdf(?:$|[?#])') { continue }
            if ($href -notmatch '(?i)JointBulletin|joint_') { continue }

            $url = Resolve-IncoisUrl $href $sourcePage
            $cellTexts = @([regex]::Matches($rowHtml, '(?is)<td\b[^>]*>(?<cell>.*?)</td>') | ForEach-Object {
                Convert-HtmlFragmentToText $_.Groups['cell'].Value
            } | Where-Object { $_ -and $_ -notmatch '(?i)^\s*(description|bulletin)\s*$' })

            $description = $cellTexts |
                Where-Object { $_ -notmatch '(?i)^\s*(pdf|download|view|open)\s*$' } |
                Sort-Object Length -Descending |
                Select-Object -First 1
            if (-not $description) { $description = Convert-HtmlFragmentToText $rowHtml }
            $message = Clean-JointBulletinMessage $description
            if (-not $message) { $message = 'Latest INCOIS-IMD joint bulletin' }

            $timestampMilliseconds = [int64]0
            $issued = $null
            if ($url -match '(?i)joint_(\d{13})(?:\D|$)') {
                $timestampMilliseconds = [int64]$Matches[1]
                try { $issued = [DateTimeOffset]::FromUnixTimeMilliseconds($timestampMilliseconds) } catch { $issued = $null }
            }

            $candidates += [pscustomobject][ordered]@{
                message = $message
                url = $url
                issued = $issued
                sortValue = $timestampMilliseconds
            }
        }
    }

    if ($candidates.Count -eq 0) {
        foreach ($linkMatch in [regex]::Matches($html, '(?is)<a\b[^>]*\bhref\s*=\s*([''"])(?<href>.*?)\1[^>]*>(?<label>.*?)</a>')) {
            $href = [Net.WebUtility]::HtmlDecode($linkMatch.Groups['href'].Value).Trim()
            if ($href -notmatch '(?i)\.pdf(?:$|[?#])' -or $href -notmatch '(?i)JointBulletin|joint_') { continue }
            $url = Resolve-IncoisUrl $href $sourcePage
            $timestampMilliseconds = [int64]0
            $issued = $null
            if ($url -match '(?i)joint_(\d{13})(?:\D|$)') {
                $timestampMilliseconds = [int64]$Matches[1]
                try { $issued = [DateTimeOffset]::FromUnixTimeMilliseconds($timestampMilliseconds) } catch { $issued = $null }
            }
            $candidates += [pscustomobject][ordered]@{
                message = 'Latest INCOIS-IMD joint bulletin'
                url = $url
                issued = $issued
                sortValue = $timestampMilliseconds
            }
        }
    }

    if ($candidates.Count -eq 0) { throw 'No joint bulletin PDF link was found on the INCOIS page' }
    $latest = $candidates | Sort-Object sortValue -Descending | Select-Object -First 1
    $issuedAt = $null
    $isRecent = $false
    if ($null -ne $latest.issued) {
        $issuedAt = $latest.issued.ToOffset([TimeSpan]::FromMinutes(330)).ToString('o')
        $ageHours = ([DateTimeOffset]::UtcNow - $latest.issued.ToUniversalTime()).TotalHours
        $isRecent = $ageHours -ge 0 -and $ageHours -lt 24
    }

    return [ordered]@{
        message = $latest.message
        url = $latest.url
        issuedAt = $issuedAt
        isRecent = $isRecent
        fetchedAt = (Get-Date).ToString('o')
        ok = $true
        sourcePage = $sourcePage
        lastError = $null
    }
}

function Get-StateName($Item) {
    foreach ($name in @('State', 'state', 'STATE', 'StateName', 'stateName')) {
        if ($null -ne $Item.$name -and "$($Item.$name)".Trim()) { return "$($Item.$name)".Trim().ToUpperInvariant() }
    }
    return $null
}

function Get-AlertName($Item) {
    foreach ($name in @('Alert', 'alert', 'ALERT', 'serviceAlert', 'ServiceAlert')) {
        if ($null -ne $Item.$name -and "$($Item.$name)".Trim()) { return "$($Item.$name)".Trim().ToUpperInvariant() }
    }
    return $null
}

function Convert-IncoisDate([string]$Value) {
    if ($Value -match '^\d{8}$') {
        return [DateTime]::ParseExact($Value, 'yyyyMMdd', [Globalization.CultureInfo]::InvariantCulture).ToString('dd MMM yyyy')
    }
    return $Value
}

function Get-TsunamiState([string]$Text) {
    $value = "$Text".Trim()
    if (-not $value) { return 'watch' }
    if ($value -match '(?i)\bthreat\s+(?:has\s+)?passed\b') { return 'passed' }
    if ($value -match '(?i)(?:^no\s+tsunami\.?$|\btsunami\s+threat\s+does\s+not\s+exist\b|\bno\s+tsunami\s+threat\b|\bno\s+threat\b)') { return 'safe' }
    if ($value -match '(?i)(?:\bwarning\b|\btsunami\s+threat\s+exists\b)') { return 'warning' }
    if ($value -match '(?i)(?:\balert\b|\bmay\s+be\b.*\btsunami\b|\bpossibility\s+of\s+(?:a\s+)?tsunami\b|\bpotential\s+tsunami\b)') { return 'alert' }
    if ($value -match '(?i)\bwatch\b') { return 'watch' }
    return 'watch'
}

function Get-BulletinSummary([string]$DetailUrl, [string]$EventId, [int]$BulletinNumber) {
    $bulletin = Invoke-RestMethod -Uri $DetailUrl -TimeoutSec 45
    $info = @($bulletin.event_info) | Select-Object -First 1
    if ($null -eq $info) { throw 'ITEWC bulletin contains no event information' }
    $evaluation = "$($info.evaluation)".Trim()
    $stateText = @($info.alertStatus, $info.alert_status, $info.status, $evaluation, $info.advice) -join ' '
    [ordered]@{
        number = $BulletinNumber
        type = if ("$($info.bulletinType)".Trim()) { "$($info.bulletinType)".Trim() } else { "$BulletinNumber" }
        issuedAt = "$($info.bulletinIssueTime)".Trim()
        message = $evaluation
        state = Get-TsunamiState $stateText
        eventId = $EventId
        magnitude = "$($info.eventMagnitude)".Trim()
        location = "$($info.Location)".Trim()
        originDate = "$($info.EQDate)".Trim()
        originTime = "$($info.EQTime)".Trim()
        depth = "$($info.eventDepth)".Trim()
        latitude = "$($info.eventLat)".Trim()
        longitude = "$($info.eventLon)".Trim()
        oceanParameter = "$($info.ocean_para)".Trim()
        topographyBathymetry = "$($info.topo_bathy)".Trim()
        advice = "$($info.advice)".Trim()
        updates = "$($info.updates)".Trim()
        sequence = @()
        url = "https://tsunami.incois.gov.in/TEWS/displaybulletinslatest.jsp?type=NTWC&eventId=$EventId&aos=public&currBullNo=$BulletinNumber&latestBullNo=$BulletinNumber"
    }
}

function Get-BulletinSequence([string]$LatestDetailUrl, [string]$EventId, [int]$LatestBulletinNumber) {
    $sequence = @()
    for ($number = 1; $number -le $LatestBulletinNumber; $number++) {
        $detailUrl = $LatestDetailUrl -replace '/B\d+/', "/B$number/" -replace '_B\d+_', "_B${number}_"
        try { $sequence += Get-BulletinSummary $detailUrl $EventId $number } catch { }
    }
    return @($sequence)
}

function Get-StormSurgeBulletinSummary([string]$CycloneName, [int]$BulletinNumber) {
    $url = "https://tsunami.incois.gov.in/TEWS/SSMBulletin.jsp?cyclone=$([uri]::EscapeDataString($CycloneName))&bno=$BulletinNumber"
    $html = Get-TextContent $url
    $plainText = [Net.WebUtility]::HtmlDecode(($html -replace '(?is)<script\b.*?</script>', ' ' -replace '(?is)<style\b.*?</style>', ' ' -replace '(?is)<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
    $advice = if ($plainText -match '(?is)\bADVICE\b\s*(.*?)\s*\bNEXT\s+ADVISORY\b') { $Matches[1].Trim() } else { 'Open the official bulletin for the latest advice.' }
    $issuedAt = if ($plainText -match '(?i)Issued\s+Time\s*\(IST\)\s*:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}\s+[0-9:.]+)') { $Matches[1].Trim() } else { $null }
    [ordered]@{
        number = $BulletinNumber
        cyclone = $CycloneName
        issuedAt = $issuedAt
        message = $advice
        url = $url
    }
}

$status = [ordered]@{
    updatedAt = $null
    lastAttemptAt = $attemptedAt
    updateIntervalHours = 0.25
    source = 'INCOIS / ITEWC'
    marineHeatWave = [ordered]@{ message = $null; fetchedAt = $null; ok = $false; url = 'https://incois.gov.in/oceanservices/mhw/index.jsp' }
    tsunami = [ordered]@{ message = 'Status unavailable'; state = 'watch'; ok = $false; bulletin = $null; recentBulletin = $null }
    seismic = [ordered]@{ message = 'Status unavailable'; count = $null; latest = $null; recentEvents = @() }
    highWave = [ordered]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @(); states = @() }
    swellSurge = [ordered]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @(); states = @() }
    oceanCurrent = [ordered]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @(); states = @() }
    stormSurge = [ordered]@{ message = 'Status unavailable'; ok = $false; bulletin = $null; recentBulletin = $null }
    cyclone = [ordered]@{ title = 'No active cyclone advisory'; message = ''; level = 'safe'; issuedAt = $null; link = $null; items = @() }
    jointBulletin = [ordered]@{ message = 'No INCOIS-IMD joint bulletin is currently available.'; url = 'https://incois.gov.in/site/services/jointbulletin.jsp'; issuedAt = $null; isRecent = $false; fetchedAt = $null; ok = $false; sourcePage = 'https://incois.gov.in/site/services/jointbulletin.jsp'; lastError = $null }
    pfz = [ordered]@{
        forecastDate = $null
        validUntil = $null
        sectors = @()
    }
    errors = @()
    healthAlerts = @()
    freshness = [ordered]@{ thresholdHours = 36; osfAgeHours = $null; pfzAgeHours = $null }
}

# Preserve the last successful values when an official endpoint is temporarily unavailable.
if (Test-Path -LiteralPath $outputPath) {
    try {
        $savedStatus = Get-Content -Raw -LiteralPath $outputPath | ConvertFrom-Json
        if ($savedStatus.PSObject.Properties.Name -notcontains 'lastAttemptAt') {
            $savedStatus | Add-Member -NotePropertyName lastAttemptAt -NotePropertyValue $attemptedAt
        } else {
            $savedStatus.lastAttemptAt = $attemptedAt
        }
        $savedStatus.updateIntervalHours = 0.25
        $savedStatus.errors = @()
        if ($savedStatus.PSObject.Properties.Name -notcontains 'healthAlerts') {
            $savedStatus | Add-Member -NotePropertyName healthAlerts -NotePropertyValue @()
        } else { $savedStatus.healthAlerts = @() }
        if ($savedStatus.PSObject.Properties.Name -notcontains 'freshness') {
            $savedStatus | Add-Member -NotePropertyName freshness -NotePropertyValue ([pscustomobject]@{ thresholdHours = 36; osfAgeHours = $null; pfzAgeHours = $null })
        }
        $savedStatus.freshness.thresholdHours = 36
        $status = $savedStatus
        if ($status.PSObject.Properties.Name -notcontains 'oceanCurrent') {
            $status | Add-Member -NotePropertyName oceanCurrent -NotePropertyValue ([pscustomobject]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @(); states = @() })
        }
        foreach ($groupName in @('highWave','swellSurge','oceanCurrent')) {
            if ($status.$groupName.PSObject.Properties.Name -notcontains 'issueDate') {
                $status.$groupName | Add-Member -NotePropertyName issueDate -NotePropertyValue $null
            }
            if ($status.$groupName.PSObject.Properties.Name -notcontains 'states') {
                $status.$groupName | Add-Member -NotePropertyName states -NotePropertyValue @()
            }
        }
        foreach ($propertyName in @('bulletin','recentBulletin')) {
            if ($status.tsunami.PSObject.Properties.Name -notcontains $propertyName) {
                $status.tsunami | Add-Member -NotePropertyName $propertyName -NotePropertyValue $null
            }
        }
        if ($status.PSObject.Properties.Name -notcontains 'marineHeatWave') {
            $status | Add-Member -NotePropertyName marineHeatWave -NotePropertyValue ([pscustomobject]@{ message = $null; fetchedAt = $null; ok = $false; url = 'https://incois.gov.in/oceanservices/mhw/index.jsp' })
        }
        if ($status.tsunami.PSObject.Properties.Name -notcontains 'state') {
            $status.tsunami | Add-Member -NotePropertyName state -NotePropertyValue 'watch'
        }
        if ($status.seismic.PSObject.Properties.Name -notcontains 'recentEvents') {
            $status.seismic | Add-Member -NotePropertyName recentEvents -NotePropertyValue @()
        }
        if ($status.PSObject.Properties.Name -notcontains 'cyclone') {
            $status | Add-Member -NotePropertyName cyclone -NotePropertyValue ([pscustomobject]@{ title = 'No active cyclone advisory'; message = ''; level = 'safe'; issuedAt = $null; link = $null; items = @() })
        }
        if ($status.PSObject.Properties.Name -notcontains 'jointBulletin') {
            $status | Add-Member -NotePropertyName jointBulletin -NotePropertyValue ([pscustomobject]@{
                message = 'No INCOIS-IMD joint bulletin is currently available.'
                url = 'https://incois.gov.in/site/services/jointbulletin.jsp'
                issuedAt = $null
                isRecent = $false
                fetchedAt = $null
                ok = $false
                sourcePage = 'https://incois.gov.in/site/services/jointbulletin.jsp'
                lastError = $null
            })
        } else {
            $jointDefaults = [ordered]@{
                message = 'No INCOIS-IMD joint bulletin is currently available.'
                url = 'https://incois.gov.in/site/services/jointbulletin.jsp'
                issuedAt = $null
                isRecent = $false
                fetchedAt = $null
                ok = $false
                sourcePage = 'https://incois.gov.in/site/services/jointbulletin.jsp'
                lastError = $null
            }
            foreach ($jointProperty in $jointDefaults.Keys) {
                if ($status.jointBulletin.PSObject.Properties.Name -notcontains $jointProperty) {
                    $status.jointBulletin | Add-Member -NotePropertyName $jointProperty -NotePropertyValue $jointDefaults[$jointProperty]
                }
            }
        }
        foreach ($propertyName in @('bulletin','recentBulletin')) {
            if ($status.stormSurge.PSObject.Properties.Name -notcontains $propertyName) {
                $status.stormSurge | Add-Member -NotePropertyName $propertyName -NotePropertyValue $null
            }
        }
    } catch { }
}

$itewsInformationAccessible = $false
$stormSurgeAccessible = $false
$incoisPageAccessible = $false
$activeEventId = $null

try {
    $tsunamiHtml = Get-TextContent 'https://tsunami.incois.gov.in/TEWS/'
    [xml]$activeXml = Get-TextContent ('https://tsunami.incois.gov.in/itews/homexmls/LatestEvents.xml?currentTime=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())
    $activeEvents = @($activeXml.SelectNodes('//event'))
    $itewsInformationAccessible = $true
    if ($activeEvents.Count -eq 0) {
        $status.tsunami.message = 'No Tsunami threat reported by ITEWC'
        $status.tsunami.state = 'safe'
        $status.tsunami.ok = $true
        $status.tsunami.bulletin = $null
    } else {
        # Prefer the event with the most advanced bulletin sequence. When
        # bulletin numbers tie, prefer the highest magnitude, then newest time.
        $active = $activeEvents | Sort-Object `
            @{ Expression = { [int]"$($_.ChildNodes[9].InnerText)".Trim() }; Descending = $true }, `
            @{ Expression = { [double]("$($_.ChildNodes[6].InnerText)" -replace '[^0-9.]', '') }; Descending = $true }, `
            @{ Expression = { [DateTime]::ParseExact("$($_.ChildNodes[1].InnerText)".Trim(), 'dd MMM yyyy HH:mm:ss', [Globalization.CultureInfo]::InvariantCulture) }; Descending = $true } |
            Select-Object -First 1
        $eventId = "$($active.ChildNodes[0].InnerText)".Trim()
        $activeEventId = $eventId
        $bulletinNumber = [int]"$($active.ChildNodes[9].InnerText)".Trim()
        $aos = "$($active.ChildNodes[11].InnerText)".Trim()
        $detailUrl = "https://tsunami.incois.gov.in/itews/DSSProducts/OPR/$eventId/$aos/B$bulletinNumber/${eventId}_B${bulletinNumber}_${aos}_Pub.json"
        $status.tsunami.bulletin = Get-BulletinSummary $detailUrl $eventId $bulletinNumber
        $status.tsunami.bulletin.sequence = @(Get-BulletinSequence $detailUrl $eventId $bulletinNumber)
        $status.tsunami.message = $status.tsunami.bulletin.message
        $status.tsunami.state = $status.tsunami.bulletin.state
        $status.tsunami.ok = $status.tsunami.state -in @('safe', 'passed')
    }
} catch { $status.errors += "Tsunami: $($_.Exception.Message)" }

try {
    $events = Invoke-RestMethod -Uri 'https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json' -TimeoutSec 45
    $itewsInformationAccessible = $true
    $eventList = @($events)
    $eventRoot = $eventList | Select-Object -First 1
    if ($null -ne $eventRoot -and $eventRoot.PSObject.Properties.Name -contains 'features') { $eventList = @($eventRoot.features) }
    elseif ($null -ne $eventRoot -and $eventRoot.PSObject.Properties.Name -contains 'datasets') { $eventList = @($eventRoot.datasets) }
    $status.seismic.count = $eventList.Count
    $status.seismic.recentEvents = @()
    if ($eventList.Count -eq 0) {
        $status.seismic.message = 'No Seismic Activity for the past 90 days with magnitude >= 6.5M'
        $status.seismic.latest = $null
    } else {
        $eventList = @($eventList | Sort-Object { [DateTime]::ParseExact("$($_.ORIGINTIME)", 'yyyy-MM-dd HH:mm:ss', [Globalization.CultureInfo]::InvariantCulture) } -Descending)
        $latest = $eventList | Select-Object -First 1
        $latestTopoBathy = ''
        if ($latest.PSObject.Properties.Name -contains 'detail' -and "$($latest.detail)".Trim()) {
            try {
                $status.tsunami.recentBulletin = Get-BulletinSummary "$($latest.detail)" "$($latest.EVID)" ([int]$latest.BULNO)
                $status.tsunami.recentBulletin.sequence = @(Get-BulletinSequence "$($latest.detail)" "$($latest.EVID)" ([int]$latest.BULNO))
                $latestTopoBathy = "$($status.tsunami.recentBulletin.topographyBathymetry)"
            } catch { }
        }
        $status.seismic.latest = Add-GebcoEventMetadata -Event $latest -TopoBathy $latestTopoBathy
        if ($latest.PSObject.Properties.Name -contains 'MAGNITUDE') {
            $originWithZone = "$($latest.ORIGINTIME)".Trim()
            if ($originWithZone -and $originWithZone -notmatch '(?i)\bIST\b') { $originWithZone += ' IST' }
            $status.seismic.message = "Latest: M$($latest.MAGNITUDE), $($latest.REGIONNAME), $originWithZone"
            $latestTime = [DateTime]::ParseExact("$($latest.ORIGINTIME)", 'yyyy-MM-dd HH:mm:ss', [Globalization.CultureInfo]::InvariantCulture)
            $status.seismic.recentEvents = @($eventList | Select-Object -Skip 1 | Where-Object {
                $eventTime = [DateTime]::ParseExact("$($_.ORIGINTIME)", 'yyyy-MM-dd HH:mm:ss', [Globalization.CultureInfo]::InvariantCulture)
                [math]::Abs(($latestTime - $eventTime).TotalHours) -le 24
            } | ForEach-Object {
                $bulletinUrl = if ("$($_.EVID)".Trim() -and "$($_.BULNO)".Trim()) {
                    "https://tsunami.incois.gov.in/TEWS/displaybulletinslatest.jsp?type=NTWC&eventId=$($_.EVID)&aos=public&currBullNo=$($_.BULNO)&latestBullNo=$($_.BULNO)"
                } else { $null }
                $eventBulletin = $null
                if ("$($_.detail)".Trim() -and "$($_.EVID)".Trim() -and "$($_.BULNO)".Trim()) {
                    try {
                        $eventBulletin = Get-BulletinSummary "$($_.detail)" "$($_.EVID)" ([int]$_.BULNO)
                        $eventBulletin.sequence = @(Get-BulletinSequence "$($_.detail)" "$($_.EVID)" ([int]$_.BULNO))
                    } catch { }
                }
                $eventRecord = [pscustomobject][ordered]@{ magnitude = $_.MAGNITUDE; region = $_.REGIONNAME; originTime = $_.ORIGINTIME; depth = $_.DEPTH; latitude = $_.LATITUDE; longitude = $_.LONGITUDE; bulletinUrl = $bulletinUrl; bulletin = $eventBulletin }
                $eventTopoBathy = if ($null -ne $eventBulletin) { "$($eventBulletin.topographyBathymetry)" } else { '' }
                Add-GebcoEventMetadata -Event $eventRecord -TopoBathy $eventTopoBathy
            })
        } else {
            $status.seismic.message = "$($eventList.Count) event(s) listed; open the national table for details"
        }
    }
} catch { $status.errors += "Seismic: $($_.Exception.Message)" }

try {
    $hwa = Invoke-RestMethod -Uri 'https://sarat.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata' -TimeoutSec 45
    $status.highWave.issueDate = Convert-IncoisDate "$($hwa.LatestHWADate)"
    $status.swellSurge.issueDate = Convert-IncoisDate "$($hwa.LatestSSADate)"
    $items = @()
    if ($hwa.PSObject.Properties.Name -contains 'HWAJson') {
        if ("$($hwa.HWAJson)".Trim()) {
            foreach ($record in ($hwa.HWAJson | ConvertFrom-Json)) { $items += $record }
        }
        if ("$($hwa.SSAJson)".Trim()) {
            foreach ($record in ($hwa.SSAJson | ConvertFrom-Json)) { $items += $record }
        }
    } elseif ($hwa -is [System.Collections.IEnumerable] -and $hwa -isnot [string]) {
        $items = @($hwa)
    } elseif ($hwa.PSObject.Properties.Name -contains 'data') {
        $items = @($hwa.data)
    }
    if (-not $items.Count) { throw 'INCOIS returned no high-wave or swell-surge records' }
    # A successful response replaces the previous snapshot; do not retain expired alerts.
    foreach ($group in @($status.highWave, $status.swellSurge)) {
        foreach ($level in @('alert','watch','warning','noThreat')) { $group.$level = @() }
        $group.states = @()
    }
    $highWaveDetails = @()
    $swellSurgeDetails = @()
    foreach ($item in $items) {
        $state = Get-StateName $item
        $alert = Get-AlertName $item
        if (-not $state -or -not $alert) { continue }
        $target = if ($alert -like 'HIGH WAVE*') { $status.highWave } elseif ($alert -like 'SWELL SURGE*') { $status.swellSurge } else { $null }
        if ($null -eq $target) { continue }
        $severity = if ($alert -like '*WARNING*') { 'warning' }
            elseif ($alert -like '*ALERT*') { 'alert' }
            elseif ($alert -like '*WATCH*') { 'watch' }
            elseif ($alert -like '*NO THREAT*') { 'noThreat' }
            else { $null }
        if (-not $severity) { continue }
        $target.$severity += $state
        $detail = [pscustomobject][ordered]@{
            state = $state
            district = if ($null -ne $item.District -and "$($item.District)".Trim()) { "$($item.District)".Trim().ToUpperInvariant() } else { 'COASTAL AREA' }
            severity = $severity
            color = if ($null -ne $item.Color) { "$($item.Color)".Trim() } else { $null }
            issueDate = if ($null -ne $item.'Issue Date') { "$($item.'Issue Date')".Trim() } else { $null }
            message = if ($null -ne $item.Message) { "$($item.Message)".Trim() } else { $null }
        }
        if ($alert -like 'HIGH WAVE*') { $highWaveDetails += $detail } else { $swellSurgeDetails += $detail }
    }
    $severityRank = @{ warning = 4; alert = 3; watch = 2; noThreat = 1 }
    foreach ($pair in @(
        [pscustomobject]@{ group = $status.highWave; details = $highWaveDetails },
        [pscustomobject]@{ group = $status.swellSurge; details = $swellSurgeDetails }
    )) {
        $group = $pair.group
        foreach ($level in @('alert','watch','warning','noThreat')) { $group.$level = @($group.$level | Sort-Object -Unique) }
        $group.states = @($pair.details | Group-Object state | ForEach-Object {
            $advisories = @($_.Group | Sort-Object @{ Expression = { $severityRank[$_.severity] }; Descending = $true }, district)
            $counts = [ordered]@{ warning = 0; alert = 0; watch = 0; noThreat = 0 }
            foreach ($advisory in $advisories) { $counts[$advisory.severity]++ }
            [pscustomobject][ordered]@{
                name = $_.Name
                highestSeverity = $advisories[0].severity
                counts = [pscustomobject]$counts
                advisories = $advisories
            }
        } | Sort-Object @{ Expression = { $severityRank[$_.highestSeverity] }; Descending = $true }, name)
    }
} catch { $status.errors += "High wave/swell: $($_.Exception.Message)" }

try {
    $currentFeed = Invoke-RestMethod -Uri 'https://sarat.incois.gov.in/incoismobileappdata/rest/incois/currentslatestdata' -TimeoutSec 45
    foreach ($level in @('alert','watch','warning','noThreat')) { $status.oceanCurrent.$level = @() }
    $status.oceanCurrent.states = @()
    if ("$($currentFeed.LatestCurrentsDate)".Trim() -eq 'None') {
        $status.oceanCurrent.issueDate = $null
    } else {
        $status.oceanCurrent.issueDate = Convert-IncoisDate "$($currentFeed.LatestCurrentsDate)"
        $currentItems = @()
        if ("$($currentFeed.CurrentsJson)".Trim() -and "$($currentFeed.CurrentsJson)".Trim() -ne 'None') {
            foreach ($record in ($currentFeed.CurrentsJson | ConvertFrom-Json)) { $currentItems += $record }
        }
        $currentDetails = @()
        foreach ($item in $currentItems) {
            $state = Get-StateName $item
            $alert = Get-AlertName $item
            if (-not $state -or $alert -notlike 'OCEAN CURRENT*') { continue }
            $severity = if ($alert -like '*WARNING*') { 'warning' }
                elseif ($alert -like '*ALERT*') { 'alert' }
                elseif ($alert -like '*WATCH*') { 'watch' }
                elseif ($alert -like '*NO THREAT*') { 'noThreat' }
                else { $null }
            if (-not $severity) { continue }
            $status.oceanCurrent.$severity += $state
            $currentDetails += [pscustomobject][ordered]@{
                state = $state
                district = if ($null -ne $item.District -and "$($item.District)".Trim()) { "$($item.District)".Trim().ToUpperInvariant() } else { 'COASTAL AREA' }
                severity = $severity
                color = if ($null -ne $item.Color) { "$($item.Color)".Trim() } else { $null }
                issueDate = if ($null -ne $item.'Issue Date') { "$($item.'Issue Date')".Trim() } else { $null }
                message = if ($null -ne $item.Message) { "$($item.Message)".Trim() } else { $null }
            }
        }
        $recordIssueDates = @($currentDetails.issueDate | Where-Object { $_ })
        $parsedIssueDates = @($recordIssueDates | ForEach-Object {
            $parsedDate = [DateTime]::MinValue
            if ([DateTime]::TryParseExact("$_", 'dd-MM-yyyy', [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::None, [ref]$parsedDate)) { $parsedDate }
        })
        if ($parsedIssueDates.Count -gt 0) {
            $status.oceanCurrent.issueDate = ($parsedIssueDates | Sort-Object -Descending | Select-Object -First 1).ToString('dd MMM yyyy', [Globalization.CultureInfo]::InvariantCulture)
        }
        foreach ($level in @('alert','watch','warning','noThreat')) { $status.oceanCurrent.$level = @($status.oceanCurrent.$level | Sort-Object -Unique) }
        $severityRank = @{ warning = 4; alert = 3; watch = 2; noThreat = 1 }
        $status.oceanCurrent.states = @($currentDetails | Group-Object state | ForEach-Object {
            $advisories = @($_.Group | Sort-Object @{ Expression = { $severityRank[$_.severity] }; Descending = $true }, district)
            $counts = [ordered]@{ warning = 0; alert = 0; watch = 0; noThreat = 0 }
            foreach ($advisory in $advisories) { $counts[$advisory.severity]++ }
            [pscustomobject][ordered]@{
                name = $_.Name
                highestSeverity = $advisories[0].severity
                counts = [pscustomobject]$counts
                advisories = $advisories
            }
        } | Sort-Object @{ Expression = { $severityRank[$_.highestSeverity] }; Descending = $true }, name)
    }
} catch { $status.errors += "Ocean current: $($_.Exception.Message)" }

try {
    [xml]$surgeXml = Get-TextContent ('https://tsunami.incois.gov.in/itews/homexmls/SurgeEvents.xml?currentTime=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())
    $surgeEvents = @($surgeXml.SelectNodes('//event'))
    $status.stormSurge.message = 'No active storm surge bulletin'
    $status.stormSurge.ok = $true
    $stormSurgeAccessible = $true
    $status.stormSurge.bulletin = $null
    if ($surgeEvents.Count -gt 0) {
        $latestSurgeEvent = $surgeEvents | Select-Object -Last 1
        $cycloneName = "$($latestSurgeEvent.cycloneName)".Trim()
        $bulletinNumber = [int]"$($latestSurgeEvent.latestBulletinNum)".Trim()
        $summary = Get-StormSurgeBulletinSummary $cycloneName $bulletinNumber
        $status.stormSurge.recentBulletin = $summary
        $issuedDate = [DateTime]::MinValue
        $hasIssuedDate = $summary.issuedAt -and [DateTime]::TryParse("$($summary.issuedAt)", [ref]$issuedDate)
        if ($hasIssuedDate -and ((Get-Date) - $issuedDate).TotalDays -le 14) {
            $status.stormSurge.message = $summary.message
            $status.stormSurge.bulletin = $summary
            $status.stormSurge.ok = $false
        }
    }
} catch { $status.errors += "Storm surge: $($_.Exception.Message)" }

try {
    [xml]$cycloneRss = Get-TextContent 'https://cap-sources.s3.amazonaws.com/in-imd-en/rss.xml'
    $cycloneItems = @()
    foreach ($item in @($cycloneRss.rss.channel.item)) {
        $title = "$($item.title)".Trim()
        $description = "$($item.description)".Trim()
        $searchText = "$title $description"
        $level = $null
        # Check the most specific cyclone titles first because names such as
        # "Extremely Severe Cyclonic Storm" also contain "Cyclonic Storm".
        if ($searchText -match '(?i)post[\s-]*landfall\s+(out\s*look|outlook)|super\s+cyclonic\s+storm|extremely\s+severe\s+cyclonic\s+storm') { $level = 'red' }
        elseif ($searchText -match '(?i)cyclone\s+warning|very\s+severe\s+cyclonic\s+storm|severe\s+cyclonic\s+storm|(?<!severe\s)cyclonic\s+storm') { $level = 'orange' }
        elseif ($searchText -match '(?i)cyclone\s+alert|pre[\s-]*cyclone\s+watch|deep\s+depression|(?<!deep\s)depression|low[\s-]*pressure\s+area') { $level = 'yellow' }
        if (-not $level) { continue }
        $published = [DateTimeOffset]::MinValue
        [DateTimeOffset]::TryParse("$($item.pubDate)", [ref]$published) | Out-Null
        $cycloneItems += [pscustomobject][ordered]@{
            title = $title
            message = $description
            level = $level
            issuedAt = if ($published -ne [DateTimeOffset]::MinValue) { $published.ToString('o') } else { "$($item.pubDate)" }
            link = "$($item.link)".Trim()
        }
    }
    $cycloneItems = @($cycloneItems | Sort-Object { [DateTimeOffset]::Parse("$($_.issuedAt)") } -Descending)
    $status.cyclone.items = $cycloneItems
    if ($cycloneItems.Count -gt 0) {
        $latestCyclone = $cycloneItems[0]
        $status.cyclone.title = $latestCyclone.title
        $status.cyclone.message = $latestCyclone.message
        $status.cyclone.level = $latestCyclone.level
        $status.cyclone.issuedAt = $latestCyclone.issuedAt
        $status.cyclone.link = $latestCyclone.link
    } else {
        $status.cyclone.title = 'No active cyclone advisory'
        $status.cyclone.message = ''
        $status.cyclone.level = 'safe'
        $status.cyclone.issuedAt = $null
        $status.cyclone.link = $null
    }
} catch { $status.errors += "Cyclone: $($_.Exception.Message)" }

try {
    $status.jointBulletin = Get-JointBulletinSummary
    $incoisPageAccessible = $true
} catch {
    $status.errors += "Joint bulletin: $($_.Exception.Message)"
    if ($null -ne $status.jointBulletin) {
        $status.jointBulletin.ok = $false
        $savedIssuedAt = [DateTimeOffset]::MinValue
        $hasSavedIssuedAt = $status.jointBulletin.issuedAt -and [DateTimeOffset]::TryParse("$($status.jointBulletin.issuedAt)", [ref]$savedIssuedAt)
        $status.jointBulletin.isRecent = $hasSavedIssuedAt -and (([DateTimeOffset]::UtcNow - $savedIssuedAt.ToUniversalTime()).TotalHours -ge 0) -and (([DateTimeOffset]::UtcNow - $savedIssuedAt.ToUniversalTime()).TotalHours -lt 24)
        $status.jointBulletin.lastError = $_.Exception.Message
    }
}

try {
    $pfzSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $pfzHtml = (Invoke-WebRequest -UseBasicParsing -WebSession $pfzSession -Uri 'https://incois.gov.in/MarineFisheries/TextDataHome?mfid=1&request_locale=en' -TimeoutSec 45).Content
    $incoisPageAccessible = $true
    $dates = [regex]::Matches($pfzHtml, '(?i)\b\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}\b') | ForEach-Object { $_.Value.ToUpperInvariant() } | Select-Object -Unique
    if ($dates.Count -ge 1) { $status.pfz.forecastDate = $dates[0] }
    if ($dates.Count -ge 2) { $status.pfz.validUntil = $dates[1] }

    # INCOIS always lists every sector in the selector, including sectors for
    # which no PFZ advisory was issued. Follow the session-based detail links
    # and publish only sectors whose pages contain current advisory data.
    $sectorNames = @{
        'SEC001' = 'Gujarat'; 'SEC002' = 'Maharashtra'; 'SEC003' = 'Goa'
        'SEC004' = 'Karnataka'; 'SEC005' = 'Kerala'; 'SEC006' = 'South Tamil Nadu'
        'SEC007' = 'North Tamil Nadu'; 'SEC008' = 'South Andhra Pradesh'
        'SEC009' = 'North Andhra Pradesh'; 'SEC010' = 'Odisha'; 'SEC011' = 'West Bengal'
        'SEC012' = 'Andaman'; 'SEC013' = 'Nicobar'; 'SEC014' = 'Lakshadweep'
    }
    $sectorOptions = [regex]::Matches($pfzHtml, '(?is)<option\s+value=[''"]([^''"]*TextData[^''"]*\?secid=(SEC\d+))[''"][^>]*>')
    if ($sectorOptions.Count -eq 0) { throw 'PFZ sector links were not found' }

    $pfzSectors = @()
    $seenSectorIds = @{}
    foreach ($option in $sectorOptions) {
        $relativeUrl = $option.Groups[1].Value
        $sectorId = $option.Groups[2].Value.ToUpperInvariant()
        if ($seenSectorIds.ContainsKey($sectorId) -or -not $sectorNames.ContainsKey($sectorId)) { continue }
        $seenSectorIds[$sectorId] = $true

        $detailUrl = "https://incois.gov.in/MarineFisheries/$relativeUrl"
        $detailHtml = (Invoke-WebRequest -UseBasicParsing -WebSession $pfzSession -Uri $detailUrl -TimeoutSec 45).Content
        $detailText = [Net.WebUtility]::HtmlDecode(($detailHtml -replace '(?is)<script\b.*?</script>', ' ' -replace '(?is)<style\b.*?</style>', ' ' -replace '(?is)<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
        $noDataMessage = $null
        foreach ($paragraphMatch in [regex]::Matches($detailHtml, '(?is)<p\b[^>]*>(.*?)</p>')) {
            $paragraphText = [Net.WebUtility]::HtmlDecode(($paragraphMatch.Groups[1].Value -replace '(?is)<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
            if ($paragraphText -match '(?i)^no\s+data\s+available\s+for\s+this\s+sector\b') {
                $noDataMessage = $paragraphText
                break
            }
        }
        if ($noDataMessage) {
            $pfzSectors += [ordered]@{
                id = $sectorId
                name = $sectorNames[$sectorId]
                url = "https://incois.gov.in/MarineFisheries/TextData?secid=$sectorId"
                hasForecast = $false
                message = $noDataMessage
                landingCenters = @()
            }
            continue
        }

        $landingCenters = [ordered]@{}
        foreach ($rowMatch in [regex]::Matches($detailHtml, '(?is)<tr\b[^>]*>(.*?)</tr>')) {
            $cells = @([regex]::Matches($rowMatch.Groups[1].Value, '(?is)<td\b[^>]*>(.*?)</td>') | ForEach-Object {
                [Net.WebUtility]::HtmlDecode(($_.Groups[1].Value -replace '(?is)<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
            })
            if ($cells.Count -ne 7 -or [string]::IsNullOrWhiteSpace($cells[0])) { continue }

            $landingName = $cells[0]
            if (-not $landingCenters.Contains($landingName)) {
                $landingCenters[$landingName] = [ordered]@{ name = $landingName; messages = @() }
            }
            $landingCenters[$landingName].messages += [ordered]@{
                direction = $cells[1]
                bearing = $cells[2]
                distance = $cells[3]
                depth = $cells[4]
                latitude = $cells[5]
                longitude = $cells[6]
            }
        }

        # A parsed advisory row is stronger evidence than a date alone and
        # prevents redirects or generic background pages becoming sectors.
        if ($landingCenters.Count -gt 0 -and $detailText -match '(?i)\b\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}\b') {
            $pfzSectors += [ordered]@{
                id = $sectorId
                name = $sectorNames[$sectorId]
                url = "https://incois.gov.in/MarineFisheries/TextData?secid=$sectorId"
                hasForecast = $true
                message = $null
                landingCenters = @($landingCenters.Values)
            }
        } else {
            $pfzSectors += [ordered]@{
                id = $sectorId
                name = $sectorNames[$sectorId]
                url = "https://incois.gov.in/MarineFisheries/TextData?secid=$sectorId"
                hasForecast = $false
                message = 'No forecast is available for this sector in the latest fetched PFZ data.'
                landingCenters = @()
            }
        }
    }
    $status.pfz.sectors = @($pfzSectors)
} catch { $status.errors += "PFZ: $($_.Exception.Message)" }

# Marine Heat Wave is published as a marquee on the official product page.
try {
    $mhwUrl = 'https://incois.gov.in/oceanservices/mhw/index.jsp'
    $mhwHtml = Get-TextContent $mhwUrl
    $mhwMatch = [regex]::Match($mhwHtml, '(?is)<marquee\b[^>]*>(.*?)</marquee>')
    if (-not $mhwMatch.Success) { throw 'Marine Heat Wave marquee message was not found.' }
    $mhwMessage = [Net.WebUtility]::HtmlDecode(($mhwMatch.Groups[1].Value -replace '(?is)<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
    if ([string]::IsNullOrWhiteSpace($mhwMessage)) { throw 'Marine Heat Wave marquee message was empty.' }
    $previousMhwMessage = "$($status.marineHeatWave.message)"
    $previousMhwFetchedAt = $status.marineHeatWave.fetchedAt
    $status.marineHeatWave.message = $mhwMessage
    $status.marineHeatWave.fetchedAt = if ($mhwMessage -ne $previousMhwMessage -or [string]::IsNullOrWhiteSpace("$previousMhwFetchedAt")) { $attemptedAt } else { $previousMhwFetchedAt }
    $status.marineHeatWave.ok = $true
    $status.marineHeatWave.url = $mhwUrl
    $incoisPageAccessible = $true
} catch {
    $status.marineHeatWave.ok = $false
    $status.errors += "Marine Heat Wave: $($_.Exception.Message)"
}

# Public health alerts intentionally differ from the diagnostic scraper errors.
# OSF/PFZ are daily products, so their saved data remains current for 36 hours.
$osfAgeHours = Get-DailyProductAgeHours @(
    $status.highWave.issueDate,
    $status.swellSurge.issueDate,
    $status.oceanCurrent.issueDate
)
$pfzAgeHours = Get-DailyProductAgeHours @($status.pfz.forecastDate)
$status.freshness.osfAgeHours = if ($null -eq $osfAgeHours) { $null } else { [math]::Round($osfAgeHours, 2) }
$status.freshness.pfzAgeHours = if ($null -eq $pfzAgeHours) { $null } else { [math]::Round($pfzAgeHours, 2) }

# Only describe the whole INCOIS website as unavailable when no direct INCOIS
# page worked and a final main-page probe also fails.
if (-not $incoisPageAccessible) {
    try {
        Get-TextContent 'https://incois.gov.in/' | Out-Null
        $incoisPageAccessible = $true
    } catch { }
}

$status.healthAlerts = @()
if (-not $incoisPageAccessible) {
    $status.healthAlerts += New-HealthAlert 'incois-main' 'Error: Unable to access Info' 'Check INCOIS Main page' 'https://incois.gov.in/'
} else {
    if ($null -eq $pfzAgeHours -or $pfzAgeHours -gt 36) {
        $status.healthAlerts += New-HealthAlert 'pfz' 'Error: Unable to fetch PFZ data' 'Check PFZ webpage' 'https://incois.gov.in/MarineFisheries/TextDataHome?mfid=1&request_locale=en'
    }
    if ($null -eq $osfAgeHours -or $osfAgeHours -gt 36) {
        $status.healthAlerts += New-HealthAlert 'osf' 'Error: Unable to fetch OSF data' 'Check OSF webpage' 'https://incois.gov.in/site/services/hwa.jsp'
    }
    if (-not $itewsInformationAccessible) {
        $status.healthAlerts += New-HealthAlert 'itewc' 'Error: Unable to access Tsunami/Seismic Info' 'Check ITEWC webpage' 'https://tsunami.incois.gov.in/TEWS/'
    }
    if (-not $stormSurgeAccessible) {
        $status.healthAlerts += New-HealthAlert 'storm-surge' 'Error: Unable to access Storm Surge Info' 'Check ITEWC webpage' 'https://tsunami.incois.gov.in/TEWS/'
    }
}

$tempPath = "$outputPath.tmp"
if (@($status.errors).Count -eq 0) { $status.updatedAt = $attemptedAt }
$status | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $tempPath -Encoding UTF8
Move-Item -LiteralPath $tempPath -Destination $outputPath -Force
if (-not $Quiet) { Write-Output "Updated $outputPath at $($status.updatedAt)" }
