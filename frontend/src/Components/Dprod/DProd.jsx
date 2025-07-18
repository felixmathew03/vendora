import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './DProd.scss';
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa';
import Footer from '../footer/Footer';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isOnCart, setIsOnCart] = useState(false);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState({
    product: {},
    sizeOrColor: "",
    index: 0,
    quantity: 0
  });

  useEffect(() => {
    fetchProduct();
  }, [id, value, setUsername, setRole, setLoggedIn]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const { status, data } = await axios.get(`${route()}product/${id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });

      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
        setIsOnCart(data.isOnCart);
        setIsOnWishlist(data.isOnWishlist);
        console.log(data.relatedProducts);
        
        setRelatedProducts(data.relatedProducts)
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSize = (size,ind) => {
    setSelectedSize(size);
    setCart({ sizeOrColor: size, index: ind, product: product, quantity: 1 });
  };

  const handleAddToCart = async () => {
    if (cart.sizeOrColor) {
      const { status, data } = await axios.post(`${route()}addtocart`, cart, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status === 201) {
        alert(data.msg);
        fetchProduct();
      } else {
        alert("Adding incomplete");
      }
    } else {
      alert("Please select size");
    }
  };

  const addToWishlist = async (id) => {
    const { status, data } = await axios.post(`${route()}addtowishlist`, { id }, {
      headers: { "Authorization": `Bearer ${value}` }
    });
    if (status === 201) {
      alert("Wishlist added");
      fetchProduct();
    } else {
      alert("Failed");
    }
  };

  const removeFromWishlist = async (id) => {
    const { status, data } = await axios.delete(`${route()}removefromwishlist`, {
      data: { id },
      headers: { "Authorization": `Bearer ${value}` }
    });
    if (status === 201) {
      alert("Removed from wishlist");
      fetchProduct();
    } else {
      alert("Failed");
    }
  };

  const handleBuynow = async () => {
    
    if (cart.sizeOrColor) {
      const { status, data } = await axios.post(`${route()}addtocart`, cart, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status === 201) {
        alert(data.msg);
        navigate(`/scart/${product._id}`);
      } else {
        alert("Could not add to cart");
      }
    } else {
      alert("Please select size");
    }
  };
  const goBack=()=>{
    navigate(`/`);
  }
  return (
    <div className="product-page">
      <div className="path">
        <p>Home </p>
        <p className='dull'>/</p>
        <p>{product.category}</p>
        <p className='dull'>/</p>
        <p className='dull'>{product.pname}</p>
      </div>
      <div className="backButton">
        <button onClick={goBack}><span>{"<< "} </span> Back to Home</button>
      </div>
      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
            {product.pimages && product.pimages.length > 0 ? (
              <>
                <div className="main-image">
                  <img id='img' src={product.pimages[0]} alt="Main Product" className="main-product-image" />
                </div>
                <div className="thumbnails">
                  {product.pimages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      onMouseOver={() => { document.getElementById("img").src = product.pimages[index]; }}
                      className="thumbnail"
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available</p>
            )}
        </div>

        {/* Product Details */}
        <div className="product-details">
            <div className="product-title">
              <h1>{product.pname}</h1>
            </div>
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
                {product.sizeColorQuantities &&
                  product.sizeColorQuantities.map((sq,ind) => (
                    <button
                      key={ind}
                      className={`size-btn ${selectedSize === sq.sizeOrColor ? 'selected' : ''}`}
                      onClick={() => handleSize(sq.sizeOrColor,ind)}
                      disabled={sq.quantity <= 0}
                    >

                      {sq.sizeOrColor}
                    </button>
                  ))}
              </div>
            </div>

            {/* Buy Options */}
            <div className="buy-options">
              {isOnCart ? (
                <Link to={`/scart/${product._id}`}>
                  <button className="buy-btn">
                    <FaCreditCard className="icon" />
                    Buy Now
                  </button>
                </Link>
              ) : (
                <button className="buy-btn" onClick={handleBuynow}>
                  <FaCreditCard className="icon" />
                  Buy Now
                </button>
              )}
              {isOnCart ? (
                <Link to={'/cart'}>
                  <button className="cart-btn">
                    <FaShoppingCart className="icon" />
                    Go to Cart
                  </button>
                </Link>
              ) : (
                <button className="cart-btn" onClick={handleAddToCart}>
                  <FaShoppingCart className="icon" />
                  Add to Cart
                </button>
              )}
            </div>

            {/* Wishlist */}
            {!isOnCart && (isOnWishlist ?
              <img src="/images/liked.png" alt="Wishlist" onClick={() => { removeFromWishlist(product._id) }} /> :
              <img src="/images/wlist.png" alt="Wishlist" onClick={() => { addToWishlist(product._id) }} />
            )}
        </div>
      </div>
      <div className='related-products'>
        <h2>Related Products</h2>
        <div className="products-container">
        {relatedProducts && relatedProducts.length > 0 ? (
          relatedProducts.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              key={product._id}
            >
              <Link
                to={`/product/${product._id}`}
                className="product-card"
              >
                <div className="product-images">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    src={product.pimages[0]}
                    alt={product.pname}
                    className="product-image"
                  />
                </div>
                <div className="bottom">
                  <div className="product-info">
                    <span className="product-name">{product.pname}</span>
                  </div>
                  <div className="product-info">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DProd;
