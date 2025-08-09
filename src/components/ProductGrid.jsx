import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

const ProductGrid = ({ products, collections, selectedCollection }) => {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Get unique product types for filtering (now from actual products)
  const productTypes = ['all', ...new Set(products.map(product => product.type).filter(Boolean))]

  // Also get collection-based categories
  const collectionTypes = products.length > 0 ? 
    ['all', ...new Set(products.flatMap(product => 
      product.collections?.map(col => col.title) || []
    ))] : ['all']

  // Use collection types if we have them, otherwise fall back to product types
  const filterOptions = collectionTypes.length > 1 ? collectionTypes : productTypes

  // Filter products
  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    
    // Try to filter by collection first
    if (product.collections && product.collections.some(col => col.title === filter)) {
      return true
    }
    
    // Fall back to product type
    return product.type === filter
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title)
      case 'price':
        const priceA = parseFloat(a.price.replace('$', ''))
        const priceB = parseFloat(b.price.replace('$', ''))
        return priceA - priceB
      case 'vendor':
        return a.vendor.localeCompare(b.vendor)
      default:
        return 0
    }
  })

  // Reset filter when collection changes
  useEffect(() => {
    setFilter('all')
  }, [selectedCollection])

  return (
    <div className="product-grid-container">
      {/* Filters and Sorting */}
      <div className="controls">
        <div className="filter-section">
          <label htmlFor="filter">Filter by type:</label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-section">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="vendor">Brand</option>
          </select>
        </div>
      </div>

      {/* Products Count */}
      <div className="products-count">
        Showing {sortedProducts.length} of {products.length} products
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
