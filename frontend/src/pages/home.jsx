import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>AI Interview Platform</h1>

        <h2>Ace Your Next Interview</h2>

        <p>
          Practice technical and HR interviews
          with AI-powered feedback.
        </p>

        <Link to="/interview">
          <button>Start Interview</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;