// src/components/Navbar.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.scss'; // Import SCSS for styling

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // Track if the user is logged in
  const [isSeller, setIsSeller] = useState(true);      // Track if the user is a seller
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // Track visibility of popover

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSeller(false); // Clear seller status on logout
    setIsPopoverVisible(false); // Close the popover on logout
  };

  const handleSellerClick = () => {
    alert("Seller dashboard clicked!");
  };

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
        <span className="website-name">Vendora</span>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="profile-container">
              <FaUserCircle 
                className="profile-icon" 
                onClick={togglePopover} 
                size={30}  // You can adjust the size as needed
              />
              {isPopoverVisible && (
                <div className="profile-popover">
                  <button className="popover-btn" onClick={() => alert('Profile clicked!')}>
                    Profile
                  </button>
                  <button className="popover-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {isSeller && (
              <button className="seller-btn" onClick={handleSellerClick}>
                Seller Dashboard
              </button>
            )}
          </>
        ) : (
          <button className="login-btn" onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
