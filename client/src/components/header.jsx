import React from 'react';
import { useNavigate } from 'react-router-dom';
import develop from '../assets/develop.svg';

const Header = () => {
  const navigate = useNavigate();

  // Function to scroll a little bit with smoothness
  const scrollToFeatures = () => {
    window.scrollBy({
      top: 690, 
      behavior: 'smooth',
    });
  };

  return (
    <div className="text-neutral-200 flex flex-col md:flex-row items-center justify-between px-8 py-16 sm:px-12 md:py-20">
      <div className="md:w-2/5">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Your Ultimate <span className="text-teal-500">Job</span> Application Assistant
        </p>

        <p className="text-neutral-300 text-lg mt-8 sm:text-xl mb-8">
          Track your applications, find job opportunities, and boost your hiring potential with ATS analysis – all in one place.
        </p>

        <div className="flex flex-row gap-4">
          <button onClick={() => navigate("/register")} className="bg-teal-500 hover:bg-teal-600 text-zinc-950 font-semibold px-6 py-3 rounded-md text-lg hover:scale-105">
            Get Started
          </button>
          <button onClick={scrollToFeatures} className="bg-transparent border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-zinc-950 font-semibold px-6 py-3 rounded-md text-lg hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      <div className="md:w-3/5 flex justify-center mt-10 md:mt-0">
        <div className="rounded-md flex items-center justify-center">
          <img src={develop} alt="Job Illustration" className="w-full max-w-[600px] h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
