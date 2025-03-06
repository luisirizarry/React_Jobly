import React from "react";
import './JobCard.css'

const JobCard = ({ title, handle, salary, equity }) => {
  return (
    <div className="job-card">
      <h3>{title}</h3>
      {handle && <p><strong>Company:</strong> {handle}</p>}
      <p><strong>Salary:</strong> {salary ? `$${salary.toLocaleString()}` : "Not provided"}</p>
      <p><strong>Equity:</strong> {equity && equity !== "0" ? equity : "None"}</p>
    </div>
  );
};

export default JobCard;
