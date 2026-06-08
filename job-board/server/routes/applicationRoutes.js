const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Apply for Job
router.post("/", async (req, res) => {
  try {
    const application = await Application.create({
      name: req.body.name,
      email: req.body.email,
      resume: req.body.resume,
      jobId: req.body.jobId,
    });

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;