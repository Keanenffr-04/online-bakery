# preview.ps1: serves the site locally on the first free port and opens it in your browser.
# Double-click preview.bat (or run: powershell -ExecutionPolicy Bypass -File preview.ps1). Press Ctrl+C to stop.
# No installs needed: uses built-in .NET HttpListener, serves the repo root so ../config and ../assets work.
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

# Ask Windows for any free port.
$probe = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, 0)
$probe.Start(); $port = $probe.LocalEndpoint.Port; $probe.Stop()

$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript'; '.json'='application/json'
  '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'
  '.webp'='image/webp'; '.woff2'='font/woff2'; '.txt'='text/plain; charset=utf-8'; '.md'='text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
$url = "http://localhost:$port/src/index.html"
Write-Host "The Sweetest Bakery preview running at $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray
Start-Process $url

try {
  while ($listener.IsListening) {
    $async = $listener.BeginGetContext($null, $null)
    while (-not $async.AsyncWaitHandle.WaitOne(200)) { }   # short waits so Ctrl+C works
    $ctx = $listener.EndGetContext($async)
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq '') { $ctx.Response.Redirect('/src/index.html'); $ctx.Response.Close(); continue }
    $path = [System.IO.Path]::GetFullPath((Join-Path $root $rel))
    if ($path.StartsWith($root) -and (Test-Path $path -PathType Leaf)) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')   # always show your latest edits
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
    }
    $ctx.Response.Close()
  }
} finally {
  $listener.Stop()
}
