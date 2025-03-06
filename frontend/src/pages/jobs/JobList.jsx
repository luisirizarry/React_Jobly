import React, { useEffect, useState } from "react";
import JoblyApi from "../../api/api";
import JobCard from "./JobCard";
import SearchBox from "../../components/SearchBox";
import './JobList.css'

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const search = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchJobs(); // Reset to original job list when empty
      return;
    }

    try {
      const jobs = await JoblyApi.getJobs({ title: searchTerm });
      setJobs(jobs);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="job-list">
      <SearchBox searchFunction={search} placeholder="Search Jobs..." />
      {jobs.length ? (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            handle={job.companyHandle}
            salary={job.salary}
            equity={job.equity}
          />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
