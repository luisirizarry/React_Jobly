import React from "react";
import "./ErrorMessage.css"; // Import styles

const ErrorMessage = ({ message }) => {
  if (!message) return null; // Don't render anything if there's no message

  return <p className="error-message">{message}</p>;
};

export default ErrorMessage;
