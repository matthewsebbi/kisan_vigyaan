@echo off
title CropShield AI - Full Application Runner
echo ======================================================================
echo   CropShield AI: Backend (FastAPI + Qwen3.8-27B) + Frontend (Web UI)
echo ======================================================================
echo.
set VISION_PROVIDER=groq
echo [1/3] Launching Backend Server on port 8000 (Groq Primary)...
start "CropShield Backend (Port 8000)" cmd /k "cd /d %~dp0 && set VISION_PROVIDER=groq && python -m backend.main"

echo [2/4] Building production UI bundle...
call npm run build

echo [3/4] Launching Web Frontend on port 5173...
start "CropShield Frontend (Port 5173)" cmd /k node server.mjs

echo.
echo Opening browser to http://localhost:5173/ ...
start http://localhost:5173/

echo.
echo ======================================================================
echo  System is running! 
echo  - Frontend: http://localhost:5173/
echo  - Backend:  http://localhost:8000/docs
echo ======================================================================
echo.
pause
