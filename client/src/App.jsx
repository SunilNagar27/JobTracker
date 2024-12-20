// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import JobList from "./components/JobList";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/jobs" element={<JobList />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import JobList from "./components/JobList";
import AtsChecker from "./components/atsChecker";
import Navbar from "./components/navbar";
import SearchJobs from "./pages/jobs";

const App = () => {
  return (
    <div className="bg-slate-300 min-h-screen">
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchjobs" element={<SearchJobs />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/ats-checker" element={<AtsChecker />} />
   
      </Routes>
    </Router>
    </div>
    
  );
};

export default App;
