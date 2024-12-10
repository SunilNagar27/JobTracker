import React, { useEffect, useState } from "react";
import { fetchJobs, createJob, updateJobStatus, deleteJob } from "../api";
import { useNavigate } from "react-router-dom";


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", company: "" });
  const [isRegister, setIsRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch jobs from the server
  const loadJobs = async () => {
    try {
      const { data } = await fetchJobs();
      setJobs(data);
    } catch (err) {
      alert("Failed to fetch jobs.");
    }
  };

  // Create a new job
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await createJob(newJob);
      setNewJob({ title: "", company: "" });
      loadJobs();
    } catch (err) {
      alert("Failed to create job.");
    }
  };

  // Update the status of a job
  const handleUpdateJob = async (id, status) => {
    try {
      await updateJobStatus(id, { status });
      loadJobs();
    } catch (err) {
      alert("Failed to update job status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update state to logged out
    navigate("/"); // Redirect to the home page
  };

  // Delete a job
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      loadJobs();
    } catch (err) {
      alert("Failed to delete job.");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
           <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
      <h2>Job Tracker</h2>
      <form onSubmit={handleCreateJob}>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          required
        />
        <button type="submit">Add Job</button>
      </form>

      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>
              Date Added: {new Date(job.createdAt).toLocaleDateString()}{" "}
              {new Date(job.createdAt).toLocaleTimeString()}
            </p>
            <p>
              Status:{" "}
              <select
                value={job.status}
                onChange={(e) => handleUpdateJob(job._id, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </p>
            <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
