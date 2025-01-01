import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './DProd.scss';
import { Link, useParams } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [product, setProduct] = useState({});
  const [isOnCart,setIsOnCart]=useState(false)
  const [cart,setCart]=useState({
    product:{},
    size:"",
    quantity:0
  });
  // Fetch product data when component mounts or when id changes
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; // Prevent fetching if id is not present
      try {
        const { status, data } = await axios.get(`${route()}product/${id}`, {
          headers: { Authorization: `Bearer ${value}`},
        });

        if (status === 200) {
          setUsername(data.username);
          setRole(data.role);
          setLoggedIn(true);
          setProduct(data.product);
          setIsOnCart(data.isOnCart);
          
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, value, isOnCart, setUsername, setRole, setLoggedIn]); // Add `id` and other necessary dependencies
  const handleSize=(size)=>{
    setCart({size:size,product:product,quantity:1});
  }
  const handleAddToCart=async()=>{
    if(cart.size){
      const { status, data } = await axios.post(`${route()}addtocart`, cart, { headers: { "Authorization": `Bearer ${value}` } });
      if (status==201) {
        alert(data.msg);
      }else{
          alert("Adding incomplete")
      }
    }else{
      alert("Please select size")
    }
  }
  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="image-gallery">
            {product.pimages && product.pimages.length > 0 ? (
              <>
                <div className="main-image">
                  <img src={product.pimages[0]} alt="Main Product" className="main-product-image" />
                </div>
                <div className="thumbnails">
                  {product.pimages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-title">
            <h1>{product.pname}</h1>
            <div className="product-category">
              <strong>{product.category?.toUpperCase()}</strong>
            </div>
            <div className="product-brand">
              <strong>Brand:</strong> {product.brand}
            </div>
            <div className="product-price">
              <strong>Price:</strong>
              <span>${product.price?.toFixed(2)}</span>
            </div>

            {/* Size Options */}
            <div className="size-options">
              <strong>Select Size:</strong>
              <div className="size-choices">
                {product.sizeQuantities &&
                  Object.keys(product.sizeQuantities).map((size) => (
                    <button key={size} className="size-btn" onClick={()=>handleSize(size)} disabled={product.sizeQuantities[size]<=0}>
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="buy-options">
            <button className="buy-btn" >
                <FaCreditCard className="icon" />
                Buy Now
              </button>
              {
                isOnCart?(<Link to={'/cart'}>
                <button className="cart-btn" >
                  <FaShoppingCart className="icon" />
                  Go to Cart
                </button>
                </Link>):(<button className="cart-btn" onClick={handleAddToCart}>
                  <FaShoppingCart className="icon" />
                  Add to Cart
                </button>)
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DProd;
