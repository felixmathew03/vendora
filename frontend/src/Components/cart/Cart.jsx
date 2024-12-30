import React, { useState, useEffect } from 'react';
import './Cart.scss';

const Cart = ({setId,setRole,setLoggedIn}) => {
  const [cartItems, setCartItems] = useState([]); // Holds cart items
  const [quantities, setQuantities] = useState([]); // Holds quantities of items
  const [total, setTotal] = useState(0); // Holds the total price

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    const items = [];
    const qty = [];
    let initialTotal = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = JSON.parse(localStorage.getItem(key));
      items.push(item);
      qty.push(1); // Set default quantity to 1
      const itemCost = item.price - (item.price * item.discountPercentage) / 100;
      initialTotal += itemCost;
    }
    setCartItems(items);
    setQuantities(qty);
    setTotal(initialTotal);
  }, []);

  const handleRemove = (id) => {
    localStorage.removeItem(id);
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    updateTotal(newItems, quantities);
  };

  const handleQuantityChange = (index, type) => {
    const newQuantities = [...quantities];
    if (type === 'increase') {
      newQuantities[index] += 1;
    } else if (type === 'decrease' && newQuantities[index] > 1) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
    updateTotal(cartItems, newQuantities);
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
          <a href="../index.html">Go to products</a>
        </div>
      ) : (
        <div className="cart">
          <div id="carts" className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item">
                <div className="image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="content">
                  <h4>{item.title}</h4>
                  <h3>${item.price}</h3>
                  <p>{item.description}</p>
                  <h5>Quantity</h5>
                  <div className="quantity">
                    <span className="decrease" onClick={() => handleQuantityChange(index, 'decrease')}>
                      -
                    </span>
                    <span className="quantity-text">{quantities[index]}</span>
                    <span className="increase" onClick={() => handleQuantityChange(index, 'increase')}>
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
              <h2>Total</h2>
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
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{quantities[index]}</td>
                      <td>${(item.price - (item.price * item.discountPercentage) / 100) * quantities[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="payment-details">
              <div className="details">
                <p>Discount: 20%</p>
                <p>Delivery Charge: $5</p>
                <p>Total Amount: ${total.toFixed(2)}</p>
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
