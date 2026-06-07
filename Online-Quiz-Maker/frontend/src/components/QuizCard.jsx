import { Link } from "react-router-dom";
import API from "../services/api";

function QuizCard({ quiz, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      console.log("Quiz ID:", quiz._id);

      const response = await API.delete(
        `/quizzes/${quiz._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "DELETE SUCCESS:",
        response.data
      );

      if (onDelete) {
        onDelete(quiz._id);
      }

      alert("Quiz Deleted Successfully");
    } catch (error) {
      console.log(
        "FULL DELETE ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete quiz"
      );
    }
  };

  return (
    <div className="quiz-card-modern">
      <div className="quiz-icon">
        📘
      </div>

      <h2>{quiz.title}</h2>

      <p className="quiz-info">
        Questions: {quiz.questions.length}
      </p>

      <p className="quiz-desc">
        Test your knowledge and improve
        your skills with this quiz.
      </p>

      <Link to={`/quiz/${quiz._id}`}>
        <button className="start-btn">
          🚀 Start Quiz
        </button>
      </Link>

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        🗑 Delete Quiz
      </button>
    </div>
  );
}

export default QuizCard;