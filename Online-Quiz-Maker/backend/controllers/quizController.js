const Quiz = require("../models/Quiz");

// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      questions,
      createdBy: req.user._id,
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Quiz
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(
      req.params.id
    );

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Submit Quiz
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const quiz = await Quiz.findById(
      req.params.id
    );

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;

    quiz.questions.forEach(
      (question, index) => {
        if (
          answers[index] &&
          answers[index] ===
            question.correctAnswer
        ) {
          score++;
        }
      }
    );

    res.json({
      totalQuestions:
        quiz.questions.length,
      score,
      correctAnswers:
        quiz.questions.map(
          (q) => q.correctAnswer
        ),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz =
      await Quiz.findByIdAndDelete(
        req.params.id
      );

    if (!deletedQuiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json({
      message:
        "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz,
};