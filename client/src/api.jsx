import axios from "axios";

// Set VITE_API_URL at build time (see .env.example).
// - unset      -> falls back to the old Render URL
// - ""  (empty) -> same origin, i.e. calls /api on the host serving the page (used behind the ALB)
// - "http://localhost:5000" -> local docker compose
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://jobtracker-1-e4t8.onrender.com";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const fetchJobs = () => API.get("/jobs");
export const createJob = (data) => API.post("/jobs", data);
export const updateJobStatus = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
