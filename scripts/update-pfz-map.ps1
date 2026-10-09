param(
    [string]$ProjectRoot = (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)),
    [switch]$Quiet,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$dataRoot = Join-Path $ProjectRoot 'data'
New-Item -ItemType Directory -Path $dataRoot -Force | Out-Null

function Save-WfsGeoJson(
    [string]$Workspace,
    [string]$TypeName,
    [string]$FileName,
    [string[]]$PropertyNames,
    [switch]$SimplifyLines
) {
    $encodedType = [uri]::EscapeDataString($TypeName)
    $sourceUrl = "https://incois.gov.in/geoserver/$Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=$encodedType&outputFormat=application%2Fjson&srsName=EPSG%3A4326"
    $target = Join-Path $dataRoot $FileName
    $download = "$target.download.tmp"
    $temporary = "$target.tmp"
    try {
        (Invoke-WebRequest -UseBasicParsing -Uri $sourceUrl -TimeoutSec 90).Content | Set-Content -LiteralPath $download -Encoding UTF8
        $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
        if ($nodeCommand) {
            $simplifier = Join-Path $PSScriptRoot 'simplify-pfz-geojson.mjs'
            $featureCount = & $nodeCommand.Source $simplifier $download $temporary $sourceUrl ($PropertyNames -join ',') "$($SimplifyLines.IsPresent)".ToLowerInvariant()
            if ($LASTEXITCODE -ne 0) { throw "GeoJSON simplification failed for $TypeName" }
        } else {
            Copy-Item -LiteralPath $download -Destination $temporary -Force
            $featureCount = 'raw'
        }
        $shouldUpdate = $true
        if (Test-Path -LiteralPath $target) {
            try {
                $existingGeo = Get-Content -Raw -LiteralPath $target | ConvertFrom-Json
                $newGeo = Get-Content -Raw -LiteralPath $temporary | ConvertFrom-Json
                $existingFeat = ($existingGeo.features | ConvertTo-Json -Depth 10 -Compress)
                $newFeat = ($newGeo.features | ConvertTo-Json -Depth 10 -Compress)
                if ($existingFeat -eq $newFeat) {
                    $shouldUpdate = $false
                }
            } catch { }
        }

        if ($shouldUpdate) {
            Move-Item -LiteralPath $temporary -Destination $target -Force
            if (-not $Quiet) { Write-Output "Updated $FileName ($featureCount features)" }
        } else {
            Remove-Item -LiteralPath $temporary -Force -ErrorAction SilentlyContinue
            if (-not $Quiet) { Write-Output "No changes detected for $FileName ($featureCount features); skipping write." }
        }
    } finally {
        Remove-Item -LiteralPath $download -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $temporary -Force -ErrorAction SilentlyContinue
    }
}

# Dynamic PFZ advisory lines are always updated on routine runs
Save-WfsGeoJson 'PFZ_Automation' 'PFZ_Automation:pfzlines' 'pfz-lines.geojson' @('SECTORNAME','Julian_day','Year','UID','Length') -SimplifyLines

# Static GIS layers (EEZ boundary, administrative sectors, and landing centers)
$staticLayers = @(
    [pscustomobject]@{ Workspace = 'PFZ_EEZ'; TypeName = 'PFZ_EEZ:indiaeez'; FileName = 'pfz-eez.geojson'; Properties = @('OBJECTID','Length'); Simplify = $true },
    [pscustomobject]@{ Workspace = 'PFZ_Sectors'; TypeName = 'PFZ_Sectors:sector_new'; FileName = 'pfz-sectors.geojson'; Properties = @('SECTORNAME','SEC_ID'); Simplify = $false },
    [pscustomobject]@{ Workspace = 'PFZ_LandingCentres'; TypeName = 'PFZ_LandingCentres:LandingCenters_29Apr2024'; FileName = 'pfz-landing-centres.geojson'; Properties = @('SECTOR_NAM','SECTOR_ID','DIST_NAME','LC_NAME','LONGITUDE','LATITUDE','FORECAST_D','VALIDITY_D','STATUS'); Simplify = $false }
)

foreach ($layer in $staticLayers) {
    $layerPath = Join-Path $dataRoot $layer.FileName
    $needsFetch = $Force.IsPresent -or (-not (Test-Path -LiteralPath $layerPath)) -or ((Get-Item -LiteralPath $layerPath).Length -eq 0)
    if ($needsFetch) {
        if ($layer.Simplify) {
            Save-WfsGeoJson $layer.Workspace $layer.TypeName $layer.FileName $layer.Properties -SimplifyLines
        } else {
            Save-WfsGeoJson $layer.Workspace $layer.TypeName $layer.FileName $layer.Properties
        }
    } else {
        if (-not $Quiet) { Write-Output "Static layer $($layer.FileName) already exists; skipping WFS query." }
    }
}
