const express = require("express");
const router = express.Router();
const natural = require("natural");

// Route for ATS score calculation
router.post("/ats-score", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: "Both resume and job description are required!" });
  }

  // Tokenize words
  const tokenizer = new natural.WordTokenizer();
  const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
  const jobTokens = tokenizer.tokenize(jobDescription.toLowerCase());

  // Extract unique words
  const resumeWords = Array.from(new Set(resumeTokens));
  const jobWords = Array.from(new Set(jobTokens));

  // Find matched keywords
  const matchedKeywords = resumeWords.filter((word) => jobWords.includes(word));
  const matchPercentage = (matchedKeywords.length / jobWords.length) * 100;

  res.json({
    matchedKeywords,
    score: Math.round(matchPercentage),
  });
});

module.exports = router;
