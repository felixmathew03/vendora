// src/components/VerifyEmail.js
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import './Email.scss'; // Importing the SCSS file for styling

const Email = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState(''); 

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault(); 
    const {status,data}=await axios.post(`${route()}verifyemail`,{email},{Headers:{"Content-Type":"application/json"}});
    
    if(status===201){
      localStorage.setItem('email',email);
      alert(data.msg);
      navigate('/login')
    }else if(status===403){
      alert(data.msg)
    }
    else{
      alert(data.msg)
    }
  };

  return (
    <div className="email-container" >
      <div className="email-box">
        <div className="logo">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h2>Email Confirmation</h2>
        <p className="tagline">Please enter your email address.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn">Send</button>
        </form>

        <div className="extra-links">
          <p className="back-to-login">
            <Link to={'/login'}>Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Email;
