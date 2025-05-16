import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './Components/Loader/LoadingSpinner';
import Navbar from './Components/nav/Navbar';
import './App.css';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lazy load route components
const Login = lazy(() => import('./Components/login/Login'));
const Email = lazy(() => import('./Components/email/Email'));
const Signup = lazy(() => import('./Components/signup/Signup'));
const Home = lazy(() => delay(4500).then(() => import('./Components/home/Home')));
const Profile = lazy(() => import('./Components/profile/Profile'));
const Company = lazy(() => import('./Components/company/Company'));
const AddProduct = lazy(() => import('./Components/addProduct/AddProduct'));
const Products = lazy(() => import('./Components/products/Products'));
const EditProduct = lazy(() => import('./Components/editProduct/EditProduct'));
const Cart = lazy(() => import('./Components/cart/Cart'));
const DProd = lazy(() => import('./Components/Dprod/DProd'));
const Wishlist = lazy(() => import('./Components/Wishlist/Wishlist'));
const SCart = lazy(() => import('./Components/singlecart/SCart'));
const Orders = lazy(() => import('./Components/orders/Orders'));
const PurchaseCompleted = lazy(() => import('./Components/purchase/PurchaseCompleted'));
const EmailVerificationSuccess = lazy(() => import('./Components/verifysuccess/EmailVerificationSuccess'));
const PlacedOrders = lazy(() => import('./Components/PlacedOrders/PlacedOrders'));

const App = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {loggedIn && <Navbar username={username} role={role} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/email' element={<Email />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/profile' element={<Profile setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/company' element={<Company setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/addproduct' element={<AddProduct setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/products/:category' element={<Products setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/editproduct/:_id' element={<EditProduct setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/cart' element={<Cart setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/product/:id' element={<DProd setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/mywishlist' element={<Wishlist setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/scart/:pid' element={<SCart setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/myorders' element={<Orders setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/placedorders' element={<PlacedOrders setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn} />} />
          <Route path='/purchasecompleted' element={<PurchaseCompleted />} />
          <Route path='/emailsuccess' element={<EmailVerificationSuccess />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
