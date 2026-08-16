param(
    [string]$ProjectRoot = (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)),
    [switch]$Quiet
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
        Move-Item -LiteralPath $temporary -Destination $target -Force
        if (-not $Quiet) { Write-Output "Updated $FileName ($featureCount features)" }
    } finally {
        Remove-Item -LiteralPath $download -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $temporary -Force -ErrorAction SilentlyContinue
    }
}

Save-WfsGeoJson 'PFZ_Automation' 'PFZ_Automation:pfzlines' 'pfz-lines.geojson' @('SECTORNAME','Julian_day','Year','UID','Length') -SimplifyLines
Save-WfsGeoJson 'PFZ_EEZ' 'PFZ_EEZ:indiaeez' 'pfz-eez.geojson' @('OBJECTID','Length') -SimplifyLines
Save-WfsGeoJson 'PFZ_Sectors' 'PFZ_Sectors:sector_new' 'pfz-sectors.geojson' @('SECTORNAME','SEC_ID')
Save-WfsGeoJson 'PFZ_LandingCentres' 'PFZ_LandingCentres:LandingCenters_29Apr2024' 'pfz-landing-centres.geojson' @('SECTOR_NAM','SECTOR_ID','DIST_NAME','LC_NAME','LONGITUDE','LATITUDE','FORECAST_D','VALIDITY_D','STATUS')
