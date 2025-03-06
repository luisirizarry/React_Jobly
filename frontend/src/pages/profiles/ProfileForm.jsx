import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../authentication/UserContext";
import "./ProfileForm.css";

const ProfileForm = ({ updateProfile }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const INITIAL_STATE = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "", // Add password field
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Ensure password is only sent if entered
    const dataToUpdate = { ...formData };
    if (!dataToUpdate.password) delete dataToUpdate.password;

    try {
      const success = await updateProfile(currentUser.username, dataToUpdate);
      if (success) {
        setMessage("Profile updated successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Could not update profile. Please check your details.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Edit Profile</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="Update your first name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Update your last name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Update your email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">New Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password (optional)"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit" className="update-button">
        Update
      </button>
    </form>
  );
};

export default ProfileForm;
