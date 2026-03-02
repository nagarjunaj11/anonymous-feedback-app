@echo off
title Maven Auto-Installer
color 0E

echo ========================================
echo    MAVEN AUTO-INSTALLER
echo ========================================
echo.
echo This will install Maven using Chocolatey
echo (a Windows package manager)
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo [1/3] Checking if Chocolatey is installed...
where choco >nul 2>&1
if errorlevel 1 (
    echo Chocolatey not found. Installing Chocolatey first...
    echo This requires Administrator privileges.
    echo.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    echo.
    echo Chocolatey installed!
    echo Please close this window and run this script again.
    pause
    exit
) else (
    echo Chocolatey found!
)

echo.
echo [2/3] Installing Maven...
choco install maven -y

echo.
echo [3/3] Refreshing environment...
refreshenv

echo.
echo ========================================
echo    MAVEN INSTALLED SUCCESSFULLY!
echo ========================================
echo.
echo Please:
echo 1. Close this window
echo 2. Close PowerShell/CMD
echo 3. Open a NEW PowerShell/CMD window
echo 4. Run: cd D:\GitHubProjects\anonymous-feedback-app
echo 5. Run: START.bat
echo.
echo Press any key to exit...
pause >nul
