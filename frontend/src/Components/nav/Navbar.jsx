// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.scss'; // Import SCSS for styling
import { Link } from 'react-router-dom';

const Navbar = ({ id, role, loggedIn }) => {
  const [isSeller, setIsSeller] = useState(false);      // Track if the user is a seller
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // Track visibility of popover
  
  // Check if the user is a seller upon initial render
  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('Auth');
    setIsSeller(false);
    setIsPopoverVisible(false);
  };

  const handleSellerClick = () => {
    alert("Seller dashboard clicked!");
  };

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
        <span className="website-name">Vendora</span>
      </div>

      {/* Right Side of Navbar */}
      <div className="navbar-right">
        {loggedIn ? (
          <>
            {/* Profile Icon & Popover */}
            <div className="profile-containerr">
              <FaUserCircle 
                className="profile-icon" 
                onClick={togglePopover} 
                size={30} 
              />
              {isPopoverVisible && (
                <div className="profile-popover">
                    <Link to={`/profile/${id}`}>
                    <button className="popover-btn">Profile</button>
                    </Link>
                  <button className="popover-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Seller Dashboard Button */}
            {isSeller && (
              <button className="seller-btn" onClick={handleSellerClick}>
                Seller Dashboard
              </button>
            )}
          </>
        ) : (
          <Link to={'/login'}><button className="login-btn">Login</button></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
