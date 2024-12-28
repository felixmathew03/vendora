import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';

const Home = ({setId,setRole,setLoggedIn}) => {
  const value=localStorage.getItem('Auth');
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const {status,data}=await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
      if (status==200) {
        setId(data.id);
        setRole(data.role);
        setLoggedIn(true)
      }
    }}
     catch (error) {
      console.log("error");
    }
  }
  return (
    <div className='home'>
      <h1>Home</h1>
    </div>
  )
}

export default Home
