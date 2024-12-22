import React from "react";

const Footer = () => {
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
          
          <a href="/about-us" className="text-neutral-400 hover:text-teal-500">
            About us
          </a>
          <a href="/contact-us" className="text-neutral-400 hover:text-teal-500">
            Contact Us
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
