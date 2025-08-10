// Environment Variables Debug Tool
// Add this temporarily to check what's available in production

console.log('🔍 Environment Debug Info:')
console.log('NODE_ENV:', import.meta.env.MODE)
console.log('Available env vars:', Object.keys(import.meta.env))
console.log('VITE_SHOPIFY_DOMAIN:', import.meta.env.VITE_SHOPIFY_DOMAIN)
console.log('VITE_SHOPIFY_STOREFRONT_TOKEN:', import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ? 'SET' : 'NOT SET')
console.log('VITE_SHOPIFY_API_VERSION:', import.meta.env.VITE_SHOPIFY_API_VERSION)

export const debugEnv = () => {
  return {
    mode: import.meta.env.MODE,
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
    hasToken: !!import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
    apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION,
    allVars: import.meta.env
  }
}
