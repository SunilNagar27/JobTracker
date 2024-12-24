import React from "react";
import error from '../assets/error.svg';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center mt-12 overflow-hidden">
      <div className="text-center">
        <img 
          className="w-full max-w-xl"  // Increased max width for a larger image
          src={error} 
          alt="Error" 
        />
        <Link 
          to="/" 
          className="text-blue-500 mt-4 inline-block"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
