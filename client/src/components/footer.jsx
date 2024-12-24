import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-neutral-950 text-neutral-200 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: JobTracker and Copyright */}
        <div className="flex flex-col md:flex-row items-center ml-4 gap-4 mb-4 md:mb-0">
          <p className="text-lg font-semibold">JobTracker</p>
          <div className="border-l border-neutral-400 h-6 md:mx-4"></div>{" "}
          {/* Vertical separator */}
          <p className="text-sm">
            © {new Date().getFullYear()} JobTracker. All rights reserved.
          </p>
        </div>

        {/* Right Section: Links */}
        <div className="flex flex-col md:flex-row items-center mr-5 gap-4 md:gap-6">
          
          <p onClick={()=>navigate("/about-us")} className="text-neutral-400 cursor-pointer hover:text-teal-500">
            About Us
          </p>
          <p onClick={()=>navigate("/contact-us")} className="text-neutral-400 cursor-pointer hover:text-teal-500">
            Contact Us
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
