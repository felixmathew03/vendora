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
      <div class="hader">
        <span>Join us today!</span>
        <p>Sing up now to become a member.</p>
      </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name" id="username" name="username" onChange={handleChange} />
          <input type="password" placeholder="Choose A Password" id="password" name="password" onChange={handleChange} />
          <input type="password" placeholder="Re-Enter Password" id="cpassword" name="cpassword" onChange={handleChange} />
            <select  id="role" name="role" onChange={handleChange}>
              <option value="">Select your role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
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
