import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import "./SignupForm.css";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
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

    try {
      const success = await signup(
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.email
      );

      if (success) {
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
        setFormData(INITIAL_STATE);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <ErrorMessage message={error} />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="Enter your first name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Enter your last name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit" className="signup-button">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
