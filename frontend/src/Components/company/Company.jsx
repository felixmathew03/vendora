import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaMapMarkerAlt, FaEdit, FaPlus } from 'react-icons/fa';
import route from "../route";
import './Company.scss';
import { Link } from 'react-router-dom';

const Company = ({setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem("Auth");
  // Managing state for company name, location, categories, and product form
  const [company, setCompany] = useState({
    name: "",
    location: ""
  });
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [sellerCat,setSellerCat]=useState([]);
  const [count,setCount]=useState([])
  
  useEffect(() => {
    getEssentials();
    getCount();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.company) setCompany(data.company);
        if (data.category && data.category.length > 0) setCategories(data.category[0].categories);
        if (data.productCategory) setSellerCat([...data.productCategory]);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(count);
  
  const handleEditClick = () => {
    setIsEditable(true);
  };
  const getCount = () => {
    let categoryCounts = categories.map((category) => {
      return sellerCat.filter((scategory) => scategory.category === category).length;
    });
    setCount(categoryCounts);
  };
  const handleSave = async () => {
    if (isEditable) {
      const { status, data } = await axios.post(`${route()}editcompany`, company, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("error");
      }
      setIsEditable(false);
    } else {
      setIsEditable(false);
    }
  };

  return (
    <div className="company-details">
      <div className="company-info">
        <div className="company-photo">
          <FaBuilding size={80} />
        </div>
        <div className="comp">
          <div className="company-name">
            <label>Company Name:</label>
            {isEditable ? (
              <input 
                type="text" 
                value={company.name} 
                name="name"
                onChange={handleChange} 
                className="editable-input"
              />
            ) : (
              <p>{company.name}</p>
            )}
          </div>
          <div className="company-location">
            <label>Location:</label>
            {isEditable ? (
              <input 
                type="text" 
                name="location"
                value={company.location} 
                onChange={handleChange} 
                className="editable-input"
              />
            ) : (
              <p>{company.location}</p>
            )}
          </div>
        </div>
        {!isEditable && <button className="edit-btn" onClick={handleEditClick}><FaEdit /> Edit</button>}
        {isEditable && <button className="save-btn" onClick={handleSave}>Save</button>}
      </div>

      <div className="company-categories">
        <div className="header">
        <h3>Categories</h3>
        {/* Add Product Button */}
        <Link to={'/addproduct'} className="add-product-link">
          <button className="add-product-btn">
            <FaPlus /> Product
          </button>
        </Link>
        </div>
        <ul>
          {categories.map((category, index) => (
                <Link to={`/products/${encodeURIComponent(category)}`}key={index}>
              <li >{category}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Company;
