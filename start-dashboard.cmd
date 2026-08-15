@echo off
start "INCOIS Dashboard Service" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\dashboard-server.ps1"
timeout /t 8 /nobreak >nul
start "" "http://127.0.0.1:8765/"
