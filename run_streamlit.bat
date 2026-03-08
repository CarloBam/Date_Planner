@echo off
echo =======================================
echo Starting DateCart Cape Town (Streamlit)
echo =======================================
echo.

cd /d "%~dp0"

IF NOT EXIST "venv\" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)

echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [INFO] Installing required packages...
pip install -r Streamlit_App\requirements.txt

echo.
echo [INFO] Launching Streamlit App...
start cmd /k "venv\Scripts\activate.bat && streamlit run Streamlit_App\app.py"

echo.
echo [SUCCESS] Streamlit launched! You can close this window.
exit
