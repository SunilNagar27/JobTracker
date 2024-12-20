import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message || "Something went wrong.");
    }
  };

  return (
    
    <form 
    className=""
    onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="flex flex-col items-center mt-3">
      <input
      className="border mt-2 px-4 py-1 border-zinc-950"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
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
      <button className="text-neutral-300 bg-zinc-950 mt-5 px-7 py-1 rounded-2xl" type="submit">Register</button>
      </div>
      
    </form>
  );
};

export default Register;
