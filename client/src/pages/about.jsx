import React from 'react';
import '@/pages/about.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import developerImage from '../assets/developer.jpg';

const About = () => {
  return (
    <div className="about-container">
      <section className="intro ">
        <h1 className=' text-2xl font-bold text-teal-400 mb-5'>About Us</h1>
        <p>
          Welcome to JobTracker. We are a team of two members who just want to help the community through our open-source projects.
        </p>
      </section>

      <section className="mission-vision flex flex-col sm:flex-row justify-between gap-8 mb-12">
        <div className="mission flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            At Jobtracker, our mission is to empower job seekers with an intuitive platform that simplifies resume optimization, job tracking, and application management. We provide essential tools like an ATS checker and a to-do list, helping individuals stay organized and confident throughout their job search.
          </p>
        </div>
        <div className="vision flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg">
            Our vision is to be the leading platform for job seekers, providing the tools and resources needed to succeed in the job market. We aim to help individuals unlock their full potential and find meaningful employment opportunities with ease.
          </p>
        </div>
      </section>

      <h2 className="text-teal-400 text-2xl font-semibold mb-4">Meet Our Team</h2>
      <div className="team-members flex flex-col sm:flex-row gap-8 justify-center">
        <div className="team-member w-full sm:w-80 text-center bg-gray-800 p-6 rounded-xl shadow-lg">
          <img className='display-flex w-32 h-32 mx-auto rounded-full' src={developerImage} alt="Team Member" />
          <h3 className="text-white mt-4">Sunil Nagar</h3>
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
          <p className="text-gray-300 mt-4">Acropolis Institute of Technology and Research, Btech</p>
        </div>
        <div className="team-member w-full sm:w-80 text-center bg-gray-800 p-6 rounded-xl shadow-lg">
          <img className='display-flex w-32 h-32 mx-auto rounded-full' src={developerImage} alt="Team Member" />
          <h3 className="text-white mt-4">Tanish Kumar Gaur</h3>
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
          <p className="text-gray-300 mt-4">Acropolis Institute of Technology and Research, Btech</p>
        </div>
      </div>

      <section className="education bg-gray-800 p-6 mt-12 rounded-xl shadow-lg mb-12">
        <h2 className="text-teal-400 text-2xl font-semibold mb-4">Our Educational Background</h2>
        <p className="text-gray-300 text-lg mb-4">Our team consists of graduates from well-known institutions, bringing valuable knowledge and expertise to our company.
        </p>

        <ul className='text-neutral-300'>
          <li>Acropolis Institute of Technology and Research, Indore</li>
          <li>B.Tech</li>
          <li>Computer Science</li>
          <li>2020 – 2024</li>
        </ul>

      </section>
    </div>
  );
};

export default About;
