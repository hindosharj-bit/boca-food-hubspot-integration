'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1>Welcome to Boca Food</h1>
      <p>Discover our delicious menu items</p>
      
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {products.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <h3>{product.name}</h3>
              <p>Price: {product.price} MAD</p>
              <p>{product.description}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}
