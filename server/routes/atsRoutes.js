const express = require("express");
const router = express.Router();
const natural = require("natural");

// Route for calculating ATS score
router.post("/ats-score", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: "Both resume and job description are required!" });
  }

  // Tokenize words for comparison
  const tokenizer = new natural.WordTokenizer();
  const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
  const jobTokens = tokenizer.tokenize(jobDescription.toLowerCase());

  // Extract unique words
  const resumeWords = Array.from(new Set(resumeTokens));
  const jobWords = Array.from(new Set(jobTokens));

  // Calculate matched keywords
  const matchedWords = resumeWords.filter((word) => jobWords.includes(word));
  const matchPercentage = (matchedWords.length / jobWords.length) * 100;

  res.json({
    matchedKeywords: matchedWords,
    score: Math.round(matchPercentage),
    totalKeywords: jobWords.length,
  });
});

module.exports = router;
