import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai'; 
import route from "../route";
import './Profile.scss';

const Profile = ({setId,setRole,setLoggedIn}) => {
  const value=localStorage.getItem('Auth');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [addresses, setAddresses] = useState([
    { houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" },
  ]);
  const [profile, setProfile] = useState({});
  useEffect(()=>{
    getEssentials();
  },[])
  const getEssentials=async()=>{
    try {
      
      const {status,data}=await axios.get(`${route()}profile`,{headers:{"Authorization":`Bearer ${value}`}})
      console.log("hai");
      if (status==200) {
        
        setId(data.id);
        setRole(data.role);
        setLoggedIn(true)
        console.log(data);
          setProfile({...data.profile});
      }
    }
     catch (error) {
      console.log("error");
    }
  }
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" },
    ]);
  };

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-pic">
          <FaUserCircle size={120} />
        </div>
        <div className="profile-info">
          <div class="input-container">
            <div class="input-wrapper">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                class="profile-input"
              />
              <label for="firstName" class="input-label">First Name</label>
            </div>

            <div class="input-wrapper">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                class="profile-input"
              />
              <label for="lastName" class="input-label">Last Name</label>
            </div>

            <div class="input-wrapper">
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                class="profile-input"
              />
              <label for="phone" class="input-label">Phone Number</label>
            </div>
          </div>

          <div className="gender">
              <label>
              Gender:
              </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={profile.gender === "Male"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={profile.gender === "Female"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Female
            </label>
          </div>
          <button onClick={() => setIsEditingProfile(!isEditingProfile)}>
            {isEditingProfile ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="address-section">
        <div className="title">
        <h3>Addresses</h3>
        <button onClick={handleAddAddress} class="add-button" title="Add New Address">
          <svg class="add-icon" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
            <path stroke-width="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
            <path stroke-width="1.5" d="M8 12H16"></path>
            <path stroke-width="1.5" d="M12 16V8"></path>
          </svg>
        </button>
        </div>
        {addresses.map((address, index) => (
          <div key={index} className="address-container">
            <input
              type="text"
              name="houseNumber"
              placeholder="House Number"
              value={address.houseNumber}
              onChange={(e) => handleAddressChange(index, e)}
              disabled={!isEditingAddresses}
            />
            <input
              type="text"
              name="houseName"
              placeholder="House Name"
              value={address.houseName}
              onChange={(e) => handleAddressChange(index, e)}
              disabled={!isEditingAddresses}
            />
            <input
              type="text"
              name="place"
              placeholder="Place"
              value={address.place}
              onChange={(e) => handleAddressChange(index, e)}
              disabled={!isEditingAddresses}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => handleAddressChange(index, e)}
              disabled={!isEditingAddresses}
            />
            <input
              type="text"
              name="postOffice"
              placeholder="Post Office"
              value={address.postOffice}
              onChange={(e) => handleAddressChange(index, e)}
              disabled={!isEditingAddresses}
            />
            <button onClick={() => setIsEditingAddresses(!isEditingAddresses)}>
              {isEditingAddresses ? "Save Address" : "Edit Address"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
