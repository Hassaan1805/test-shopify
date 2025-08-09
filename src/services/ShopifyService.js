import axios from 'axios'

// Shopify Storefront API configuration
const SHOPIFY_CONFIG = {
  // Use environment variables in production, fallback to hardcoded values for development
  storeDomain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'your-store-name.myshopify.com',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'your-storefront-access-token',
  apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-07'
}

const STOREFRONT_API_URL = `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`

// GraphQL query for fetching products (simplified for debugging)
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          productType
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

// GraphQL query for fetching products by collection
const PRODUCTS_BY_COLLECTION_QUERY = `
  query getProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            productType
            vendor
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`

// GraphQL query for fetching collections
const COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productsCount
        }
      }
    }
  }
`

class ShopifyService {
  static async getProducts(limit = 20) {
    console.log('🔍 Starting getProducts with config:', {
      domain: SHOPIFY_CONFIG.storeDomain,
      apiVersion: SHOPIFY_CONFIG.apiVersion,
      url: STOREFRONT_API_URL
    })

    try {
      console.log('📡 Making API request...')
      const response = await axios.post(
        STOREFRONT_API_URL,
        {
          query: PRODUCTS_QUERY,
          variables: { first: limit }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken
          }
        }
      )

      console.log('✅ API Response received:', response.data)

      if (response.data.errors) {
        console.error('❌ GraphQL Errors:', response.data.errors)
        throw new Error(response.data.errors[0].message)
      }

      const products = this.formatShopifyProducts(response.data.data.products.edges)
      console.log('🎯 Formatted products:', products)
      return products
    } catch (error) {
      console.error('💥 Error fetching from Shopify:', error)
      if (error.response) {
        console.error('📋 Error response:', error.response.data)
        console.error('📊 Error status:', error.response.status)
      }
      throw error
    }
  }

  static async getProductsByCollection(collectionHandle, limit = 20) {
    try {
      const response = await axios.post(
        STOREFRONT_API_URL,
        {
          query: PRODUCTS_BY_COLLECTION_QUERY,
          variables: { handle: collectionHandle, first: limit }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken
          }
        }
      )

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }

      if (!response.data.data.collection) {
        return []
      }

      return this.formatShopifyProducts(response.data.data.collection.products.edges)
    } catch (error) {
      console.error('Error fetching products by collection:', error)
      throw error
    }
  }

  static async getCollections(limit = 10) {
    try {
      const response = await axios.post(
        STOREFRONT_API_URL,
        {
          query: COLLECTIONS_QUERY,
          variables: { first: limit }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken
          }
        }
      )

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }

      return response.data.data.collections.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        productsCount: node.productsCount
      }))
    } catch (error) {
      console.error('Error fetching collections:', error)
      throw error
    }
  }

  static formatShopifyProducts(productEdges) {
    return productEdges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description || '',
      price: `$${node.priceRange.minVariantPrice.amount}`,
      image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/400x400?text=No+Image',
      type: node.productType || '',
      vendor: node.vendor || '',
      collections: [] // Simplified for debugging
    }))
  }

  static async getProduct(productId) {
    // Get single product by ID from Shopify
    const SINGLE_PRODUCT_QUERY = `
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          description
          productType
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    `

    try {
      const response = await axios.post(
        STOREFRONT_API_URL,
        {
          query: SINGLE_PRODUCT_QUERY,
          variables: { id: productId }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken
          }
        }
      )

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }

      if (!response.data.data.product) {
        throw new Error('Product not found')
      }

      return this.formatShopifyProduct(response.data.data.product)
    } catch (error) {
      console.error('Error fetching product from Shopify:', error)
      throw error
    }
  }

  static formatShopifyProduct(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: `$${product.priceRange.minVariantPrice.amount}`,
      images: product.images.edges.map(edge => edge.node.url),
      type: product.productType,
      vendor: product.vendor
    }
  }
}

export default ShopifyService
