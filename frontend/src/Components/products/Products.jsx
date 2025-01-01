import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './Products.scss';
import { Link, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Products = ({ setUsername, setRole, setLoggedIn }) => {
  const {category}=useParams();
  const value=localStorage.getItem("Auth")
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  },[]);
  const fetchProducts = async () => {
    try {
      const {status,data}=await axios.get(`${route()}products/${category}`,{headers:{"Authorization":`Bearer ${value}`}})
      if(status){
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <div className="products-container">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            {/* Product Images */}
            {product.pimages && product.pimages.length > 0 && (
              <div className="product-images">
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
            <div className="bottom">
              <div className="left">
                {/* Category */}
                <div className="product-info">
                  <strong>Category:</strong> <span className='product-category'>{product.category.toUpperCase()}</span>
                </div>

                {/* Product Name */}
                <div className="product-info">
                  <strong>Product Name:</strong> <span className='product-name'>{product.pname}</span>
                </div>

                {/* Brand */}
                <div className="product-info">
                  <strong>Brand:</strong> {product.brand}
                </div>

                {/* Price */}
                <div className="product-info">
                  <strong>Price:</strong><span className='product-price'>${product.price.toFixed(2)}</span> 
                </div>
              </div>
              <div className="right">
                {/* Size Quantities */}
                  <strong>Sizes:</strong>
                  <div className="size-quantities">
                    {Object.keys(product.sizeQuantities).map((size) => (
                      <div key={size} className="size-quantity">
                        <strong>{size}:</strong> {product.sizeQuantities[size]}
                      </div>
                    ))}
                </div>
              </div>
              <Link to={`/editproduct/${product._id}`}>
                <button className="edit-btn">
                  <FaEdit className="edit-icon"/>
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
