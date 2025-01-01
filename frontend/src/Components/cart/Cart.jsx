import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import route from '../route';
import axios from 'axios';
import './Cart.scss';

const Cart = ({setUsername,setRole,setLoggedIn}) => {
  const value=localStorage.getItem('Auth');
  const [cartItems, setCartItems] = useState([]); // Holds cart items
  const [quantities, setQuantities] = useState([]); // Holds quantities of items
  const [priceTotal, setPriceTotal] = useState(0); // Holds the total price

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    getCart();
  }, []);
  const getCart=async()=>{
    const {status,data}=await axios.get(`${route()}getcart`,{headers:{"Authorization":`Bearer ${value}`}})
    if(status==200){
      setUsername(data.username)
      setRole(data.role);
      setLoggedIn(true);
      setCartItems(data.cart);
      setQuantities(data.cart.map(item => item.quantity));
      setPriceTotal(data.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
    }
  }
  const handleRemove = (id) => {
    localStorage.removeItem(id);
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    updateTotal(newItems, quantities);
  };

  const handleQuantityChange = async(index,id, type) => {
    const {status,data}=await axios.post(`${route()}editquantity`,{id,quantity:quantities[index],type},{headers:{"Authorization":`Bearer ${value}`}});
    if(status==201){
      getCart();
    }
  };

  const updateTotal = (items, qty) => {
    let totalAmount = 0;
    items.forEach((item, index) => {
      const cost = item.price - (item.price * item.discountPercentage) / 100;
      totalAmount += cost * qty[index];
    });
    setTotal(totalAmount + 5); // Add delivery charge
  };

  const handleClearCart = () => {
    localStorage.clear();
    setCartItems([]);
    setQuantities([]);
    setTotal(0);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Cart empty..</h2>
          <Link to={'/home'}>Go to products</Link>
        </div>
      ) : (
        <div className="cart">
          <div id="carts" className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="image">
                  <Link to={`/product/${item.product._id}`}>
                    <img src={item.product.pimages[0]} alt={item.product.pname} title='View product'/>
                  </Link>
                </div>
                <div className="content">
                  <h4>{item.product.pname}</h4>
                  <h3>${item.product.price}</h3>
                  <h5>Quantity</h5>
                  <div className="quantity">
                    <span className="decrease" onClick={() => handleQuantityChange(index,item._id,'decrease')}>
                      -
                    </span>
                    <span className="quantity-text">{quantities[index]}</span>
                    <span className="increase" onClick={() => handleQuantityChange(index,item._id, 'increase')}>
                      +
                    </span>
                  </div>
                </div>
                <div className="remove">
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-details">
              <h2>Payment Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.pname}</td>
                      <td>{quantities[index]}</td>
                      <td>${item.product.price  * quantities[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="payment-details">
              <div className="details">
              <p className="discount">Discount: 20%</p>
              <p>Delivery Charge: $5</p>
              <p className="total-price">Total Price: ${priceTotal.toFixed(2)}</p>
              <p className="total-amount">Total Amount: ${((priceTotal - (priceTotal * 0.2)) + 5).toFixed(2)}</p>
              </div>
              <div className="payment-button">
                <button onClick={handleClearCart}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
