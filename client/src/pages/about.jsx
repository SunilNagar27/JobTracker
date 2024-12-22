import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-200 py-12 px-6 min-h-screen">
      <section className="intro text-center mb-12">
        <h1 className="text-teal-400 text-4xl font-semibold mb-4">About Us</h1>
        <p className="text-gray-300 text-lg">
          Welcome to [Your Company Name]. We are dedicated to providing exceptional services to our clients, driven by our core values and a passion for excellence.
        </p>
      </section>

      <section className="mission-vision flex flex-col sm:flex-row justify-between gap-8 mb-12">
        <div className="mission flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            To deliver innovative solutions that empower our clients to achieve their goals.
          </p>
        </div>
        <div className="vision flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg">
            To be a global leader in our industry, recognized for our commitment to quality and integrity.
          </p>
        </div>
      </section>

      <section className="team text-center mb-12">
        <h2 className="text-teal-400 text-3xl font-semibold mb-6">Meet Our Team</h2>
        <div className="team-members flex flex-wrap justify-center gap-8">
          <div className="team-member bg-gray-800 p-6 rounded-xl shadow-lg w-60">
            <h3 className="text-teal-400 text-xl font-semibold">John Doe</h3>
            <p className="text-gray-300 text-sm">CEO & Founder</p>
            <p className="text-gray-400 text-sm">Harvard University, MBA</p>
          </div>
          <div className="team-member bg-gray-800 p-6 rounded-xl shadow-lg w-60">
            <h3 className="text-teal-400 text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-300 text-sm">Chief Technology Officer</p>
            <p className="text-gray-400 text-sm">MIT, B.Sc. Computer Science</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <section className="education bg-gray-800 p-6 rounded-xl shadow-lg mb-12">
        <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Educational Background</h2>
        <p className="text-gray-300 text-lg mb-4">
          Our team comprises graduates from prestigious institutions, bringing a wealth of knowledge and expertise to our company.
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg">
          <li>Harvard University</li>
          <li>Massachusetts Institute of Technology (MIT)</li>
          <li>Stanford University</li>
          {/* Add more institutions as needed */}
        </ul>
      </section>
    </div>
  );
};

export default About;
