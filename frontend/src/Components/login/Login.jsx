import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setDetails] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(`${route()}signin`, loginDetails, { Headers: { "Content-Type": "application/json" } });
      if (status === 200) {
        localStorage.setItem("Auth", data.token);
        alert(data.msg)
        navigate('/');
      } else {
        alert(data.msg );
      }
    } catch (error) {
      alert("Wrong password");
    }
  };

  const handleChange = (e) => {
    setDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  return (
    <div class="login-container">
    <div class="login-box">
      <div class="title">
        Welcome back to <span class="highlight">Vendora</span>
      </div>
      <div class="tagline">Log in to your account</div>
  
      <form class="flex flex-col gap-3">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email"  onChange={handleChange}/>
        </div>
  
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password"  onChange={handleChange}/>
        </div>
  
        <button onClick={handleSubmit} class="login-btn" >Sign in</button>
      </form>
  
      <div class="signup-link">
        Don’t have an account yet? <Link to={"/email"}>Sign Up</Link>
      </div>
  
      <div className="social-login">
      <div className="social-icons">
        <div className="social-icon facebook">
          <FaFacebook size={24} color="#fff" /> {/* Facebook Icon */}
        </div>
        <div className="social-icon google">
          <FaGoogle size={24} color="#fff" /> {/* Google Icon */}
        </div>
      </div>
    </div>
    </div>
  </div>
  
  );
};

export default Login;
