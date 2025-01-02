// src/Login.js

import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import route from '../route';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import './login.scss';

const Login = () => {
  const navigate=useNavigate();
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const {status,data}=await axios.post(`${route()}signin`,loginDetails,{Headers:{"Content-Type":"application/json"}});
    if(status===200){
      localStorage.setItem("Auth",data.token)
      alert(data.msg)
      navigate('/')
    }
    else{
      alert(data.msg)
    }
    } catch (error) {
      alert("error occured")
    }
  };
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h2>Welcome Back!</h2>
        <p className="tagline">Please sign in to continue.</p>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name='email'
            type="email"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name='password'
            onChange={handleChange}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        <div className="extra-links">
          
          <div className="signup-link">
            Don't have an account? <Link to={"/email"}>Sign Up</Link>
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
