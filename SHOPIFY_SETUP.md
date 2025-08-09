# 🛒 Shopify Setup Guide

Follow these steps to connect your React app to your Shopify store.

## Step 1: Create a Shopify App

1. **Go to your Shopify Admin**
   - Log into your Shopify store admin panel
   - Navigate to: `Settings` → `Apps and sales channels`

2. **Create a Private App**
   - Click `Develop apps` 
   - Click `Create an app`
   - Give your app a name (e.g., "React Storefront")

## Step 2: Configure API Access

1. **Enable Storefront API**
   - In your app settings, go to `Configuration`
   - Under `Storefront API access`, click `Configure`
   - Enable the following permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_read_collection_listings`

2. **Install the App**
   - Click `Save` and then `Install app`

## Step 3: Get Your Credentials

1. **Get Storefront Access Token**
   - In your app, go to `API credentials`
   - Under `Storefront API access tokens`, copy the token
   - This is your `storefrontAccessToken`

2. **Get Store Domain**
   - Your store domain is in the format: `your-store-name.myshopify.com`
   - You can find this in your Shopify admin URL

## Step 4: Update Your React App

1. **Open the ShopifyService file**
   ```
   src/services/ShopifyService.js
   ```

2. **Replace the configuration**
   ```javascript
   const SHOPIFY_CONFIG = {
     storeDomain: 'your-actual-store.myshopify.com',  // Replace with your domain
     storefrontAccessToken: 'shpat_xxxxxxxxxxxxxxxx', // Replace with your token
     apiVersion: '2024-07'
   }
   ```

3. **Example Configuration**
   ```javascript
   const SHOPIFY_CONFIG = {
     storeDomain: 'my-headphone-store.myshopify.com',
     storefrontAccessToken: 'shpat_your_actual_token_here',
     apiVersion: '2024-07'
   }
   ```

## Step 5: Test the Connection

1. **Save the file and refresh your browser**
2. **Check the browser console** for any errors
3. **Your products should now load from Shopify!**

## Troubleshooting

### Common Issues:

1. **"Access denied" error**
   - Make sure you've enabled the correct Storefront API permissions
   - Verify your access token is correct

2. **"Store not found" error**
   - Check your store domain format (should include `.myshopify.com`)
   - Make sure your store is active

3. **"No products found"**
   - Make sure you have products in your Shopify store
   - Check that products are published to your sales channels

4. **CORS errors**
   - This should not happen with Storefront API, but if it does:
   - Make sure you're using the Storefront API, not Admin API
   - Check your domain configuration in Shopify

### GraphQL Query Testing

You can test your configuration directly in Shopify's GraphQL app:
1. Go to Apps → GraphiQL App (install if needed)
2. Switch to Storefront API
3. Test this query:
   ```graphql
   {
     products(first: 5) {
       edges {
         node {
           id
           title
           description
         }
       }
     }
   }
   ```

## Security Note

- Never commit your actual access tokens to version control
- Consider using environment variables for production
- The Storefront API token is safe for client-side use (unlike Admin API)

## Next Steps

Once connected, you can:
- Fetch products, collections, and variants
- Implement cart functionality
- Add customer authentication
- Create a complete checkout flow

Need help? Check the [Shopify Storefront API docs](https://shopify.dev/docs/api/storefront)
