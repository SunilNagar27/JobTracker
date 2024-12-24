import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 }); // Trigger when 10% of element is in view

  // Animation variants for the container and children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        staggerChildren: 0.3, // Adds delay between each feature animation
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="text-neutral-200 mt-10 py-16 px-6 sm:px-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-10">
        Why Choose JobTracker?
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        variants={containerVariants}
      >
        {/* Feature 1: Job Search */}
        <motion.div
          className="bg-secondary p-6 rounded-lg shadow-lg text-center"
          variants={childVariants}
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 16.5l3.5 3.5m-3.5-3.5a7.5 7.5 0 10-9.937-9.938A7.5 7.5 0 0016.5 16.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-teal-500 mb-4">Job Search</h3>
          <p className="text-neutral-300">
            Search and explore job openings tailored to your desired roles and industries.
          </p>
        </motion.div>

        {/* Feature 2: ATS Checker */}
        <motion.div
          className="bg-secondary p-6 rounded-lg shadow-lg text-center"
          variants={childVariants}
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-teal-500 mb-4">ATS Checker</h3>
          <p className="text-neutral-300">
            Optimize your resume by comparing it against job descriptions and identifying keyword matches.
          </p>
        </motion.div>

        {/* Feature 3: Application Tracking */}
        <motion.div
          className="bg-secondary p-6 rounded-lg shadow-lg text-center"
          variants={childVariants}
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-teal-500 mb-4">
            Application Tracking
          </h3>
          <p className="text-neutral-300">
            Monitor all your applied jobs and stay organized with a clean, user-friendly interface.
          </p>
        </motion.div>

        {/* Feature 4: Multi-Platform Integration */}
        <motion.div
          className="bg-secondary p-6 rounded-lg shadow-lg text-center"
          variants={childVariants}
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4h16M4 12h16m-8 8h8"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-teal-500 mb-4">
            Multi-Platform Integration
          </h3>
          <p className="text-neutral-300">
            Access jobs from platforms like Naukri, Indeed, Unstop, and more, all in one place.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Features;
