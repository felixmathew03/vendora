import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import './Profile.scss';

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [addresses, setAddresses] = useState([
    { houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" },
  ]);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    gender: "Male",
  });

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
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            placeholder="Phone Number"
          />
          <div className="gender">
            <label>
              Gender:
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
        <h3>Addresses</h3>
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
        <button onClick={handleAddAddress}>Add New Address</button>
      </div>
    </div>
  );
};

export default Profile;
