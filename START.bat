@echo off
title Anonymous Feedback App Launcher
color 0A

echo.
echo ================================================
echo    ANONYMOUS FEEDBACK APP - STARTING...
echo ================================================
echo.

:: Navigate to project directory
cd /d "%~dp0"

echo [1/3] Checking Java...
java -version 2>nul
if errorlevel 1 (
    echo ERROR: Java not found! Install from https://adoptium.net/
    pause
    exit
)
echo      Java OK!

echo [2/3] Starting Backend Server...
start "Backend Server" cmd /k "color 0B && echo Backend Starting... && mvn spring-boot:run"

echo [3/3] Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak >nul

echo [4/4] Starting Frontend...
cd frontend
start "Frontend Server" cmd /k "color 0D && echo Frontend Starting... && npm install && npm start"

echo.
echo ================================================
echo    APP IS STARTING!
echo ================================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Two windows opened:
echo   - Backend Server (Blue)
echo   - Frontend Server (Purple)
echo.
echo Wait 30 seconds, then visit: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
