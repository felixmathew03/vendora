import React, { useEffect, useState } from 'react';
import { FaCartArrowDown, FaSearch, FaRegHeart, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, role, loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  const goToProfile = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIsPopoverVisible(false); // Close popover when menu toggled
  };

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
      {/* Logo */}
      <div className="navbar-logo">
        <Link to={'/'}>
          <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
          <span className="website-name">Vendora</span>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Navigation Links (Center) */}
      <div className={`navbar-center ${menuOpen ? 'active' : ''}`}>
        {loggedIn && (
          <>
            <Link to="/"><p>Home</p></Link>

            <div className="profile-containerr">
              <p className="profile-icon" onClick={togglePopover} title={username}>My Account</p>
              {isPopoverVisible && (
                <div className="profile-popover">
                  <button className="popover-btn" onClick={goToProfile}>Profile</button>
                  <button className="popover-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>

            {isSeller && (
              <Link to="/company"><p className="seller-btn">My Company</p></Link>
            )}

            <a href="#contactus"><p>Contact Us</p></a>
            <a href="#footer"><p>Footer</p></a>

            {/* Mobile Icons */}
            <div className="navbar-right-mobile">
              <Link to="/cart"><FaCartArrowDown className="icon" size={24} title="CART" /></Link>
              <a href="#search"><FaSearch className="icon" size={24} title="SEARCH" /></a>
              <Link to="/mywishlist"><FaRegHeart className="icon" size={24} title="WISHLIST" /></Link>
            </div>
          </>
        )}
      </div>

      {/* Desktop Only Icons */}
      {loggedIn && (
        <div className="navbar-right desktop-only">
          <Link to="/cart"><FaCartArrowDown className="icon" size={24} title="CART" /></Link>
          <a href="#search"><FaSearch className="icon" size={24} title="SEARCH" /></a>
          <Link to="/mywishlist"><FaRegHeart className="icon" size={24} title="WISHLIST" /></Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
