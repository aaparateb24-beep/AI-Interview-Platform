
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function Review() {

  const navigate = useNavigate();

  const answers =
    JSON.parse(
      localStorage.getItem(
        "answers"
      )
    ) || [];

  const report =
    JSON.parse(
      localStorage.getItem(
        "report"
      )
    ) || {
      answered: 0,
      total: 0,
      score: 0,
      feedback: "No Feedback"
    };

  const scoreColor =
    report.score >= 80
      ? "#16a34a"
      : report.score >= 50
      ? "#f59e0b"
      : "#dc2626";

  const downloadPDF = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(20);

    pdf.text(
      "AI Interview Report",
      20,
      20
    );

    pdf.setFontSize(12);

    pdf.text(
      `Score: ${report.score}%`,
      20,
      40
    );

    pdf.text(
      `Questions Answered: ${report.answered}/${report.total}`,
      20,
      50
    );

    pdf.text(
      "AI Feedback:",
      20,
      70
    );

    const feedbackLines =
      pdf.splitTextToSize(
        report.feedback,
        170
      );

    pdf.text(
      feedbackLines,
      20,
      80
    );

    let yPosition =
      100 +
      feedbackLines.length * 6;

    pdf.text(
      "Submitted Answers:",
      20,
      yPosition
    );

    yPosition += 10;

    answers.forEach(
      (
        answer,
        index
      ) => {

        const answerLines =
          pdf.splitTextToSize(
            `Answer ${index + 1}: ${answer}`,
            170
          );

        pdf.text(
          answerLines,
          20,
          yPosition
        );

        yPosition +=
          answerLines.length * 6 +
          10;
      }
    );

    pdf.save(
      "Interview_Report.pdf"
    );
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <div
        className="card"
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        <h1>
          AI Assessment Report
        </h1>

        <p>
          Detailed interview analysis
          and performance evaluation
        </p>

        <div
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            color: scoreColor,
            marginTop: "20px"
          }}
        >
          {report.score}%
        </div>

        <h2>
          Overall Score
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <div className="card">
          <h2>
            {report.answered}
          </h2>

          <p>
            Questions Answered
          </p>
        </div>

        <div className="card">
          <h2>
            {report.total}
          </h2>

          <p>
            Total Questions
          </p>
        </div>

        <div className="card">
          <h2
            style={{
              color: scoreColor
            }}
          >
            {report.score}%
          </h2>

          <p>
            Performance Score
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "30px"
        }}
      >
        <h2>
          AI Evaluation
        </h2>

        <div
          style={{
            whiteSpace:
              "pre-wrap",
            lineHeight: "1.8"
          }}
        >
          {report.feedback}
        </div>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "30px"
        }}
      >
        <h2>
          Submitted Answers
        </h2>

        {answers.map(
          (
            answer,
            index
          ) => (
            <div
              key={index}
            >
              <h3>
                Question
                {" "}
                {index + 1}
              </h3>

              <p>
                {answer}
              </p>

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
        >
          Home
        </button>

        <button
          onClick={() =>
            navigate(
              "/history"
            )
          }
          style={{
            marginLeft:
              "15px"
          }}
        >
          History
        </button>

        <button
          onClick={
            downloadPDF
          }
          style={{
            marginLeft:
              "15px"
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default Review;

