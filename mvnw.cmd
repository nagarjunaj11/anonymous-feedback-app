@REM Maven Wrapper startup script for Windows
@REM This allows running Maven without installing it

@echo off

set MAVEN_VERSION=3.9.5
set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-%MAVEN_VERSION%
set MAVEN_EXECUTABLE=%MAVEN_HOME%\bin\mvn.cmd

if not exist "%MAVEN_HOME%" (
    echo Downloading Maven %MAVEN_VERSION%...
    mkdir "%MAVEN_HOME%" 2>nul
    powershell -Command "& {Invoke-WebRequest -Uri 'https://dlcdn.apache.org/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip' -OutFile '%TEMP%\maven.zip'; Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists' -Force}"
)

"%MAVEN_EXECUTABLE%" %*
