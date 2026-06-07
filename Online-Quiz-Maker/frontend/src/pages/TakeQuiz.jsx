import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function TakeQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await API.get(
        `/quizzes/${id}`
      );
      setQuiz(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionSelect = (
    questionIndex,
    option
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const submitQuiz = async () => {
    try {
      const res = await API.post(
        `/quizzes/${id}/submit`,
        {
          answers,
        }
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!quiz) {
    return <h2>Loading...</h2>;
  }

  // Result Page
  if (result) {
    return (
      <div className="result-card">
        <h1>🎉 Quiz Completed</h1>

        <h2>
          Score: {result.score} /{" "}
          {result.totalQuestions}
        </h2>

        <h3>
          Percentage:{" "}
          {Math.round(
            (result.score /
              result.totalQuestions) *
              100
          )}
          %
        </h3>

        <div className="answers-section">
          <h3>✅ Correct Answers</h3>

          {result.correctAnswers.map(
            (answer, index) => (
              <p key={index}>
                {index + 1}. {answer}
              </p>
            )
          )}
        </div>

        <button
          onClick={() =>
            (window.location.href =
              "/quizzes")
          }
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1>{quiz.title}</h1>

        <p>
          Question {currentQuestion + 1} of{" "}
          {quiz.questions.length}
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  quiz.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        <h2>{question.question}</h2>

        {question.options.map(
          (option, index) => (
            <label
              key={index}
              className="option-card"
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={
                  answers[currentQuestion] ===
                  option
                }
                onChange={() =>
                  handleOptionSelect(
                    currentQuestion,
                    option
                  )
                }
              />

              {" "}
              {option}
            </label>
          )
        )}

        {currentQuestion <
        quiz.questions.length - 1 ? (
          <button
            onClick={() =>
              setCurrentQuestion(
                currentQuestion + 1
              )
            }
          >
            Next Question →
          </button>
        ) : (
          <button onClick={submitQuiz}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;