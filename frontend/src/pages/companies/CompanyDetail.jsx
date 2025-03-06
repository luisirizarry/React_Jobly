import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/api";
import JobCard from "../jobs/JobCard";
import './CompanyDetail.css'

const CompanyDetails = () => {
  const { handle } = useParams(); 
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    }
    
    if (handle) { 
      fetchCompany();
    }
  }, [handle]);

  if (!company) return <h2>Loading...</h2>;

  return (
    <div className="company-detail">
      <div className="company-detail-top">
        <h2>{company.name}</h2>
        <p>{company.description}</p>
        <h3>Jobs at {company.name}</h3>  
      </div>
      {company.jobs.length > 0 ? (
        company.jobs.map((job) => (
          <JobCard 
            key={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default CompanyDetails;
