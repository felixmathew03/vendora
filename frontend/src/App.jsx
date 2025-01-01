import React,{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/login/Login';
import Email from './Components/email/Email';
import Signup from './Components/signup/Signup';
import Navbar from './Components/nav/Navbar';
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
import Company from './Components/company/Company';
import AddProduct from './Components/addProduct/AddProduct';
import Products from './Components/products/Products';
import EditProduct from './Components/editProduct/EditProduct';
import Cart from './Components/cart/Cart';
import DProd from './Components/Dprod/DProd';
import Wishlist from './Components/Wishlist/Wishlist';
import './App.css'


const App = () => {
    const [username,setUsername]=useState("");
    const [role,setRole]=useState("");
    const [loggedIn,setLoggedIn]=useState(false); 
  return (
    <BrowserRouter>
    <Navbar username={username} role={role} loggedIn={loggedIn}/>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/' element={<Home  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/profile' element={<Profile  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/company' element={<Company  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/addproduct' element={<AddProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/products/:category' element={<Products  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/editproduct/:_id' element={<EditProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/cart' element={<Cart  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/product/:id' element={<DProd  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/wishlist' element={<Wishlist  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
