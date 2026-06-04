const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Apply for Job
router.post("/", async (req, res) => {
  try {
    const application = await Application.create(
      req.body
    );

    // Send Confirmation Email
    await sendEmail(
      application.email,
      "Application Submitted Successfully",
      `Hello ${application.name},

Your application has been submitted successfully.

Thank you for applying through JobBoard.

We wish you the best of luck for your application.

Regards,
JobBoard Team`
    );

    res.status(201).json({
      message:
        "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Applications
router.get("/", async (req, res) => {
  try {
    const applications =
      await Application.find();

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;