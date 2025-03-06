import React, { useContext } from "react";
import UserContext from "../authentication/UserContext"; 
import "./Homepage.css"; 

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="homepage-container">
      {currentUser ? (
        <h1>Welcome back, {currentUser.firstName} {currentUser.lastName}!</h1>
      ) : (
        <h1>Welcome to Jobly</h1>
      )}
    </div>
  );
};

export default Homepage;
