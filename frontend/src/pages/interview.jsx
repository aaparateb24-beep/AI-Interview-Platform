import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const navigate = useNavigate();

  const interviewType =
    localStorage.getItem("interviewType");

  let questions = [];

  if (interviewType === "HR") {
    questions = [
      "Tell me about yourself",
      "What are your strengths?",
      "Where do you see yourself in 5 years?"
    ];
  } else if (interviewType === "Technical") {
    questions = [
      "What is React?",
      "What is useState?",
      "What is useEffect?"
    ];
  } else if (interviewType === "Aptitude") {
    questions = [
      "What is 20% of 500?",
      "Find the next number: 2,4,8,16",
      "A train travels 60 km in 1 hour..."
    ];
  }

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState(["", "", ""]);

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
      const response = await axios.post(
        "http://127.0.0.1:8000/submit",
        {
          interviewType,
          answers,
        }
      );

      localStorage.setItem(
        "backendScore",
        response.data.score
      );

      localStorage.setItem(
        "backendFeedback",
        response.data.feedback
      );

    } catch (error) {
      console.log(error);
    }

    localStorage.setItem(
      "answers",
      JSON.stringify(answers)
    );

    navigate("/review");
  };

  return (
    <div>
      <h1>{interviewType} Interview</h1>

      <h2>
        Question {currentQuestion + 1}
      </h2>

      <h3>
        {questions[currentQuestion]}
      </h3>

      <textarea
        rows="5"
        cols="50"
        value={answers[currentQuestion]}
        onChange={handleAnswerChange}
        placeholder="Type your answer..."
      />

      <br />
      <br />

      {currentQuestion <
      questions.length - 1 ? (
        <button onClick={nextQuestion}>
          Next
        </button>
      ) : (
        <button onClick={finishInterview}>
          Finish Interview
        </button>
      )}
    </div>
  );
}

export default Interview;