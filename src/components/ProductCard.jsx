import { useState } from 'react'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    // This would integrate with Shopify's cart API
    alert(`Added "${product.title}" to cart!\n\nIn a real implementation, this would:\n- Add the product to Shopify cart\n- Update cart state\n- Show confirmation`)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="image-loader"></div>
          </div>
        )}
        <img 
          src={imageError ? 'https://via.placeholder.com/400x400?text=No+Image' : product.image}
          alt={product.title}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="product-overlay">
          <button 
            className="quick-view-btn"
            onClick={() => alert(`Quick view for: ${product.title}`)}
          >
            Quick View
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-vendor">{product.vendor}</div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description
          }
        </p>
        
        {/* Display collections */}
        {product.collections && product.collections.length > 0 && (
          <div className="product-collections">
            {product.collections.map(collection => (
              <span key={collection.id} className="collection-tag">
                {collection.title}
              </span>
            ))}
          </div>
        )}
        
        {product.type && (
          <div className="product-type">{product.type}</div>
        )}
        
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
