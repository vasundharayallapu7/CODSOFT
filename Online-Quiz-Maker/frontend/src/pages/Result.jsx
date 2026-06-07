function Result({ result }) {
  if (!result) return null;

  const percentage = Math.round(
    (result.score / result.totalQuestions) * 100
  );

  return (
    <div className="result-card">
      <h2>🎉 Quiz Completed</h2>

      <div className="score">
        {result.score} / {result.totalQuestions}
      </div>

      <h3>{percentage}% Score</h3>

      <br />

      <h4>Correct Answers</h4>

      <ul
        style={{
          listStyle: "none",
          marginTop: "15px",
        }}
      >
        {result.correctAnswers.map(
          (answer, index) => (
            <li key={index}>
              ✅ {answer}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Result;