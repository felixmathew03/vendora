import React,{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/login/login';
import Email from './Components/email/Email';
import Signup from './Components/signup/Signup';
import Navbar from './Components/nav/Navbar';
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
import Company from './Components/company/Company';
import AddProduct from './Components/addProduct/AddProduct';
import Products from './Components/products/Products';
import './App.css'


const App = () => {
    const [id,setId]=useState("");
    const [role,setRole]=useState("");
    const [loggedIn,setLoggedIn]=useState(false); 
  return (
    <BrowserRouter>
    <Navbar id={id} role={role} loggedIn={loggedIn}/>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/' element={<Home  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/profile' element={<Profile  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/company' element={<Company  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/addproduct' element={<AddProduct  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/products/:category' element={<Products  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
