import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Testimonial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animation triggers once when the element enters the viewport

  // Animation variants for container and each testimonial
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        staggerChildren: 0.3, // Adds delay between each testimonial
      },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-12 background-primary sm:py-16 lg:py-20"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Trigger animation when in view
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            
            <h2 className="mt-4 text-3xl font-bold text-teal-600 sm:text-4xl xl:text-5xl font-pj">
              Our happy clients say about us
            </h2>
          </div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"></div>
            </div>

            <motion.div
              className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[ 
                {
                  name: "Utsav Patidar",
                  profession: "Software Engineer",
                  image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
                  feedback: "“Jobtracker has completely transformed my job search. The ATS checker helped me optimize my resume, and the job tracking system kept me organized throughout the entire process. Highly recommend!”",
                },
                {
                  name: "Priya Sharma",
                  profession: "Marketing Specialist",
                  image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png", 
                  feedback: "“Using Jobtracker was a game-changer for me. I could easily track all my job applications and keep track of my progress. It made the process so much smoother and less stressful!”",
                },
                {
                  name: "Ravi Gupta",
                  profession: "Data Analyst",
                  image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
                  feedback: "“The job application tracker on Jobtracker helped me stay organized and keep all the details in one place. The ATS checker also helped me tailor my resume for each job role. A must-have for job seekers!”",
                },
                
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col overflow-hidden shadow-xl shadow-zinc-950 h-auto min-h-[400px] lg:min-h-[350px]"
                  variants={testimonialVariants} // Apply the animation to each testimonial
                  whileHover={{ scale: 1.02 }} // Scale the card on hover
                  transition={{ duration: 0.3 }} // Smooth transition for scaling
                >
                  <div className="flex flex-col justify-between flex-1 p-8 bg-secondary lg:py-10 lg:px-8">
                    <div className="flex-1">
                      <div className="flex items-center mt-4">
                        <img
                          className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                          src={testimonial.image}
                          alt=""
                        />
                        <div className="ml-4">
                          <p className="text-base font-bold text-neutral-200 font-pj">
                            {testimonial.name}
                          </p>
                          <p className="mt-0.5 text-sm font-pj text-neutral-200">
                            {testimonial.profession}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mt-6">
                        {Array(5)
                          .fill(0)
                          .map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              className="w-5 h-5 text-[#FDB241]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>

                      <blockquote className="flex-1 mt-6">
                        <p className="text-lg leading-relaxed text-neutral-300 font-pj">
                          {testimonial.feedback}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonial;
