param([int]$Port = 8765)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$updater = Join-Path $projectRoot 'update-status.ps1'
$prefix = "http://127.0.0.1:$Port/"

& $updater -Quiet
$refreshJob = Start-Job -ArgumentList $updater -ScriptBlock {
    param($scriptPath)
    while ($true) {
        Start-Sleep -Seconds 600
        & $scriptPath -Quiet
    }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "INCOIS dashboard running at $prefix"
Write-Host 'Automatic refresh: every 10 minutes. Press Ctrl+C to stop.'

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        try {
            if ($request.Url.AbsolutePath -eq '/api/refresh' -and $request.HttpMethod -eq 'POST') {
                & $updater -Quiet
                $path = Join-Path $projectRoot 'status.json'
                $bytes = [System.IO.File]::ReadAllBytes($path)
                $response.ContentType = 'application/json; charset=utf-8'
            } else {
                $relative = $request.Url.AbsolutePath.TrimStart('/')
                if (-not $relative) { $relative = 'index.html' }
                $path = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $relative))
                if (-not $path.StartsWith([System.IO.Path]::GetFullPath($projectRoot))) { throw 'Invalid path' }
                if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { $response.StatusCode = 404; $bytes = [Text.Encoding]::UTF8.GetBytes('Not found') }
                else {
                    $bytes = [System.IO.File]::ReadAllBytes($path)
                    $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
                    $response.ContentType = switch ($ext) { '.html' {'text/html; charset=utf-8'} '.json' {'application/json; charset=utf-8'} '.css' {'text/css; charset=utf-8'} '.js' {'text/javascript; charset=utf-8'} default {'application/octet-stream'} }
                }
            }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $response.StatusCode = 500
            $bytes = [Text.Encoding]::UTF8.GetBytes($_.Exception.Message)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } finally { $response.OutputStream.Close() }
    }
} finally {
    $listener.Stop()
    Stop-Job $refreshJob -ErrorAction SilentlyContinue
    Remove-Job $refreshJob -Force -ErrorAction SilentlyContinue
}
