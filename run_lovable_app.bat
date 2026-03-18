@echo off
echo ========================================================
echo Launching Lovable Date Explorer Frontend (Portable Node)
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Check if the app directory exists
IF NOT EXIST "date-explorer-cape-town-main\" (
    IF NOT EXIST "date-explorer-cape-town\" (
        echo [ERROR] The frontend application folder is missing!
        echo By accident, earlier cleaning operations removed it.
        echo Please do the following to restore it:
        echo 1. Go to your GitHub tab in your browser.
        echo 2. Click the green "Code" button and "Download ZIP".
        echo 3. Extract the ZIP inside this directory.
        echo 4. Make sure the folder is named "date-explorer-cape-town" or "date-explorer-cape-town-main".
        echo 5. Run this bat file again.
        echo.
        pause
        exit
    ) else (
        set APP_DIR=date-explorer-cape-town
    )
) else (
    set APP_DIR=date-explorer-cape-town-main
)

:: 2. Set up portable Node.js so "npm" works exactly like the screenshot needs
echo [INFO] Setting up Portable Node.js...
set "PATH=%~dp0node-v20.11.1-win-x64;%PATH%"

echo.
echo [INFO] Current Node Version:
node -v
echo [INFO] Current NPM Version:
call npm -v
echo.

:: 3. Change directory and run
cd "%APP_DIR%"

IF NOT EXIST "node_modules\" (
    echo [INFO] Cleaning up incompatible lockfiles...
    if exist "package-lock.json" del /F /Q "package-lock.json"
    if exist "bun.lockb" del /F /Q "bun.lockb"
    
    echo [INFO] Configuring NPM for maximum compatibility...
    call npm config set strict-ssl false
    call npm config set registry http://registry.npmjs.org/
    call npm cache clean --force
    
    echo [INFO] Installing frontend dependencies - this may take a minute...
    call npm install --no-fund --no-audit --legacy-peer-deps --loglevel info
)

echo.
echo [INFO] Starting the development server...
call npm run dev

pause
