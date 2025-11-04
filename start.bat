@echo off
echo ========================================
echo   NutriWise360 - Starting Application
echo ========================================
echo.

echo [1/3] Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB is running
) else (
    echo ! MongoDB service not found, starting manually...
    start "MongoDB" mongod --dbpath C:\data\db
    timeout /t 3 >nul
    echo ✓ MongoDB started
)

echo.
echo [2/3] Installing dependencies...
cd backend
if not exist node_modules (
    npm install
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)

echo.
echo [3/3] Starting NutriWise360 server...
echo.
echo ========================================
echo   Server running on http://localhost:3000
echo   Press Ctrl+C to stop
echo ========================================
echo.

node server.js
