import React from 'react';

const HowItWorks = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-[50vh] gap-4'>
      <p className='font-semibold text-neutral-200 text-2xl sm:text-3xl p-4 mt-8'>How JobTracker Works</p>
      
      {/* Step 1: Sign Up */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'>
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>Step 1: Sign Up</p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Sign up and create your profile to get started with JobTracker. Fill in your details and upload your resume to begin your journey.
          </p>
        </div>
      </div>

      {/* Step 2: Search and Analyze */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'>
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>Step 2: Search and Analyze</p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Search for job openings or paste job descriptions to analyze their ATS compatibility. Get insights on your resume and improve its chances.
          </p>
        </div>
      </div>

      {/* Step 3: Save and Track Applications */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'>
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>Step 3: Save and Track Applications</p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Save your applied jobs and track their status directly from your dashboard to stay organized and on top of your applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
