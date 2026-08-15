$ErrorActionPreference = 'Stop'
$repositoryRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$validator = Join-Path $repositoryRoot 'scripts\validate-status.ps1'

& $validator -Path (Join-Path $repositoryRoot 'tests\fixtures\status-minimal.json')
& $validator -Path (Join-Path $repositoryRoot 'status.json')
