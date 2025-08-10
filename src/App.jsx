import { useState, useEffect } from 'react'
import './App.css'
import ProductGrid from './components/ProductGrid'
import ShopifyService from './services/ShopifyService'
import { debugEnv } from './debug-env'

function App() {
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Debug environment variables
    console.log('🐛 Debug Environment:', debugEnv())
    
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Starting to fetch data...')
        
        // Fetch products first (temporarily skip collections)
        const productsData = await ShopifyService.getProducts()
        console.log('✅ Products loaded:', productsData)
        setProducts(productsData)
        
        // TODO: Re-enable collections after products work
        // const collectionsData = await ShopifyService.getCollections()
        // setCollections(collectionsData)
        
      } catch (err) {
        console.error('💥 Error in fetchInitialData:', err)
        if (err.message.includes('configure your Shopify credentials') || err.message.includes('Environment variables not configured')) {
          setError({
            type: 'config',
            message: 'Shopify credentials not configured',
            details: err.message
          })
        } else {
          setError({
            type: 'api',
            message: 'Failed to load products from Shopify',
            details: err.message
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleCollectionChange = async (collectionHandle) => {
    if (collectionHandle === selectedCollection) return
    
    setSelectedCollection(collectionHandle)
    setLoading(true)
    
    try {
      let productsData
      if (collectionHandle === 'all') {
        productsData = await ShopifyService.getProducts()
      } else {
        productsData = await ShopifyService.getProductsByCollection(collectionHandle)
      }
      setProducts(productsData)
    } catch (err) {
      setError({
        type: 'api',
        message: 'Failed to load products from collection',
        details: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎧 Audio Store</h1>
        <p>Premium Headphones & Audio Equipment</p>
        
        {/* Collection Navigation */}
        {collections.length > 0 && (
          <div className="collection-nav">
            <button 
              className={`collection-btn ${selectedCollection === 'all' ? 'active' : ''}`}
              onClick={() => handleCollectionChange('all')}
            >
              All Products
            </button>
            {collections.map(collection => (
              <button
                key={collection.id}
                className={`collection-btn ${selectedCollection === collection.handle ? 'active' : ''}`}
                onClick={() => handleCollectionChange(collection.handle)}
              >
                {collection.title}
                <span className="product-count">({collection.productsCount})</span>
              </button>
            ))}
          </div>
        )}
      </header>
      
      <main className="app-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className={`error ${error.type === 'config' ? 'config-error' : 'api-error'}`}>
            <h3>{error.message}</h3>
            {error.type === 'config' ? (
              <div className="config-instructions">
                <p>To connect to your Shopify store:</p>
                <ol>
                  <li>Go to your Shopify Admin panel</li>
                  <li>Navigate to Apps → Develop apps → Create an app</li>
                  <li>Configure Storefront API access</li>
                  <li>Copy your store domain and access token</li>
                  <li>Update the credentials in <code>src/services/ShopifyService.js</code></li>
                </ol>
                <details>
                  <summary>Show configuration template</summary>
                  <pre>{`const SHOPIFY_CONFIG = {
  storeDomain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-access-token-here',
  apiVersion: '2024-07'
}`}</pre>
                </details>
              </div>
            ) : (
              <div className="api-error-details">
                <p>API Error: {error.details}</p>
                <p>Please check your Shopify configuration and network connection.</p>
              </div>
            )}
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <ProductGrid 
            products={products} 
            collections={collections}
            selectedCollection={selectedCollection}
          />
        )}
      </main>
    </div>
  )
}

export default App
