param(
    [switch]$Quiet,
    [double]$MinimumAgeHours = 0
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputPath = Join-Path $projectRoot 'status.json'

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

function Get-BulletinSummary([string]$DetailUrl, [string]$EventId, [int]$BulletinNumber) {
    $bulletin = Invoke-RestMethod -Uri $DetailUrl -TimeoutSec 45
    $info = @($bulletin.event_info) | Select-Object -First 1
    if ($null -eq $info) { throw 'ITEWS bulletin contains no event information' }
    [ordered]@{
        number = $BulletinNumber
        type = if ("$($info.bulletinType)".Trim()) { "$($info.bulletinType)".Trim() } else { "$BulletinNumber" }
        issuedAt = "$($info.bulletinIssueTime)".Trim()
        message = "$($info.evaluation)".Trim()
        eventId = $EventId
        magnitude = "$($info.eventMagnitude)".Trim()
        location = "$($info.Location)".Trim()
        originDate = "$($info.EQDate)".Trim()
        originTime = "$($info.EQTime)".Trim()
        depth = "$($info.eventDepth)".Trim()
        url = "https://tsunami.incois.gov.in/TEWS/displaybulletinslatest.jsp?type=NTWC&eventId=$EventId&aos=public&currBullNo=$BulletinNumber&latestBullNo=$BulletinNumber"
    }
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
    updatedAt = (Get-Date).ToString('o')
    updateIntervalHours = 1
    source = 'INCOIS / ITEWS'
    tsunami = [ordered]@{ message = 'Status unavailable'; ok = $false; bulletin = $null; recentBulletin = $null }
    seismic = [ordered]@{ message = 'Status unavailable'; count = $null; latest = $null }
    highWave = [ordered]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @() }
    swellSurge = [ordered]@{ issueDate = $null; alert = @(); watch = @(); warning = @(); noThreat = @() }
    stormSurge = [ordered]@{ message = 'Status unavailable'; ok = $false; bulletin = $null; recentBulletin = $null }
    cyclone = [ordered]@{ title = 'No active cyclone advisory'; message = ''; level = 'safe'; issuedAt = $null; link = $null; items = @() }
    pfz = [ordered]@{
        forecastDate = $null
        validUntil = $null
        sectors = @('Gujarat','Maharashtra','Goa','Karnataka','Kerala','Lakshadweep','North Tamil Nadu','South Tamil Nadu','North Andhra Pradesh','South Andhra Pradesh','Odisha','West Bengal','Andaman','Nicobar')
    }
    errors = @()
}

# Preserve the last successful values when an official endpoint is temporarily unavailable.
if (Test-Path -LiteralPath $outputPath) {
    try {
        $savedStatus = Get-Content -Raw -LiteralPath $outputPath | ConvertFrom-Json
        $savedStatus.updatedAt = (Get-Date).ToString('o')
        $savedStatus.updateIntervalHours = 1
        $savedStatus.errors = @()
        $status = $savedStatus
        foreach ($groupName in @('highWave','swellSurge')) {
            if ($status.$groupName.PSObject.Properties.Name -notcontains 'issueDate') {
                $status.$groupName | Add-Member -NotePropertyName issueDate -NotePropertyValue $null
            }
        }
        foreach ($propertyName in @('bulletin','recentBulletin')) {
            if ($status.tsunami.PSObject.Properties.Name -notcontains $propertyName) {
                $status.tsunami | Add-Member -NotePropertyName $propertyName -NotePropertyValue $null
            }
        }
        if ($status.PSObject.Properties.Name -notcontains 'cyclone') {
            $status | Add-Member -NotePropertyName cyclone -NotePropertyValue ([pscustomobject]@{ title = 'No active cyclone advisory'; message = ''; level = 'safe'; issuedAt = $null; link = $null; items = @() })
        }
        foreach ($propertyName in @('bulletin','recentBulletin')) {
            if ($status.stormSurge.PSObject.Properties.Name -notcontains $propertyName) {
                $status.stormSurge | Add-Member -NotePropertyName $propertyName -NotePropertyValue $null
            }
        }
    } catch { }
}

try {
    $tsunamiHtml = Get-TextContent 'https://tsunami.incois.gov.in/TEWS/'
    [xml]$activeXml = Get-TextContent ('https://tsunami.incois.gov.in/itews/homexmls/LatestEvents.xml?currentTime=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())
    $activeEvents = @($activeXml.SelectNodes('//event'))
    if ($activeEvents.Count -eq 0) {
        $status.tsunami.message = 'No Tsunami'
        $status.tsunami.ok = $true
        $status.tsunami.bulletin = $null
    } else {
        $active = $activeEvents | Select-Object -Last 1
        $eventId = "$($active.ChildNodes[0].InnerText)".Trim()
        $bulletinNumber = [int]"$($active.ChildNodes[9].InnerText)".Trim()
        $aos = "$($active.ChildNodes[11].InnerText)".Trim()
        $detailUrl = "https://tsunami.incois.gov.in/itews/DSSProducts/OPR/$eventId/$aos/B$bulletinNumber/${eventId}_B${bulletinNumber}_${aos}_Pub.json"
        $status.tsunami.bulletin = Get-BulletinSummary $detailUrl $eventId $bulletinNumber
        $status.tsunami.message = $status.tsunami.bulletin.message
        $status.tsunami.ok = $false
    }
} catch { $status.errors += "Tsunami: $($_.Exception.Message)" }

try {
    $events = Invoke-RestMethod -Uri 'https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json' -TimeoutSec 45
    $eventList = @($events)
    $eventRoot = $eventList | Select-Object -First 1
    if ($null -ne $eventRoot -and $eventRoot.PSObject.Properties.Name -contains 'features') { $eventList = @($eventRoot.features) }
    elseif ($null -ne $eventRoot -and $eventRoot.PSObject.Properties.Name -contains 'datasets') { $eventList = @($eventRoot.datasets) }
    $status.seismic.count = $eventList.Count
    if ($eventList.Count -eq 0) {
        $status.seismic.message = 'No event listed in the past 90 days with magnitude >= 6.5M'
    } else {
        $latest = $eventList | Select-Object -First 1
        $status.seismic.latest = $latest
        if ($latest.PSObject.Properties.Name -contains 'MAGNITUDE') {
            $status.seismic.message = "Latest: M$($latest.MAGNITUDE), $($latest.REGIONNAME), $($latest.ORIGINTIME), depth $($latest.DEPTH) km"
            if ($latest.PSObject.Properties.Name -contains 'detail' -and "$($latest.detail)".Trim()) {
                $status.tsunami.recentBulletin = Get-BulletinSummary "$($latest.detail)" "$($latest.EVID)" ([int]$latest.BULNO)
            }
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
    }
    foreach ($item in $items) {
        $state = Get-StateName $item
        $alert = Get-AlertName $item
        if (-not $state -or -not $alert) { continue }
        $target = if ($alert -like 'HIGH WAVE*') { $status.highWave } elseif ($alert -like 'SWELL SURGE*') { $status.swellSurge } else { $null }
        if ($null -eq $target) { continue }
        if ($alert -like '*WARNING*') { $target.warning += $state }
        elseif ($alert -like '*ALERT*') { $target.alert += $state }
        elseif ($alert -like '*WATCH*') { $target.watch += $state }
        elseif ($alert -like '*NO THREAT*') { $target.noThreat += $state }
    }
    foreach ($group in @($status.highWave, $status.swellSurge)) {
        foreach ($level in @('alert','watch','warning','noThreat')) { $group.$level = @($group.$level | Sort-Object -Unique) }
    }
} catch { $status.errors += "High wave/swell: $($_.Exception.Message)" }

try {
    [xml]$surgeXml = Get-TextContent ('https://tsunami.incois.gov.in/itews/homexmls/SurgeEvents.xml?currentTime=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())
    $surgeEvents = @($surgeXml.SelectNodes('//event'))
    $status.stormSurge.message = 'No active storm surge bulletin'
    $status.stormSurge.ok = $true
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
        if ($searchText -match '(?i)post[\s-]*landfall\s+(out\s*look|outlook)') { $level = 'red' }
        elseif ($searchText -match '(?i)cyclone\s+warning') { $level = 'orange' }
        elseif ($searchText -match '(?i)(cyclone\s+alert|pre[\s-]*cyclone\s+watch)') { $level = 'yellow' }
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
    $pfzHtml = Get-TextContent 'https://incois.gov.in/MarineFisheries/TextDataHome?mfid=1&request_locale=en'
    $dates = [regex]::Matches($pfzHtml, '(?i)\b\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}\b') | ForEach-Object { $_.Value.ToUpperInvariant() } | Select-Object -Unique
    if ($dates.Count -ge 1) { $status.pfz.forecastDate = $dates[0] }
    if ($dates.Count -ge 2) { $status.pfz.validUntil = $dates[1] }
} catch { $status.errors += "PFZ: $($_.Exception.Message)" }

$tempPath = "$outputPath.tmp"
$status | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $tempPath -Encoding UTF8
Move-Item -LiteralPath $tempPath -Destination $outputPath -Force
if (-not $Quiet) { Write-Output "Updated $outputPath at $($status.updatedAt)" }
