const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Create Job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Job
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
      });
    }

    res.json({
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
      });
    }

    res.json({
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;