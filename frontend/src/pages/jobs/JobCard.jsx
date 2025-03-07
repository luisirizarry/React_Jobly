import React, { useContext, useState, useEffect } from "react";
import "./JobCard.css";
import UserContext from "../authentication/UserContext";

/** JobCard Component
 *
 * - Displays job details (`title`, `companyName`, `salary`, `equity`)
 * - Allows users to apply for a job if they haven’t already
 * - Disables the apply button once applied
 */

function JobCard({ id, title, salary, equity, companyName }) {

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  // Sync local state with global context
  useEffect(() => {
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Handle applying for a job */
  async function handleApply() {
    if (applied) return;
    applyToJob(id);
    setApplied(true); // Instantly update UI
  }

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p><strong>Company:</strong> {companyName}</p>
      <p><strong>Salary:</strong> {salary ? `$${salary.toLocaleString()}` : "Not listed"}</p>
      <p><strong>Equity:</strong> {equity || "None"}</p>

      <button 
        className="apply-button" 
        onClick={handleApply} 
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
