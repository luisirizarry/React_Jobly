import React, { useEffect, useState } from "react";
import JoblyApi from "../../api/api";
import CompanyCard from "./CompanyCard";
import SearchBox from "../../components/SearchBox";
import "./CompanyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const search = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchCompanies(); 
      return;
    }

    try {
      const companies = await JoblyApi.getCompanies({ name: searchTerm });
      setCompanies(companies);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="CompanyList">
      <SearchBox searchFunction={search} placeholder="Search Companies..." />
      {companies.length ? (
        companies.map((company) => (
          <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
          />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;
