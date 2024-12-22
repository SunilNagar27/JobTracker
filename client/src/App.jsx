// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import JobList from "./pages/JobList";
import AtsChecker from "./pages/atsChecker";
import Navbar from "./components/navbar";
import SearchJobs from "./pages/jobs";
import LoginRegister from "./pages/loginRegistration";
import Footer from "./components/footer";
import PrivateRoute from "./components/privateRoute"; // Import the PrivateRoute component
import Contact from "./pages/contact";
import About from "./pages/about";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<LoginRegister />} />

            {/* Use PrivateRoute for routes that require authentication */}
            <Route path="/searchjobs" element={<PrivateRoute element={<SearchJobs />} />} />
            <Route path="/jobs" element={<PrivateRoute element={<JobList />} />} />
            <Route path="/ats-checker" element={<PrivateRoute element={<AtsChecker />} />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about-us" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
