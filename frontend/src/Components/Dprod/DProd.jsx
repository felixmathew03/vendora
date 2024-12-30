import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './DProd.scss';
import { Link, useParams } from 'react-router-dom';

const DProd = ({setId,setRole,setLoggedIn}) => {
    
  const {id}=useParams();
  console.log(id);
  
  const value=localStorage.getItem("Auth")
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetchProduct();
  },[]);
  const fetchProduct = async () => {
      console.log("data");
    try {
      const {status,data}=await axios.get(`${route()}product/${id}`,{headers:{"Authorization":`Bearer ${value}`}})
        
      if(status==200){
        setId(data.id);
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  console.log(product);
  
  return (
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
  )
}

export default DProd;
