
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {

  const [selectedType, setSelectedType] =
    useState("");

  const [questionCount, setQuestionCount] =
    useState(3);

  const navigate = useNavigate();

  const startInterview = () => {

    if (!selectedType) {

      alert(
        "Please select an interview type"
      );

      return;
    }
    localStorage.removeItem(
  "generatedQuestions"
);

    localStorage.setItem(
      "interviewType",
      selectedType
    );

    localStorage.setItem(
      "questionCount",
      questionCount
    );

    navigate("/interview");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#EAF2FF"
      }}
    >
      {/* Sidebar */}

      <div
        style={{
          width: "260px",
          background: "white",
          borderRight:
            "1px solid #e2e8f0",
          padding: "30px"
        }}
      >
        <h2
          style={{
            marginBottom: "40px",
            color: "#1E3A8A"
          }}
        >
          AI Mock Interview
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <button>
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/history")
            }
          >
            History
          </button>

          <button
            onClick={() =>
              navigate(
                "/resume-analyzer"
              )
            }
          >
            Resume Analyzer
          </button>

          <button
            onClick={() =>
              navigate("/")
            }
          >
            Home
          </button>
        </div>
      </div>

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >
        <h1
          style={{
            color: "#0F172A"
          }}
        >
          AI Mock Interview Dashboard
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "30px"
          }}
        >
          Configure your interview and
          start practicing with AI.
        </p>

        {/* Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px"
          }}
        >
          <div className="card">
            <h3>
              Technical
            </h3>

            <p>
              Practice coding,
              development,
              databases and
              system design.
            </p>
          </div>

          <div className="card">
            <h3>
              HR
            </h3>

            <p>
              Behavioral and
              communication
              interview preparation.
            </p>
          </div>

          <div className="card">
            <h3>
              Aptitude
            </h3>

            <p>
              Logical reasoning,
              quantitative aptitude
              and problem solving.
            </p>
          </div>
        </div>

        {/* Configuration Card */}

        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>
            Configure Interview
          </h2>

          <h3>
            Interview Type
          </h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() =>
                setSelectedType(
                  "Technical"
                )
              }
            >
              Technical
            </button>

            <button
              onClick={() =>
                setSelectedType(
                  "HR"
                )
              }
            >
              HR
            </button>

            <button
              onClick={() =>
                setSelectedType(
                  "Aptitude"
                )
              }
            >
              Aptitude
            </button>
          </div>

          <h3
            style={{
              marginTop: "30px"
            }}
          >
            Number of Questions
          </h3>

          <div
            style={{
              display: "flex",
              gap: "15px"
            }}
          >
            <button
              onClick={() =>
                setQuestionCount(3)
              }
            >
              3
            </button>

            <button
              onClick={() =>
                setQuestionCount(5)
              }
            >
              5
            </button>

            <button
              onClick={() =>
                setQuestionCount(8)
              }
            >
              8
            </button>
          </div>

          <h3
            style={{
              marginTop: "25px"
            }}
          >
            Selected Type:
            {" "}
            {selectedType || "None"}
          </h3>

          <h3>
            Questions:
            {" "}
            {questionCount}
          </h3>

          <button
            onClick={
              startInterview
            }
            style={{
              marginTop: "20px"
            }}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
