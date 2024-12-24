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
    <div className="px-6 py-8">
      <h2 className="text-teal-500 font-semibold text-4xl text-center mb-6">
        Manage Applications
      </h2>
      <form onSubmit={handleCreateJob} className="flex flex-wrap justify-end gap-4 mb-6">
        <input
          className="bg-gray-800 placeholder-gray-400 text-white border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          required
        />
        <input
          className="bg-gray-800 placeholder-gray-400 text-white border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          required
        />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-zinc-950 px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transform hover:scale-105 transition-transform"
          type="submit"
        >
          Add Job
        </button>
      </form>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-white text-center">{job.title}</td>
                <td className="px-6 py-4 text-white text-center">{job.company}</td>
                <td className="px-6 py-4 text-gray-400 text-center">
                  {new Date(job.createdAt).toLocaleDateString()}{" "}
                  {new Date(job.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <select
                    value={job.status}
                    onChange={(e) => handleUpdateJob(job._id, e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-105 transition-transform"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
