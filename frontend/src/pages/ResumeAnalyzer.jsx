
import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  const [progress, setProgress] =
    useState(0);

  const [status, setStatus] =
    useState("");

  const analyzeResume = async () => {

    if (!file) {

      alert(
        "Please select a PDF resume."
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    try {

      setLoading(true);

      setProgress(10);
      setStatus(
        "Uploading Resume..."
      );

      setTimeout(() => {
        setProgress(20);
        setStatus(
          "Reading Resume..."
        );
      }, 500);

      setTimeout(() => {
        setProgress(35);
        setStatus(
          "Extracting Skills..."
        );
      }, 1000);

      setTimeout(() => {
        setProgress(45);
        setStatus(
          "Analyzing Experience..."
        );
      }, 1500);

      setTimeout(() => {
        setProgress(60);
        setStatus(
          "Checking Keywords..."
        );
      }, 2000);

      setTimeout(() => {
        setProgress(80);
        setStatus(
          "Generating Suggestions..."
        );
      }, 2500);

      setTimeout(() => {
        setProgress(90);
        setStatus(
          "Final Review..."
        );
      }, 3000);

      setTimeout(() => {
        setProgress(95);
        setStatus(
          "Preparing Report..."
        );
      }, 3500);

      setTimeout(() => {
        setProgress(99);
        setStatus(
          "Almost Done..."
        );
      }, 4000);

      const response =
        await axios.post(
          "https://ai-interview-platform-0cd2.onrender.com/analyze-resume",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      setProgress(100);

      setResult(
        response.data.analysis
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to analyze resume."
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#EAF2FF"
        }}
      >
        
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border:
              "12px solid #BFDBFE",
            borderTop:
              "12px solid #1E3A8A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            fontWeight: "700",
            color: "#1E3A8A",
            animation:
              "spin 1s linear infinite"
          }}
        >
          {progress}%
        </div>

        <h2
          style={{
            marginTop: "30px"
          }}
        >
          Resume Analysis
        </h2>

        <p>
          {status}
        </p>

      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>
        AI Resume Analyzer
      </h1>

      <p>
        Upload your resume and
        receive AI-powered feedback.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={analyzeResume}
      >
        Analyze Resume
      </button>

      {result && (
        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>
            Analysis Result
          </h2>

          <pre
            style={{
              whiteSpace:
                "pre-wrap"
            }}
          >
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;



