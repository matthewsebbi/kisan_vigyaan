@echo off
title CropShield AI - Diagnosis Test Runner
echo ======================================================================
echo Launching CropShield AI Test Pipeline (Qwen 3.8 Vision + Reasoning)
echo ======================================================================
node test_pipeline.mjs
echo.
echo ======================================================================
echo Finished! The diagnostic report is saved to diagnosis_result.md
echo ======================================================================
pause
