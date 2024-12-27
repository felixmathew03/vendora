// src/Login.js

import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('Please fill in both fields');
    } else {
      // Add your login functionality here
      console.log('Logging in...');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h2>Welcome Back!</h2>
        <p className="tagline">Please sign in to continue.</p>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="extra-links">
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="signup-link">
            Don't have an account? <a href="#">Sign Up</a>
          </div>
        </div>

        {/* Social Media Login */}
        <div className="social-login">
          <p>Or sign in with</p>
          <div className="social-icons">
            <div className="social-icon facebook">
              <FaFacebook size={24} color="#fff" />
            </div>
            <div className="social-icon google">
              <FaGoogle size={24} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
