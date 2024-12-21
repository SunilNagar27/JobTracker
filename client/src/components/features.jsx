import React from 'react';

const Features = () => {
  return (
    <div className=" text-neutral-200 py-16 px-6 sm:px-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-10">
        Why Choose JobTracker?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Feature 1: Job Search */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg text-center">
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
        </div>

        {/* Feature 2: ATS Checker */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg text-center">
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
        </div>

        {/* Feature 3: Application Tracking */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg text-center">
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
          <h3 className="text-xl font-semibold text-teal-500 mb-4">Application Tracking</h3>
          <p className="text-neutral-300">
            Monitor all your applied jobs and stay organized with a clean, user-friendly interface.
          </p>
        </div>

        {/* Feature 4: Multi-Platform Integration */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg text-center">
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
          <h3 className="text-xl font-semibold text-teal-500 mb-4">Multi-Platform Integration</h3>
          <p className="text-neutral-300">
            Access jobs from platforms like Naukri, Indeed, Unstop, and more, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
