import React, { useState } from "react";
import axios from "axios";

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/ats-score", {
        resumeText,
        jobDescription,
      });

      const { score, matchedKeywords } = response.data;
      setAtsScore(score);
      setMatchedKeywords(matchedKeywords);
    } catch (error) {
      console.error("Error calculating ATS score:", error.response?.data || error.message);
      setAtsScore(null);
      setMatchedKeywords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>ATS Checker</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <textarea
            rows="6"
            cols="50"
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <textarea
            rows="6"
            cols="50"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Checking..." : "Get ATS Score"}
        </button>
      </form>

      {atsScore !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>ATS Score: {atsScore}%</h3>
          <p>
            <strong>Matched Keywords:</strong> {matchedKeywords.length > 0 ? matchedKeywords.join(", ") : "None"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
