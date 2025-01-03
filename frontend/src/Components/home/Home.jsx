import React,{useEffect,useState} from 'react';
import route from '../route';
import axios from 'axios';
import './Home.scss';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Home = ({setUsername,setRole,setLoggedIn}) => {
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
    }}
     catch (error) {
      console.log("error");
    }
  }
  return (
    <div className='home'>
       <div className="products-container">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            {/* Product Images */}
            
              <div className="product-images">
                <div className="image-gallery">
                  
                    <img
                      src={product.pimages[0]}
                      alt={product.pname}
                      className="product-image"
                    />
                </div>
              </div>
            
            <div className="bottom">
              <div className="left">
                {/* Category */}
                <div className="product-info">
                  <strong>Category:</strong> <span className='product-category'>{product.category.toUpperCase()}</span>
                </div>

                {/* Product Name */}
                <div className="product-info">
                  <strong>Product Name:</strong> <span className='product-name'>{product.pname}</span>
                </div>

                {/* Price */}
                <div className="product-info">
                  <strong>Price:</strong><span className='product-price'>${product.price.toFixed(2)}</span> 
                </div>
              </div>
              <Link to={`/product/${product._id}`}>
  <button className="view-product-button" title='View Product'>
    <FaEye className="view-icon" /> View Product
  </button>
</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
    </div>
  )
}

export default Home
