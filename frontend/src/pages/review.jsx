import { useNavigate } from "react-router-dom";

function Review() {
  const navigate = useNavigate();

  const answers =
    JSON.parse(
      localStorage.getItem("answers")
    ) || [];

  const report =
    JSON.parse(
      localStorage.getItem("report")
    ) || {
      answered: 0,
      total: 0,
      score: 0,
      feedback: "No Feedback"
    };

  const scoreColor =
    report.score >= 80
      ? "green"
      : report.score >= 50
      ? "orange"
      : "red";

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        <h1>
          Interview Report
        </h1>

        <p>
          Interview Performance Summary
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          boxShadow:
            "0px 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          Questions Answered:
          {report.answered} / {report.total}
        </h2>

        <h2
          style={{
            color: scoreColor
          }}
        >
          Score: {report.score}%
        </h2>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          boxShadow:
            "0px 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          AI Feedback
        </h2>

        <p
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8"
          }}
        >
          {report.feedback}
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          boxShadow:
            "0px 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          Submitted Answers
        </h2>

        {answers.map(
          (answer, index) => (
            <div key={index}>
              <h3>
                Answer {index + 1}
              </h3>

              <p>{answer}</p>

              <hr />
            </div>
          )
        )}
      </div>

      <div
        style={{
          textAlign: "center"
        }}
      >
        <button
          onClick={() =>
            navigate("/")
          }
          style={{
            marginRight: "15px"
          }}
        >
          Home
        </button>

        <button
          onClick={() =>
            navigate("/history")
          }
        >
          History
        </button>
      </div>
    </div>
  );
}

export default Review;
