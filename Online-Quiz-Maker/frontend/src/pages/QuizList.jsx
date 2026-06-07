import { useEffect, useState } from "react";
import API from "../services/api";
import QuizCard from "../components/QuizCard";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quizzes");
      setQuizzes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setQuizzes(
      quizzes.filter(
        (quiz) => quiz._id !== id
      )
    );
  };

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>👋 Welcome Back</h1>

        <p>
          Ready to challenge yourself?
          Select a quiz and start learning.
        </p>
      </div>

      <h2 className="section-title">
        📚 Available Quizzes
      </h2>

      <div className="quiz-grid">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No Quizzes Available</h3>

            <p>
              Create your first quiz to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizList;