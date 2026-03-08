@echo off
echo =========================================
echo   Starting DateCart Cape Town App
echo =========================================
echo.

:: Navigate to the Next.js project directory
cd /d "%~dp0Date_Planner_Root"

:: Check if node_modules exists, and run npm install if it does not
IF NOT EXIST "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies first...
    call npm install
    echo.
)

:: Start the Next.js development server in a new command window
echo [INFO] Starting development server...
start cmd /k "npm run dev"

:: Wait a few seconds for the server to initialize
echo [INFO] Waiting for server to start before opening browser...
timeout /t 5 /nobreak >nul

:: Open the default web browser to the localhost address
start http://localhost:3000

echo.
echo [SUCCESS] App launched in browser! You can close this window.
exit
