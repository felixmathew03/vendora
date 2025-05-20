import React,{useEffect,useState} from 'react';
import route from '../route';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';
import './Home.scss';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';


const Home = ({setUsername,setRole,setLoggedIn}) => {
  const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
    const [products, setProducts] = useState([]);
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const res=await axios.get(`${route()}home`,{headers:{"Authorization":`Bearer ${value}`}})
      if (res.status==200) {
        setUsername(res.data.username)
        setRole(res.data.role);
        setLoggedIn(true);
        setProducts(res.data.products)
      }else if(res.status==403){
        
        setLoggedIn(!loggedIn);
      }
    }else{
      navigate('/login')
    }}
     catch (error) {
      navigate('/login');
    }
  }
  return (
    <div className='home' >
      <div className="header">
        <h1>VENDORA</h1>
        <div className="hfoot">
          <p>Get Start <br/>Your Favourite Shopping</p>
          <button > <a href="#sidebar-container">SHOP NOW</a></button>
        </div>
      </div>
    <Sidebar setProducts={setProducts}/>
       <div className="products-container">
  {products && products.length > 0 ? (
    products.map((product, index) => (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        key={product._id}
      >
        <Link
          to={`/product/${product._id}`}
          className="product-card"
        >
          <div className="product-images">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
              src={product.pimages[0]}
              alt={product.pname}
              className="product-image"
            />
          </div>
          <div className="bottom">
            <div className="product-info">
              <span className="product-name">{product.pname}</span>
            </div>
            <div className="product-info">
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    ))
  ) : (
    <p>No products available</p>
  )}
</div>

    <div className="recommends">
      <div className="left">
        <div className="headings">
          <h1>Your Life.</h1>
          <h1>Your Look.</h1>
          <h1>Your Store.</h1>
        </div>
      </div>
    </div>
    <div className="teamservices">
      <div className="service right">
        <div className="tsimage">
          <img src="/images/Icon1.png" alt="" />
        </div>
        <div className="tscontent">
          <p className='tsp1'>FREE SHIPPING</p>
          <p className='tsp2'>On all orders over $500.00</p>
        </div>
      </div>
      <div className="service right">
        <div className="tsimage">
          <img src="/images/Icon2.png" alt="" />
        </div>
        <div className="tscontent">
          <p className='tsp1'>100% PAYMENT SECURE</p>
          <p className='tsp2'>WE ensure secure payment</p>
        </div>
      </div>
      <div className="service right">
        <div className="tsimage">
          <img src="/images/Icon3.png" alt="" />
        </div>
        <div className="tscontent">
          <p className='tsp1'>30 DAYS RETURN GUARANTEE</p>
          <p className='tsp2'>30-days free return policy</p>
        </div>
      </div>
      <div className="service ">
        <div className="tsimage">
          <img src="/images/Icon4.png" alt="" />
        </div>
        <div className="tscontent">
          <p className='tsp1'>24/7 SUPPORT</p>
          <p className='tsp2'>Dedicated support</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home
