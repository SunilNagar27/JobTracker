import React from 'react';
import '@/pages/about.css'

const About = () => {
  return (
    <div className="about-container">
      <section className="intro">
        <h1>About Us</h1>
        <p>
          Welcome to [Your Company Name]. We are dedicated to providing exceptional services to our clients, driven by our core values and a passion for excellence.
        </p>
      </section>

      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To deliver innovative solutions that empower our clients to achieve their goals.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To be a global leader in our industry, recognized for our commitment to quality and integrity.
          </p>
        </div>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="path-to-image.jpg" alt="Team Member" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
            <p>Harvard University, MBA</p>
          </div>
          <div className="team-member">
            <img src="path-to-image.jpg" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
            <p>MIT, B.Sc. Computer Science</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <section className="education">
        <h2>Our Educational Background</h2>
        <p>
          Our team comprises graduates from prestigious institutions, bringing a wealth of knowledge and expertise to our company.
        </p>
        <ul>
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
