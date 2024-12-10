const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { title, company, status } = req.body;
  try {
    const job = await Job.create({ user: req.user.id, title, company, status });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
