import React, { useEffect, useState } from "react";
import { fetchJobs, createJob, updateJobStatus, deleteJob } from "../api";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", company: "" });
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

  const loadJobs = async () => {
    try {
      const { data } = await fetchJobs();
      setJobs(data);
    } catch (err) {
      alert("Failed to fetch jobs.");
    }
  };

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

  const handleUpdateJob = async (id, status) => {
    try {
      await updateJobStatus(id, { status });
      loadJobs();
    } catch (err) {
      alert("Failed to update job status.");
    }
  };

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
      
      <h2 className="text-zinc-950 font-semibold text-4xl text-center mt-4 p-3">Manage Applications</h2>
      <form onSubmit={handleCreateJob}>
        <div className="flex mt-4 flex-row gap-4 justify-end mr-4">
          <input
            className="border border-slate-600 p-1"
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <input
            className="border border-slate-600 p-1"
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <button className="bg-blue-500 px-5 hover:bg-blue-600 hover:scale-105" type="submit">Add Job</button>
        </div>
      </form>
      <table className="table-auto border-collapse border border-gray-400 w-full mt-5">
        <thead>
          <tr className="bg-zinc-950 text-white">
            <th className="border border-gray-400 p-2">Job Title</th>
            <th className="border border-gray-400 p-2">Company</th>
            <th className="border border-gray-400 p-2">Date</th>
            <th className="border border-gray-400 p-2">Status</th>
            <th className="border border-gray-400 p-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="text-center">
              <td className="border border-gray-400 p-2">{job.title}</td>
              <td className="border border-gray-400 p-2">{job.company}</td>
              <td className="border border-gray-400 p-2">
                {new Date(job.createdAt).toLocaleDateString()}{" "}
                {new Date(job.createdAt).toLocaleTimeString()}
              </td>
              <td className="border border-gray-400 p-2">
                <select
                  value={job.status}
                  onChange={(e) => handleUpdateJob(job._id, e.target.value)}
                  className="border border-gray-400 p-1 bg-neutral-100"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offered">Offered</option>
                  <option  value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="border border-gray-400 p-2">
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
