@echo off
echo ========================================
echo  Anonymous Feedback App - Quick Start
echo ========================================
echo.

echo Checking prerequisites...
echo.

:: Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed or not in PATH
    echo Please install Java 17 from https://adoptium.net/
    pause
    exit /b 1
)
echo [OK] Java found

:: Check Node
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found

:: Check Maven
mvn -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/
    pause
    exit /b 1
)
echo [OK] Maven found

echo.
echo ========================================
echo  Installing Frontend Dependencies
echo ========================================
cd frontend
if not exist node_modules (
    echo Installing npm packages...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo.
echo ========================================
echo  Starting Application
echo ========================================
echo.
echo Backend will start at: http://localhost:8080
echo Frontend will start at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

cd ..
start "Backend - Spring Boot" cmd /k "mvn spring-boot:run"
timeout /t 10
start "Frontend - React" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo  Application Starting...
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Two terminal windows have opened:
echo 1. Backend (Spring Boot)
echo 2. Frontend (React)
echo.
echo Wait for both to start, then visit:
echo http://localhost:3000
echo.
echo ========================================

pause
