const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    resume: String,
    jobId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);