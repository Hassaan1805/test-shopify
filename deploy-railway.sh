#!/bin/bash

# Railway Deployment Script for React + Shopify App

echo "🚂 Railway Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - React Shopify app ready for Railway deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found"
    echo "📥 Install it with: npm install -g @railway/cli"
    echo "🌐 Or deploy via Railway dashboard: https://railway.app"
    exit 1
fi

echo "🚀 Starting Railway deployment..."

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "🔑 Please login to Railway..."
    railway login
fi

# Initialize Railway project (if not already done)
if [ ! -f ".railway" ]; then
    echo "🆕 Initializing Railway project..."
    railway init
fi

# Set environment variables
echo "🔧 Setting environment variables..."
railway variables set VITE_SHOPIFY_DOMAIN=j61hwx-j0.myshopify.com
railway variables set VITE_SHOPIFY_STOREFRONT_TOKEN=09792ed6ce41c02ef3db4e88e860f82f
railway variables set VITE_SHOPIFY_API_VERSION=2025-01

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "🎉 Deployment complete!"
echo "📱 Your app will be available at the Railway dashboard URL"
echo "🌐 Visit: https://railway.app/dashboard"
echo ""
echo "💡 Tip: Use 'railway open' to open your app in browser once deployed"
