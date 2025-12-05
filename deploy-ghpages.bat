@echo off
REM -----------------------------
REM Angular GitHub Pages Deploy Script
REM -----------------------------

REM 1. Set your GitHub repo name (replace with yours), but
REM in my case, this is a project name
SET REPO_NAME=Angular-tutorials
SET PROJ_NAME=ctbusiness.ui.app

REM 2. Clean previous build
IF EXIST dist rmdir /s /q dist

REM 3. Build Angular app for production
echo Building Angular app...
ng build --configuration production --base-href /%PROJ_NAME%/
IF ERRORLEVEL 1 (
    echo Build failed!
    exit /b 1
)

REM 4. Deploy to GitHub Pages
echo Deploying to GitHub Pages...
npx angular-cli-ghpages --dir="dist/%REPO_NAME%/browser"
IF ERRORLEVEL 1 (
    echo Deployment failed!
    exit /b 1
)

echo Deployment complete!
pause
