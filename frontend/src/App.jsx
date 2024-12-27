import React,{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/login/login';
import Email from './Components/email/Email';
import Signup from './Components/signup/Signup';
import Navbar from './Components/nav/Navbar';
import Home from './Components/home/Home';
import './App.css'


const App = () => {
    const [user,setUser]=useState("");
  // const [profile,setProfile]=useState("")
  return (
    <BrowserRouter>
      {user&&<Navbar  />}
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/register' Component={Signup}/>
        {/* <Route path='/profile' element={<Profile  setUser={setUser} setProfile={setProfile}/>}/> */}
        {/* <Route path='/addprodetails' element={<AddPro  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addpost' element={<Post  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/postdetails/:id' element={<PostD  setUser={setUser} setProfile={setProfile}/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
