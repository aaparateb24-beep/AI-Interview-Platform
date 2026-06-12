function Review() {
  const answers =
    JSON.parse(
      localStorage.getItem("answers")
    ) || [];

  const score =
    localStorage.getItem("backendScore");

  const feedback =
    localStorage.getItem(
      "backendFeedback"
    );

  return (
    <div>
      <h1>Review Answers</h1>

      <h3>Answer 1</h3>
      <p>{answers[0]}</p>

      <h3>Answer 2</h3>
      <p>{answers[1]}</p>

      <h3>Answer 3</h3>
      <p>{answers[2]}</p>

      <h2>
        Backend Score: {score}%
      </h2>

      <h2>
        Feedback: {feedback}
      </h2>
    </div>
  );
}

export default Review;