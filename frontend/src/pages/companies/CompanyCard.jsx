import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  const defaultLogo = "/logos/defaultlogo.png"; 

  return (
    <div className="company-card">
      <img 
        src={logoUrl ? logoUrl : defaultLogo} 
        alt={`${name} logo`} 
        className="company-logo" 
      />
      <h2>
        <Link to={`/companies/${handle}`}>{name}</Link>
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default CompanyCard;
