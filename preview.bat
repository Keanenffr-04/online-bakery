@echo off
rem Double-click to preview the site. Picks a free port and opens your browser.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview.ps1"
pause
