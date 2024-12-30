import React,{useEffect} from 'react';
import route from '../route';
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
      const res=await axios.get(`http://localhost:3000/api/home`,{headers:{"Authorization":`Bearer ${value}`}})
      if (res.status==200) {
        setId(res.data.id)
        setRole(res.data.role);
        setLoggedIn(true)
      }else if(res.status==403){
        localStorage.removeItem("Auth")
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
