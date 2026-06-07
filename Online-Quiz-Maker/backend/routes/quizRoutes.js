const express = require("express");

const {
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Quiz
router.post("/", protect, createQuiz);

// Get All Quizzes
router.get("/", getQuizzes);

// Get Single Quiz
router.get("/:id", getQuizById);

// Submit Quiz
router.post("/:id/submit", submitQuiz);

// Delete Quiz
router.delete("/:id", protect, deleteQuiz);

module.exports = router;