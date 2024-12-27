// src/components/VerifyEmail.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
    const res=await axios.post(`${route()}verifyemail`,{email},{Headers:{"Content-Type":"application/json"}});
    console.log(res);
    
    if(res.status===201){
      localStorage.setItem('email',email);
      alert(res.data.msg);
      navigate('/login')
    }else if(res.status===403){
      alert(res.data.msg)
    }
    else{
      alert(res.data.msg)
    }
  };

  return (
    <div className="email-container" >
      <div className="email-box">
        <div className="logo">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h2>Email Addres</h2>
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

          <button type="submit" className="btn">Verify</button>
        </form>

        <div className="extra-links">
          <p className="back-to-login">
            <a href="#">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Email;
