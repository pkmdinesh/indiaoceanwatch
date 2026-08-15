param(
    [string]$Path = (Join-Path (Split-Path -Parent $PSScriptRoot) 'status.json')
)

$ErrorActionPreference = 'Stop'
$resolvedPath = (Resolve-Path -LiteralPath $Path).Path
$status = Get-Content -Raw -LiteralPath $resolvedPath | ConvertFrom-Json
$errors = [Collections.Generic.List[string]]::new()

function Require-Property([object]$Object, [string]$Name, [string]$Context = 'root') {
    if ($null -eq $Object -or $Name -notin $Object.PSObject.Properties.Name) {
        $errors.Add("Missing required property: $Context.$Name")
        return $false
    }
    return $true
}

foreach ($name in @('updatedAt','lastAttemptAt','updateIntervalHours','tsunami','seismic','highWave','swellSurge','oceanCurrent','stormSurge','cyclone','pfz','errors','healthAlerts')) {
    [void](Require-Property $status $name)
}

foreach ($name in @('updatedAt','lastAttemptAt')) {
    if ($name -in $status.PSObject.Properties.Name) {
        $parsed = [DateTimeOffset]::MinValue
        if (-not [DateTimeOffset]::TryParse("$($status.$name)",[ref]$parsed)) { $errors.Add("Invalid date-time: root.$name") }
    }
}

if ($status.updateIntervalHours -le 0) { $errors.Add('root.updateIntervalHours must be greater than zero') }

foreach ($serviceName in @('highWave','swellSurge','oceanCurrent')) {
    $service = $status.$serviceName
    foreach ($name in @('warning','alert','watch','noThreat','states')) {
        if (Require-Property $service $name $serviceName) {
            $value = $service.$name
            if ($null -eq $value -or $value -is [string] -or $value -isnot [Collections.IEnumerable]) {
                $errors.Add("$serviceName.$name must be an array")
            }
        }
    }
}

if (Require-Property $status.pfz 'sectors' 'pfz') {
    if ($null -eq $status.pfz.sectors -or $status.pfz.sectors -is [string] -or $status.pfz.sectors -isnot [Collections.IEnumerable]) {
        $errors.Add('pfz.sectors must be an array')
    }
}

if ($errors.Count) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "Valid Ocean Watch status snapshot: $resolvedPath"
