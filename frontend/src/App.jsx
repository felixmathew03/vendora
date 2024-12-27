import React,{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/login/login';
import Email from './Components/email/Email';
import Signup from './Components/signup/Signup';
import Navbar from './Components/nav/Navbar';
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
import './App.css'


const App = () => {
    const [id,setId]=useState("");
    const [role,setRole]=useState("");
    const [loggedIn,setLoggedIn]=useState(false);
  return (
    <BrowserRouter>
      {id&&<Navbar id={id} role={role} loggedIn={loggedIn}/>}
      <Routes>
        <Route path='/' element={<Home  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/profile/:id' Component={Profile}/>
        {/* <Route path='/addprodetails' element={<AddPro  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addpost' element={<Post  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/postdetails/:id' element={<PostD  setUser={setUser} setProfile={setProfile}/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
