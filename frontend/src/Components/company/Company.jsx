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
    location: "",
    gstin:"",
    contact:""
  });
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
    const [phoneError, setPhoneError] = useState("");
  
  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.company) setCompany(data.company);
        if (data.categories && data.categories.length > 0) setCategories(data.categories);
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
    if (name === "phone") {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(value)) {
        setPhoneError("Phone number must be 10 digits.");
      } else {
        setPhoneError("");
      }
    }
  };
  const handleEditClick = () => {
    setIsEditable(true);
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
    {/* Company Name */}
    <div className="company-name">
      <label>Company Name:</label>
      
        <input 
          type="text" 
          value={company.name} 
          name="name"
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>

    {/* Company Location */}
    <div className="company-location">
      <label>Location:</label>
        <input 
          type="text" 
          name="location"
          value={company.location} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>

    {/* Key Executives */}
    <div className="company-gstin">
      <label>GSTIN:</label>
        <input 
          type="text" 
          name="gstin"
          value={company.gstin} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>
    
    {/* Contact Information */}
    <div className="company-contact">
      <label>Contact:</label>
        <input 
          type="text" 
          name="contact"
          value={company.contact} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
        {phoneError && <p className="perror">{phoneError}</p>}
    </div>

  </div>

  {/* Edit and Save Buttons */}
  {!isEditable && <button className="edit-btn" onClick={handleEditClick}><FaEdit /> Edit</button>}
  {isEditable && <button className="save-btn" onClick={handleSave}>Save</button>}
</div>


      <div className="company-categories">
        <div className="header">
        <h3>Categories</h3>
        {/* Add Product Button */}
        {company.name&&<Link to={'/addproduct'} className="add-product-link">
          <button className="add-product-btn" >
            <FaPlus /> Product
          </button>
        </Link>}
        <Link to={'/placedorders'} className="add-product-link">
          <button className="add-product-btn" >
            Placed orders
          </button>
        </Link>
        </div>
        <ul>
          {categories.map((category, index) => (
              <Link to={`/products/${encodeURIComponent(category.category)}`}key={index}>
                <li >{category.category}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Company;
