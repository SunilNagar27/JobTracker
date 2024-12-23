import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animation triggers once when the element enters the viewport

  // Animation variants for the container and individual steps
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        staggerChildren: 0.3, // Adds delay between each step animation
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className='flex flex-col items-center justify-center w-full min-h-[50vh] mt-40 gap-4'
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'} // Trigger animation when in view
    >
      <p className='text-3xl sm:text-4xl font-semibold text-center text-teal-500 '>
        How JobTracker Works
      </p>

      {/* Step 1: Sign Up */}
      <motion.div
        className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'
        variants={stepVariants}
      >
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>
            Step 1: Sign Up
          </p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Sign up and create your profile to get started with JobTracker. Fill in your details and upload your resume to begin your journey.
          </p>
        </div>
      </motion.div>

      {/* Step 2: Search and Analyze */}
      <motion.div
        className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'
        variants={stepVariants}
      >
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>
            Step 2: Search and Analyze
          </p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Search for job openings or paste job descriptions to analyze their ATS compatibility. Get insights on your resume and improve its chances.
          </p>
        </div>
      </motion.div>

      {/* Step 3: Save and Track Applications */}
      <motion.div
        className='flex flex-col sm:flex-row items-start sm:items-center border-black shadow-teal-700 shadow-sm w-full sm:w-7/12 rounded-xl bg-secondary mt-6 p-3'
        variants={stepVariants}
      >
        <div className='ml-4'>
          <p className='font-semibold text-neutral-200 text-xl sm:text-2xl'>
            Step 3: Save and Track Applications
          </p>
          <p className='text-neutral-300 text-sm sm:text-md mt-2'>
            Save your applied jobs and track their status directly from your dashboard to stay organized and on top of your applications.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;
