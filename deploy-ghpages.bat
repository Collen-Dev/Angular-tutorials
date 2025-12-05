@echo off
REM -----------------------------
REM Angular GitHub Pages Deploy Script
REM -----------------------------

REM 1. Set your GitHub repo name (replace with yours)
SET REPO_NAME=Angular-tutorials

REM 2. Clean previous build
IF EXIST dist rmdir /s /q dist

REM 3. Build Angular app for production
echo Building Angular app...
ng build --configuration production --base-href /%REPO_NAME%/
IF ERRORLEVEL 1 (
    echo Build failed!
    exit /b 1
)

REM 4. Deploy to GitHub Pages
echo Deploying to GitHub Pages...
npx angular-cli-ghpages --dir="dist/%REPO_NAME%"
IF ERRORLEVEL 1 (
    echo Deployment failed!
    exit /b 1
)

echo Deployment complete!
pause
