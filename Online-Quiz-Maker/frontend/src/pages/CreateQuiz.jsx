import { useState } from "react";
import API from "../services/api";

function CreateQuiz() {
  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: "",
      correctAnswer: "",
    },
  ]);

  const handleQuestionChange = (
    index,
    field,
    value
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: "",
        correctAnswer: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await API.post(
        "/quizzes",
        {
          title,
          questions: questions.map((q) => ({
            question: q.question,
            options: q.options
              .split(",")
              .map((item) => item.trim()),
            correctAnswer:
              q.correctAnswer,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "🎉 Quiz Created Successfully"
      );

      setTitle("");

      setQuestions([
        {
          question: "",
          options: "",
          correctAnswer: "",
        },
      ]);

      window.location.href =
        "/quizzes";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h1>
          📝 Create New Quiz
        </h1>

        <p>
          Build an interactive quiz with
          multiple questions.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          {questions.map(
            (q, index) => (
              <div
                key={index}
                className="question-box"
              >
                <h3>
                  Question {index + 1}
                </h3>

                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "question",
                      e.target.value
                    )
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Options (comma separated)"
                  value={q.options}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "options",
                      e.target.value
                    )
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={
                    q.correctAnswer
                  }
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            )
          )}

          <button
            type="button"
            className="add-btn"
            onClick={addQuestion}
          >
            ➕ Add Question
          </button>

          <button type="submit">
            🚀 Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;