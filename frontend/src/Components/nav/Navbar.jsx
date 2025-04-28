// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { FaCartArrowDown, FaSearch, FaRegHeart   } from 'react-icons/fa'; // Import cart icon
import './Navbar.scss'; // Import SCSS for styling
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, role, loggedIn ,setLoggedIn}) => {
  const navigate=useNavigate();
  const [isSeller, setIsSeller] = useState(false);      // Track if the user is a seller
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // Track visibility of popover

  // Check if the user is a seller upon initial render
  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);
  const goToProfile=()=>{
    navigate("/profile");
  }
  const handleLogout = () => {
    localStorage.removeItem('Auth');
    setIsSeller(false);
    setIsPopoverVisible(false);
    setLoggedIn(!loggedIn);
    navigate('/');
  };
  
  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to={'/'}>
          <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
          <span className="website-name">Vendora</span>
        </Link>
      </div>

      {/* Right Side of Navbar */}
      <div className="navbar-center">
        {loggedIn && 
          <>
            {/*Home link */}
            <Link to={'/'}>
                <p  >
                  Home
                </p>
              </Link>
            {/* Profile Icon & Popover */}
            <div className="profile-containerr">
              <p 
                className="profile-icon" 
                onClick={togglePopover} 
                title={username}
              >My Account</p>
              {isPopoverVisible && (
                <div className="profile-popover">
                    <button className="popover-btn" onClick={goToProfile}>Profile</button>
                    <button className="popover-btn" onClick={handleLogout}>
                      Logout
                    </button>
                </div>
              )}
            </div>
            {/* Seller Dashboard Button */}
            {isSeller && (
              <Link to={'/company'}>
                <p className="seller-btn">
                  My Company
                </p>
              </Link>
            )}  
            <a href="#contactus"><p>Contact Us</p></a>
            <a href="#footer"><p>Footer</p></a>
          </>
      }
      </div>
      <div className="navbar-right">
        {/* Cart Icon */}
        <Link to={'/cart'}>
          <FaCartArrowDown className="icon" size={24} title='CART'/>
        </Link>

        {/* Search Icon */}
        <a href='#search'>
          <FaSearch className="icon" size={24} title='SEARCH'/>
        </a>

        {/* Wishlist Icon */}
        <Link to={'/mywishlist'}>
          <FaRegHeart  className="icon" size={24} title='WISHLIST'/>
        </Link>
      </div>
      
    </div>
  );
};

export default Navbar;
