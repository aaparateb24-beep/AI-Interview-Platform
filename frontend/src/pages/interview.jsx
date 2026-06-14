import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const navigate = useNavigate();

  const interviewType =
    localStorage.getItem("interviewType") ||
    "Technical";

  const [questions, setQuestions] =
    useState([]);

  const [loadingQuestions, setLoadingQuestions] =
    useState(true);

  const [loadingReport, setLoadingReport] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState(["", "", ""]);

  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const response =
          await axios.post(
            "http://127.0.0.1:8000/generate-questions",
            {
              interviewType,
            }
          );

        setQuestions(
          response.data.questions
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingQuestions(false);

      }
    };

    fetchQuestions();

  }, []);

  const handleAnswerChange = (e) => {

    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] =
      e.target.value;

    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  };

  const finishInterview = async () => {

    try {

      setLoadingReport(true);

      const response =
        await axios.post(
          "http://127.0.0.1:8000/submit",
          {
            interviewType,
            questions,
            answers,
          }
        );

      localStorage.setItem(
        "report",
        JSON.stringify(response.data)
      );

      localStorage.setItem(
        "answers",
        JSON.stringify(answers)
      );

      navigate("/review");

    } catch (error) {

      console.log(error);

      setLoadingReport(false);

      alert(
        "Unable to connect to the server."
      );
    }
  };

  if (loadingQuestions) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          fontFamily: "Arial"
        }}
      >
        <h1>
          Generating Interview Questions
        </h1>

        <h3>
          Preparing your interview...
        </h3>
      </div>
    );
  }

  if (loadingReport) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          fontFamily: "Arial"
        }}
      >
        <h1>
          Generating Interview Report
        </h1>

        <h3>
          Analyzing responses and preparing feedback...
        </h3>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>
        {interviewType} Interview
      </h1>

      <h2>
        Question {currentQuestion + 1}
      </h2>

      <h3>
        {questions[currentQuestion]}
      </h3>

      <textarea
        rows="6"
        cols="60"
        value={answers[currentQuestion]}
        onChange={handleAnswerChange}
        placeholder="Type your answer..."
      />

      <br />
      <br />

      {currentQuestion <
      questions.length - 1 ? (
        <button
          onClick={nextQuestion}
        >
          Next Question
        </button>
      ) : (
        <button
          onClick={finishInterview}
        >
          Finish Interview
        </button>
      )}
    </div>
  );
}

export default Interview;