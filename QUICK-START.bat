@echo off
title Anonymous Feedback App - Quick Start
color 0B

echo ============================================
echo    ANONYMOUS FEEDBACK APP - FRONTEND ONLY
echo ============================================
echo.

cd /d "%~dp0\frontend"

echo [Step 1/2] Installing dependencies...
echo This may take 2-3 minutes on first run...
echo.

call npm install

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed!
    echo Make sure Node.js is installed: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [Step 2/2] Starting React frontend...
echo.
echo The browser will open automatically...
echo If not, visit: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000

call npm start

pause
