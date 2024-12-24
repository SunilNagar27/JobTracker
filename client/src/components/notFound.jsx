import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="text-neutral-100">404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="text-neutral-100"to="/" style={{ color: "#007bff", textDecoration: "none" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
