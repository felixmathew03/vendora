// src/components/Signup.js
import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import './Signup.scss'; // Importing the SCSS file for styling

const Signup = () => {
  const navigate=useNavigate();
  const email=localStorage.getItem('email');
    const [user,setUser]=useState({
      email:email,
      username:"",
      password:"",
      cpassword:"",
      role:"",
    })
  const handleChange=(e)=>{
    setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data,status}=await axios.post(`${route()}signup`,user,{headers:{"Content-Type":"application/json"}})
    
    if(status===201){
      localStorage.removeItem('email');
      alert(data.msg);
      navigate('/login')
    }
    else{
      alert(data.msg)
    }
    } catch (error) {
      alert("error occured")
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
              onChange={handleChange}
              
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              
            />
          </div>

          <div className="input-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              
            />
          </div>

          {/* Role selection dropdown */}
          <div className="input-group">
            <label htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              
            >
              <option value="">Select one option</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>


          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="extra-links">
          <p className="login-link">
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
