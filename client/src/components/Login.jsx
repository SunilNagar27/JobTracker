import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      navigate("/jobs");
    } catch (err) {
      alert(err.response.data.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="flex flex-col items-center mt-3">
      <input
      className="border mt-2 px-4 py-1 border-zinc-950"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
      className="border mt-2 px-4 py-1 border-zinc-950"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button className="text-neutral-300 bg-zinc-950 mt-5 px-7 py-1 rounded-2xl" type="submit">Login</button>
      </div>
      
    </form>
  );
};

export default Login;
