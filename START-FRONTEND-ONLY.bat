@echo off
title Frontend Only - Anonymous Feedback App
color 0D

echo ========================================
echo    STARTING FRONTEND ONLY
echo ========================================
echo.
echo NOTE: Backend is not running yet.
echo You can see the UI, but features won't work
echo until you install Maven and start the backend.
echo.
echo Press any key to continue...
pause >nul

cd frontend

echo Installing dependencies...
call npm install

echo.
echo Starting React frontend...
echo.
echo Visit: http://localhost:3000
echo.

npm start
