@echo off
title CropShield AI - Backend Server (Port 8000)
echo ======================================================================
echo Starting CropShield AI Agriculture Wiki Backend (FastAPI + Qwen3.8-27B)
echo ======================================================================
set VISION_PROVIDER=groq
python -m backend.main
pause
