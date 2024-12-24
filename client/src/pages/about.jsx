import React from 'react';
import '@/pages/about.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import developerImage from '../assets/developer.jpg'
const About = () => {
  return (
    <div className="about-container">
      <section className="intro">
        <h1>About Us</h1>
        <p>
          Welcome to JobTracker. We are team of two members who just want to help community through our open source projects.
        </p>
      </section>

      <section className="mission-vision flex flex-col sm:flex-row justify-between gap-8 mb-12">
        <div className="mission flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            To deliver innovative solutions that empower our clients to achieve their goals.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To provide open source projects to our customers and maintaining them for a long period of time
          </p>
        </div>
      </section>
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img className='display-flex' src={developerImage} alt="Team Member" />
            <h3>Sunil Nagar</h3>
            <a
        href="https://www.linkedin.com/in/sunilnagarhere/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: "20px" }}
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ fontSize: "40px", color: "#0077b5" }}
        />
      </a>
            <p>Acropolis Institute of Technology and Research, Btech</p>
          </div>
          <div className="team-member">
            <img src={developerImage} alt="Team Member" />
            <h3>Tanish Kumar Gaur</h3>
            <a
        href="https://www.linkedin.com/in/tanish-gaur/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: "20px" }}
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ fontSize: "40px", color: "#0077b5" }}
        />
      </a>
            <p>Acropolis Institute of Technology and Research, Btech</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <section className="education bg-gray-800 p-6 rounded-xl shadow-lg mb-12">
        <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Educational Background</h2>
        <p className="text-gray-300 text-lg mb-4">
          Our team comprises graduates from prestigious institutions, bringing a wealth of knowledge and expertise to our company.
        </p>

        <ul className='text-neutral-300'>
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
