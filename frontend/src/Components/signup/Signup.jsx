// src/components/Signup.js
import React, { useState } from 'react';
import './Signup.scss'; // Importing the SCSS file for styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('buyer'); // New state for role (Buyer/Seller)
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields and matching passwords
    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Proceed with the signup process (e.g., make API request)
      console.log('Signup successful', { role });
      setError('');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h2>Create an Account</h2>
        <p className="tagline">Fill in the details below to sign up.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={error ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={error ? 'error' : ''}
            />
          </div>

          {/* Role selection dropdown */}
          <div className="input-group">
            <label htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={error ? 'error' : ''}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="extra-links">
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
