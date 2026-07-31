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

$status = [ordered]@{
    updatedAt = (Get-Date).ToString('o')
    updateIntervalHours = 6
    source = 'INCOIS / ITEWS'
    tsunami = [ordered]@{ message = 'Status unavailable'; ok = $false }
    seismic = [ordered]@{ message = 'Status unavailable'; count = $null; latest = $null }
    highWave = [ordered]@{ alert = @(); watch = @(); warning = @(); noThreat = @() }
    swellSurge = [ordered]@{ alert = @(); watch = @(); warning = @(); noThreat = @() }
    stormSurge = [ordered]@{ message = 'Status unavailable'; ok = $false }
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
        $savedStatus.updateIntervalHours = 6
        $savedStatus.errors = @()
        $status = $savedStatus
    } catch { }
}

try {
    $tsunamiHtml = Get-TextContent 'https://tsunami.incois.gov.in/TEWS/'
    if ($tsunamiHtml -match 'No\s*Tsunami\.?') {
        $status.tsunami.message = 'No Tsunami'
        $status.tsunami.ok = $true
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
        } else {
            $status.seismic.message = "$($eventList.Count) event(s) listed; open the national table for details"
        }
    }
} catch { $status.errors += "Seismic: $($_.Exception.Message)" }

try {
    $hwa = Invoke-RestMethod -Uri 'https://sarat.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata' -TimeoutSec 45
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
    $stormHtml = Get-TextContent 'https://incois.gov.in/site/services/StormSurge.jsp'
    $status.stormSurge.message = 'No active alert message displayed'
    $status.stormSurge.ok = $true
    if ($stormHtml -match '(?i)(storm\s+surge\s+(warning|alert)[^<]{1,180})') {
        $candidate = ($Matches[1] -replace '\s+', ' ').Trim()
        if ($candidate -notmatch '(?i)advisory|about|service') { $status.stormSurge.message = $candidate; $status.stormSurge.ok = $false }
    }
} catch { $status.errors += "Storm surge: $($_.Exception.Message)" }

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
