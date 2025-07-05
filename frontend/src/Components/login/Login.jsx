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
  const [validateE,setValidateE]=useState(true)
  const [validateP,setValidateP]=useState(true)
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
    if (e.target.name=="password") {
      console.log(e.target.value);
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      if(regex.test(e.target.value)){
        
        setValidateP(!validateP)
        setDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
      }else{
        setValidateP(false)
      }
    }else{
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.in)$/;
      if(regex.test(e.target.value)){
        setValidateE(!validateE)
        setDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
      }else{
        setValidateE(false)
      }
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-box-right">
          <div className="title">
            Welcome to, <br /> <span className="highlight">Vendora</span>
          </div>
          <div className="tagline">
            Log in to your account
          </div>
          <div className="input-group">
            <input type="text" id="email" name="email" placeholder='example@email.com' className={validateE?"":"error"}  onChange={handleChange}/>
          </div>

          <div className="input-group">
            <input type="password" id="password" name="password" placeholder='password' className={validateP?"":"error"} onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="login-btn" >Sign in</button>
      
          <div className="signup-link">
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
        <div className="login-box-left">
          
        </div>
      </div>
    </div>
  );
};

export default Login;
