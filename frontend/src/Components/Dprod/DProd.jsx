import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './DProd.scss';
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import Footer from '../footer/Footer';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = localStorage.getItem('Auth');

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isOnCart, setIsOnCart] = useState(false);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState({
    product: {},
    sizeOrColor: "",
    index: 0,
    quantity: 0
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { status, data } = await axios.get(`${route()}product/${id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });

      if (status === 200) {
        setUsername(data?.username);
        setRole(data?.role);
        setLoggedIn(true);

        setProduct(data?.product || {});
        setIsOnCart(data?.isOnCart || false);
        setIsOnWishlist(data?.isOnWishlist || false);
        setRelatedProducts(data?.relatedProducts || []);
      }

    } catch (error) {
      console.log("Fetching from DummyJSON fallback");

      // try {
      //   // DummyJSON fallback
      //   const { data } = await axios.get(
      //     `https://dummyjson.com/products/${id || 1}`
      //   );

      //   const formattedProduct = {
      //     _id: data.id,
      //     pname: data.title,
      //     category: data.category,
      //     brand: data.brand,
      //     price: data.price,
      //     pimages: data.images,
      //     sizeColorQuantities: [
      //       { sizeOrColor: "S", quantity: 10 },
      //       { sizeOrColor: "M", quantity: 8 },
      //       { sizeOrColor: "L", quantity: 5 }
      //     ]
      //   };

      //   setProduct(formattedProduct);

      //   // Related products
      //   const related = await axios.get(
      //     `https://dummyjson.com/products/category/${data.category}`
      //   );

      //   setRelatedProducts(
      //     related.data.products.filter(p => p.id !== data.id)
      //   );

      // } catch (err) {
      //   console.log("DummyJSON also failed");
      // }

    } finally {
      setLoading(false);
    }
  };

  const handleSize = (size, ind) => {
    setSelectedSize(size);
    setCart({
      sizeOrColor: size,
      index: ind,
      product: product,
      quantity: 1
    });
  };

  const handleAddToCart = async () => {
    if (!cart.sizeOrColor) {
      alert("Please select size");
      return;
    }

    try {
      await axios.post(`${route()}addtocart`, cart, {
        headers: { Authorization: `Bearer ${value}` }
      });

      fetchProduct();

    } catch {
      alert("Error adding to cart");
    }
  };

  const handleBuynow = async () => {
    if (!cart.sizeOrColor) {
      alert("Please select size");
      return;
    }

    try {
      await axios.post(`${route()}addtocart`, cart, {
        headers: { Authorization: `Bearer ${value}` }
      });

      navigate(`/scart/${product?._id}`);

    } catch {
      alert("Could not add to cart");
    }
  };

  const goBack = () => {
    navigate(`/`);
  };

  if (loading) {
    return (
      <div className="product-page">
        <h2 style={{textAlign:"center"}}>Loading Product...</h2>
      </div>
    );
  }

  return (
    <div className="product-page">

      <div className="path">
        <p>Home</p>
        <p className='dull'>/</p>
        <p>{product?.category}</p>
        <p className='dull'>/</p>
        <p className='dull'>{product?.pname}</p>
      </div>

      <div className="backButton">
        <button onClick={goBack}>
          <span>{"<< "} </span> Back to Home
        </button>
      </div>

      <div className="product-container">

        <div className="product-images">

          {product?.pimages?.length > 0 ? (
            <>
              <div className="main-image">
                <img
                  id='img'
                  src={product.pimages[0]}
                  alt="product"
                  className="main-product-image"
                />
              </div>

              <div className="thumbnails">
                {product.pimages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="thumbnail"
                    className="thumbnail"
                    onMouseOver={() => {
                      document.getElementById("img").src = image
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No images available</p>
          )}

        </div>

        <div className="product-details">

          <h1>{product?.pname}</h1>

          <div className="product-category">
            {product?.category?.toUpperCase()}
          </div>

          <div className="product-brand">
            Brand: {product?.brand}
          </div>

          <div className="product-price">
            ${product?.price}
          </div>

          <div className="size-options">

            <strong>Select Size</strong>

            <div className="size-choices">

              {product?.sizeColorQuantities?.map((sq, ind) => (
                <button
                  key={ind}
                  className={`size-btn ${selectedSize === sq.sizeOrColor ? 'selected' : ''}`}
                  onClick={() => handleSize(sq.sizeOrColor, ind)}
                >
                  {sq.sizeOrColor}
                </button>
              ))}

            </div>
          </div>

          <div className="buy-options">

            <button className="buy-btn" onClick={handleBuynow}>
              <FaCreditCard /> Buy Now
            </button>

            <button className="cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>

          </div>

        </div>

      </div>

      <div className='related-products'>

        <h2>Related Products</h2>

        <div className="products-container">

          {relatedProducts?.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >

              <Link
                to={`/product/${product.id}`}
                className="product-card"
              >

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />

                <div className="bottom">

                  <span className="product-name">
                    {product.title}
                  </span>

                  <span className="product-price">
                    ${product.price}
                  </span>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default DProd;