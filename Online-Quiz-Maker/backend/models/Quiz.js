const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Quiz", quizSchema);