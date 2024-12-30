import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './Products.scss';

const Products = ({ setId, setRole, setLoggedIn }) => {
  
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  },[]);
  const fetchProducts = async () => {
    try {
      const res=await axios.get(`http://localhost:3000/api/home`,{headers:{"Authorization":`Bearer ${value}`}})
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <div className="products-container">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            {/* Seller ID */}
            <div className="product-info">
              <strong>Seller ID:</strong> {product.sellerId}
            </div>

            {/* Category */}
            <div className="product-info">
              <strong>Category:</strong> {product.category}
            </div>

            {/* Product Name */}
            <div className="product-info">
              <strong>Product Name:</strong> {product.pname}
            </div>

            {/* Brand */}
            <div className="product-info">
              <strong>Brand:</strong> {product.brand}
            </div>

            {/* Price */}
            <div className="product-info">
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </div>

            {/* Size Quantities */}
            <div className="product-info">
              <strong>Sizes:</strong>
              <div className="size-quantities">
                {Object.keys(product.sizeQuantities).map((size) => (
                  <div key={size} className="size-quantity">
                    <strong>{size}:</strong> {product.sizeQuantities[size]}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Images */}
            {product.pimages && product.pimages.length > 0 && (
              <div className="product-images">
                <strong>Product Images:</strong>
                <div className="image-gallery">
                  {product.pimages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="product-image"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
