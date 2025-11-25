@echo off
setlocal

:: This script automates the setup for the PMIO React PWA frontend.

echo.
echo ===========================================
echo   PMIO Frontend Project Setup
echo ===========================================
echo.

:: 1. Create the React project with Vite
echo Step 1: Creating React project with Vite...
call npm create vite@latest pmio-frontend -- --template react
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to create Vite project. Please ensure Node.js and npm are installed.
    goto :end
)
echo.
echo Project 'pmio-frontend' created successfully.

:: 2. Navigate into the new project directory
echo Step 2: Navigating into the project directory...
cd pmio-frontend
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not navigate to the project folder.
    goto :end
)

:: 3. Install required dependencies
echo Step 3: Installing dependencies...
echo This may take a few minutes...
call npm install axios i18next i18next-browser-languagedetector i18next-http-backend react-i18next react-router-dom
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies.
    goto :end
)
echo.

:: 4. Install dev dependencies
echo Step 4: Installing development dependencies...
call npm install -D vite-plugin-pwa
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install development dependencies.
    goto :end
)
echo.
echo All dependencies installed successfully.

:: 5. Create the required folder structure
echo Step 5: Creating folder structure...
mkdir src\api
mkdir src\components
mkdir src\components\common
mkdir src\components\layouts
mkdir src\features
mkdir src\features\onboarding
mkdir src\features\internships
mkdir src\features\recommendations
mkdir src\hooks
mkdir src\services
mkdir src\styles
mkdir src\utils
echo Folder structure created.

:: 6. Create the required files
echo Step 6: Creating key files...
echo > src\api\axios.js
echo > src\components\layouts\Header.js
echo > src\components\layouts\Footer.js
echo > src\features\onboarding\OnboardingScreen.js
echo > src\features\internships\InternshipList.js
echo > src\features\recommendations\RecommendationList.js
echo > src\hooks\useVoiceInput.js
echo > src\styles\global.css
echo > src\utils\i18n.js
echo > src\routes.js
echo > .env
echo Files created.

:: 7. Clean up default files
echo Step 7: Cleaning up default Vite files...
del src\App.css
del src\index.css
rmdir /s /q src\assets
echo Default files removed.

echo.
echo ===========================================
echo   PMIO Frontend Setup Complete!
echo ===========================================
echo.
echo Now, please open the 'pmio-frontend' folder in VS Code to continue.
echo You can run the project by typing 'npm run dev' inside the project folder.

:end
pause