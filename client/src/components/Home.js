import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update state to logged out
    navigate("/"); // Redirect to the home page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Job Tracker</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome! You're logged in.</p>
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
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setIsRegister(true)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: isRegister ? "#007bff" : "#ccc",
                color: isRegister ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register
            </button>
            <button
              onClick={() => setIsRegister(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: !isRegister ? "#007bff" : "#ccc",
                color: !isRegister ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
          {isRegister ? <Register /> : <Login />}
        </div>
      )}
    </div>
  );
};

export default Home;
