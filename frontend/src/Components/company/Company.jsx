import React, { useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import './Company.scss';

const Company = () => {
  // Managing state for company name and location
  const [companyName, setCompanyName] = useState('Tech Corp');
  const [location, setLocation] = useState('San Francisco, CA');
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  return (
    <div className="company-details">
      <div className="company-info">
        <div className="company-photo">
          <FaBuilding size={80} />
        </div>
        <div className="company-name">
          <label>Company Name:</label>
          {isEditable ? (
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              className="editable-input"
            />
          ) : (
            <p>{companyName}</p>
          )}
        </div>
        <div className="company-location">
          <label>Location:</label>
          {isEditable ? (
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className="editable-input"
            />
          ) : (
            <p>{location}</p>
          )}
        </div>
        {!isEditable && <button className="edit-btn" onClick={handleEditClick}><FaEdit /> Edit</button>}
        {isEditable && <button className="save-btn" onClick={handleSave}>Save</button>}
      </div>
      <div className="company-categories">
        <h3>Categories</h3>
        <ul>
          <li>Technology</li>
          <li>Software Development</li>
          <li>Artificial Intelligence</li>
          <li>Cloud Computing</li>
          <li>Innovation</li>
        </ul>
      </div>
    </div>
  );
};

export default Company;
