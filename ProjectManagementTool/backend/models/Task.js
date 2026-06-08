const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    assignedTo: {
      type: String,
      required: true,
    },

    deadline: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);