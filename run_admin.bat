@echo off
echo =======================================
echo Starting DateCart Management Analytics
echo =======================================
echo.

cd /d "%~dp0"

IF NOT EXIST "venv\" (
    echo [INFO] You must run run_streamlit.bat first to setup the environment.
    pause
    exit
)

echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [INFO] Installing any missing requirements (like openpyxl)...
pip install -r Streamlit_App\requirements.txt

echo.
echo [INFO] Launching Analytics Admin Dashboard on port 8502...
start cmd /k "venv\Scripts\activate.bat && streamlit run Streamlit_App\admin.py --server.port 8502"

echo.
echo [SUCCESS] Admin Dashboard launched! You can close this window.
exit
