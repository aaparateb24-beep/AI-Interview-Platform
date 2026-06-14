import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const startInterview = (type) => {
    localStorage.setItem(
      "interviewType",
      type
    );

    navigate("/interview");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI Interview Platform</h1>

        <h2>Ace Your Next Interview</h2>

        <p>
          Practice technical and HR interviews
          with AI-powered feedback.
        </p>

        <button
          onClick={() =>
            startInterview("Technical")
          }
        >
          Technical Interview
        </button>

        <br />
        <br />

        <button
          onClick={() =>
            startInterview("HR")
          }
        >
          HR Interview
        </button>

        <br />
        <br />

        <button
          onClick={() =>
            startInterview("Aptitude")
          }
        >
          Aptitude Interview
        </button>
      </div>
    </div>
  );
}

export default Home;