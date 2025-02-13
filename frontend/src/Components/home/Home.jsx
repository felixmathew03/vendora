import React,{useEffect,useState} from 'react';
import route from '../route';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import './Home.scss';
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
      console.log("error");
    }
  }
  return (
    <div className='home'>
    <Sidebar setProducts={setProducts}/>
       <div className="products-container">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="product-card">
            {/* Product Images */}
            
              <div className="product-images">
                    <img
                      src={product.pimages[0]}
                      alt={product.pname}
                      className="product-image"
                    />
              </div>
            
            <div className="bottom">
                {/* Product Name */}
                <div className="product-info">
                   <span className='product-name'>{product.pname}</span>
                </div>

                {/* Price */}
                <div className="product-info">
                  <span className='product-price'>${product.price.toFixed(2)}</span> 
                </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
    </div>
  )
}

export default Home
