import React, { useEffect, useState } from 'react';
import route from '../route';
import axios from 'axios';
import './Wishlist.scss';
import { Link } from 'react-router-dom';

const Wishlist = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getwishlists`, {
          headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setProducts(res.data.products);
        } 
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className='Wishlist'>
      <h1 className="wishlist-heading">Your Wishlist</h1>
      <div className="products-container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                {/* First content (image) */}
                <div className="first-content">
                  <img
                    src={product.pimages[0]}
                    alt={`Product Image `}
                    className="product-image"
                  />
                </div>

                {/* Second content (name) */}
                <div className="second-content">
                  <span className='product-name'>{product.pname}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
