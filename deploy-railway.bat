@echo off
echo 🚂 Railway Deployment Script for Windows
echo ==========================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - React Shopify app ready for Railway deployment"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Railway CLI not found
    echo 📥 Install it with: npm install -g @railway/cli
    echo 🌐 Or deploy via Railway dashboard: https://railway.app
    pause
    exit /b 1
)

echo 🚀 Starting Railway deployment...

REM Login to Railway (if not already logged in)
echo 🔐 Checking Railway authentication...
railway whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔑 Please login to Railway...
    railway login
)

REM Initialize Railway project (if not already done)
if not exist ".railway" (
    echo 🆕 Initializing Railway project...
    railway init
)

REM Set environment variables
echo 🔧 Setting environment variables...
railway variables set VITE_SHOPIFY_DOMAIN=j61hwx-j0.myshopify.com
railway variables set VITE_SHOPIFY_STOREFRONT_TOKEN=09792ed6ce41c02ef3db4e88e860f82f
railway variables set VITE_SHOPIFY_API_VERSION=2025-01

REM Deploy to Railway
echo 🚀 Deploying to Railway...
railway up

echo.
echo 🎉 Deployment complete!
echo 📱 Your app will be available at the Railway dashboard URL
echo 🌐 Visit: https://railway.app/dashboard
echo.
echo 💡 Tip: Use 'railway open' to open your app in browser once deployed
pause
