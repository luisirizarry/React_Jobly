import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import "./LoginForm.css";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = { username: "", password: "" };
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
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate("/"); 
      } else {
        setError("Invalid username or password.");
        setFormData(INITIAL_STATE);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
