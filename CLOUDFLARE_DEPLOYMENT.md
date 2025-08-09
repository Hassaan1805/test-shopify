# 🌩️ Cloudflare Pages Deployment Guide

Complete guide to deploy your React + Shopify app on Cloudflare Pages with proper environment variable configuration.

## 🚀 Current Status
✅ **Deployed**: Your app is live at `test-shopify-578.pages.dev`  
❌ **Issue**: Environment variables not configured (causing Shopify API errors)

## 🔧 Fix Environment Variables

### Step 1: Access Cloudflare Dashboard
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** in the sidebar
3. Click on your **test-shopify** project

### Step 2: Configure Environment Variables
1. Click on **Settings** tab
2. Scroll down to **Environment variables** section
3. Click **Add variable** and add these **one by one**:

```env
Variable name: VITE_SHOPIFY_DOMAIN
Value: j61hwx-j0.myshopify.com
Environment: Production (and Preview if you want)
```

```env
Variable name: VITE_SHOPIFY_STOREFRONT_TOKEN  
Value: 09792ed6ce41c02ef3db4e88e860f82f
Environment: Production (and Preview if you want)
```

```env
Variable name: VITE_SHOPIFY_API_VERSION
Value: 2024-07
Environment: Production (and Preview if you want)
```

### Step 3: Redeploy
1. After adding all variables, go to **Deployments** tab
2. Click **View details** on the latest deployment
3. Click **Retry deployment** or **Redeploy**
4. Wait for build to complete (usually 1-2 minutes)

## 🔄 Alternative: Force Redeploy via Git

If the above doesn't work, push a small change to trigger redeploy:

```bash
# Make a small change to trigger redeploy
git commit --allow-empty -m "Trigger redeploy for env vars"
git push origin main
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Environment variables not configured"**
   - Solution: Follow Step 2 above to add variables
   - Make sure to set them for "Production" environment

2. **"Network Error" persists**
   - Check if variables are correctly spelled (case-sensitive)
   - Verify your Shopify credentials are still valid
   - Try redeploying after 5 minutes

3. **Build fails**
   - Check build logs in Cloudflare dashboard
   - Ensure all dependencies are in package.json

### Verify Environment Variables
After deployment, check browser console for this log:
```
🔧 Shopify Config: {
  domain: "j61hwx-j0.myshopify.com",
  hasToken: true,
  tokenLength: 32,
  apiVersion: "2024-07",
  environment: "production"
}
```

## 📊 Build Settings (Should be automatic)

Cloudflare should detect these automatically, but verify:
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`

## 🔐 Security Best Practices

✅ **What we did right:**
- Environment variables stored securely in Cloudflare
- No credentials in Git repository
- Proper error handling

⚠️ **Additional security:**
- Consider rotating Shopify tokens periodically
- Monitor Cloudflare access logs
- Set up proper CORS if needed

## 🎯 Expected Result

After fixing environment variables, your app should:
1. ✅ Load without errors
2. ✅ Display products from your Shopify store  
3. ✅ Show collection navigation (Headphones/Earphones)
4. ✅ Allow filtering and sorting

## 📱 Testing Deployment

1. **Open**: https://test-shopify-578.pages.dev
2. **Check**: Products load correctly
3. **Test**: Collection filtering works
4. **Verify**: No console errors

## 🚀 Next Steps After Fix

1. **Custom Domain**: Add your own domain in Cloudflare
2. **Analytics**: Enable Cloudflare Web Analytics
3. **Performance**: Check Core Web Vitals
4. **SEO**: Add meta tags and sitemap

---

## ⚡ Quick Fix Checklist

- [ ] Add `VITE_SHOPIFY_DOMAIN` environment variable
- [ ] Add `VITE_SHOPIFY_STOREFRONT_TOKEN` environment variable  
- [ ] Add `VITE_SHOPIFY_API_VERSION` environment variable
- [ ] Redeploy the application
- [ ] Test the live site
- [ ] Verify products load correctly

Your app should work perfectly once these environment variables are configured! 🎉
