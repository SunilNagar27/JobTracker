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
    <div className="flex justify-center items-center h-screen bg-gray-900 text-neutral-200 overflow-hidden">
      <div className="w-full max-w-lg p-8 bg-secondary shadow-lg rounded-xl mb-7">
        <h1 className="text-3xl font-semibold mb-5 text-center">ATS Checker</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <textarea
            rows="6"
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full p-4 border border-gray-700 rounded bg-gray-800 text-neutral-200 placeholder-gray-400"
            required
          />
          <textarea
            rows="6"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 border border-gray-700 rounded bg-gray-800 text-neutral-200 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-neutral-900 font-semibold rounded hover:bg-teal-600"
          >
            {loading ? "Checking..." : "Get ATS Score"}
          </button>
        </form>

        {atsScore !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">ATS Score: {atsScore}%</h3>
            <p className="mt-2">
              <strong>Matched Keywords:</strong>{" "}
              {matchedKeywords.length > 0 ? matchedKeywords.join(", ") : "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;
