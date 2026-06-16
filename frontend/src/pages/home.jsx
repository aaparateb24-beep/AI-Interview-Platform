
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EAF2FF"
      }}
    >

      {/* Hero Section */}

      <section
        style={{
          textAlign: "center",
          padding: "120px 20px 80px"
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            color: "#0F172A",
            lineHeight: "1.2",
            marginBottom: "25px"
          }}
        >
          AI Mock
          <br />
          Interview Platform
        </h1>

        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            fontSize: "1.2rem",
            color: "#64748B",
            lineHeight: "1.8"
          }}
        >
          Practice interviews with AI,
          analyze resumes,
          receive detailed feedback,
          and improve your confidence
          before real interviews.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "40px",
            color: "#475569",
            fontWeight: "600"
          }}
        >
          <span>
            ✓ AI Interviews
          </span>

          <span>
            ✓ Resume Analyzer
          </span>

          <span>
            ✓ PDF Reports
          </span>

          <span>
            ✓ Performance Tracking
          </span>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            marginTop: "50px",
            background: "#1E3A8A",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "16px 40px",
            fontSize: "18px",
            width: "auto",
            cursor: "pointer"
          }}
        >
          Launch Dashboard
        </button>
      </section>

      {/* Features */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 20px 80px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px"
        }}
      >
        <div className="card">
          <h3>
            AI Interview Questions
          </h3>

          <p>
            Generate realistic technical,
            HR and aptitude interview
            questions instantly.
          </p>
        </div>

        <div className="card">
          <h3>
            Resume Analysis
          </h3>

          <p>
            Upload resumes and receive
            AI-powered improvement
            suggestions.
          </p>
        </div>

        <div className="card">
          <h3>
            Smart Feedback
          </h3>

          <p>
            Receive detailed answer
            evaluation and personalized
            recommendations.
          </p>
        </div>

        <div className="card">
          <h3>
            PDF Reports
          </h3>

          <p>
            Download professional
            interview reports and
            performance summaries.
          </p>
        </div>
      </section>

      {/* History Button */}

      <div
        style={{
          textAlign: "center",
          paddingBottom: "60px"
        }}
      >
        <button
          onClick={() =>
            navigate("/history")
          }
          style={{
            width: "auto",
            padding: "15px 35px",
            background: "#1E3A8A",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          View Interview History
        </button>
      </div>

    </div>
  );
}

export default Home;

