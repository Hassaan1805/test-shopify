# 🚂 Railway Deployment Guide

Deploy your React + Shopify app to Railway in minutes!

## Prerequisites

- [Railway account](https://railway.app) (free tier available)
- [Git](https://git-scm.com/) installed
- [Railway CLI](https://docs.railway.app/develop/cli) (optional but recommended)

## Method 1: Deploy via Railway Dashboard (Recommended)

### Step 1: Prepare Your Repository

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - React Shopify app"
   ```

2. **Push to GitHub/GitLab**:
   - Create a new repository on GitHub or GitLab
   - Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign in** with your GitHub/GitLab account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Railway will automatically detect it's a Node.js project**

### Step 3: Configure Environment Variables

In your Railway project dashboard:

1. **Go to Variables tab**
2. **Add these environment variables**:
   ```
   VITE_SHOPIFY_DOMAIN = j61hwx-j0.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN = 09792ed6ce41c02ef3db4e88e860f82f
   VITE_SHOPIFY_API_VERSION = 2025-01
   ```

3. **Railway will automatically redeploy** with the new variables

### Step 4: Custom Domain (Optional)

1. **In Railway dashboard, go to Settings**
2. **Add your custom domain** (e.g., mystore.com)
3. **Update your DNS** to point to Railway

## Method 2: Deploy via Railway CLI

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login and Deploy

```bash
railway login
railway init
railway up
```

### Step 3: Set Environment Variables

```bash
railway variables set VITE_SHOPIFY_DOMAIN=j61hwx-j0.myshopify.com
railway variables set VITE_SHOPIFY_STOREFRONT_TOKEN=09792ed6ce41c02ef3db4e88e860f82f
railway variables set VITE_SHOPIFY_API_VERSION=2025-01
```

## Build Configuration

Railway will automatically:
- **Detect** it's a Vite React project
- **Install** dependencies with `npm install`
- **Build** the project with `npm run build`
- **Serve** with `npm run preview`

## Deployment Settings

The app includes these Railway configurations:

### railway.toml
```toml
[build]
  builder = "nixpacks"
  
[deploy]
  startCommand = "npm run preview"
  restartPolicyType = "on_failure"
  restartPolicyMaxRetries = 10
```

### Environment Variables
```env
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-access-token
VITE_SHOPIFY_API_VERSION=2025-01
```

## Verification

After deployment:

1. **Check Railway dashboard** for deployment status
2. **Visit your Railway app URL** (provided in dashboard)
3. **Verify Shopify products load** correctly
4. **Test all functionality** (filtering, sorting, etc.)

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Railway build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Environment Variables**:
   - Make sure all VITE_ prefixed variables are set
   - Railway will restart automatically when variables change

3. **Shopify Connection Issues**:
   - Verify your Shopify credentials are correct
   - Check CORS settings (shouldn't be an issue with Storefront API)
   - Ensure your Shopify app has proper permissions

4. **Domain Issues**:
   - DNS propagation can take up to 24 hours
   - Use Railway's provided domain for testing first

### Getting Help:

- **Railway Discord**: [Join Railway Community](https://discord.gg/railway)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Status**: [status.railway.app](https://status.railway.app)

## Cost Estimation

- **Free Tier**: $0/month - Perfect for testing and small apps
- **Usage-based pricing**: Pay only for what you use
- **No credit card required** for free tier

## Security Best Practices

1. **Never commit sensitive data** to Git
2. **Use environment variables** for all credentials
3. **Regularly rotate** API tokens
4. **Monitor usage** in Railway dashboard

## Next Steps After Deployment

1. **Set up monitoring** (Railway provides basic metrics)
2. **Configure custom domain**
3. **Set up CI/CD** for automatic deployments
4. **Add SSL certificate** (automatically provided by Railway)
5. **Monitor performance** and optimize as needed

Your app will be live at: `https://your-project-name.railway.app`

🎉 **Congratulations!** Your React + Shopify app is now deployed on Railway!
