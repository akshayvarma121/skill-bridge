@echo off
REM ===============================
REM Setup FastAPI Project Structure
REM Project Name: PMIO
REM ===============================

set PROJECT=PMIO

echo Creating project folder: %PROJECT%
mkdir %PROJECT%

cd %PROJECT%

REM Create main app folder
mkdir app
mkdir app\api
mkdir app\core
mkdir app\services

REM Create __init__.py files
echo. > app\__init__.py
echo. > app\api\__init__.py
echo. > app\core\__init__.py
echo. > app\services\__init__.py

REM Create base Python files
echo from pydantic import BaseSettings > app\core\config.py
echo from fastapi import APIRouter> app\api\routes.py
echo from fastapi import FastAPI> app\main.py

REM Create requirements.txt
(
echo fastapi
echo uvicorn[standard]
echo pydantic
echo motor
echo aioredis
) > requirements.txt

REM Create run script
(
echo @echo off
echo uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
) > run.bat

echo Project %PROJECT% setup complete!
