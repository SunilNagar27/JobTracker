import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2, // Slower animation
        ease: 'easeInOut', // Smooth easing
        delayChildren: 0.5,
        staggerChildren: 0.4, // Slower staggering
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, // Slow child animation
        ease: 'easeInOut', // Smooth easing for each child
      },
    },
  };

  return (
    <motion.div
      className="text-neutral-200 flex flex-col md:flex-row items-center justify-between px-8 py-16 sm:px-12 md:py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="md:w-2/5" variants={childVariants}>
        <p className="text-3xl text-neutral-200 sm:text-4xl md:text-5xl font-bold mb-6">
          Your Ultimate <span className="text-teal-500">Job</span> Application Assistant
        </p>

        <p className="text-neutral-300 text-lg mt-8 sm:text-xl mb-8">
          Track your applications, find job opportunities, and boost your hiring potential with ATS analysis – all in one place.
        </p>

        <div className="flex flex-row gap-4">
          <motion.button
            onClick={() => navigate('/register')}
            className="bg-teal-500 hover:bg-teal-600 text-zinc-950 font-semibold px-6 py-3 rounded-md text-lg hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            Get Started
          </motion.button>
          <motion.button
            onClick={scrollToFeatures}
            className="bg-transparent border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-zinc-950 font-semibold px-6 py-3 rounded-md text-lg hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="md:w-3/5 flex justify-center mt-10 md:mt-0"
        variants={childVariants}
      >
        <div className="rounded-md flex items-center justify-center">
          <motion.img
            src={develop}
            alt="Job Illustration"
            className="w-full max-w-[600px] h-[500px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2, // Slower animation for the image
              ease: 'easeInOut',
              opacity: { duration: 1.2, ease: 'easeInOut' }, // Apply opacity transition
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
