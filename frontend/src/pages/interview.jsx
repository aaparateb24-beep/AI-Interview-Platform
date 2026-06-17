
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {

  const navigate = useNavigate();

  const interviewType =
    localStorage.getItem(
      "interviewType"
    ) || "Technical";

    const questionCount =
  Number(
    localStorage.getItem(
      "questionCount"
    )
  ) || 3;

  const [questions, setQuestions] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "generatedQuestions"
        )
      ) || []
    );

  const [loadingQuestions, setLoadingQuestions] =
  useState(true);

  const [loadingReport, setLoadingReport] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
  useState(
    Array(questionCount).fill("")
  );
  const [progress, setProgress] =
  useState(0);

  useEffect(() => {

    if (
      questions.length > 0
    ) {
      setLoadingQuestions(
        false
      );
      return;
    }

    const fetchQuestions =
      async () => {

        try {

          const response =
            await axios.post(
              "https://ai-interview-platform-0cd2.onrender.com/generate-questions",
              {
                interviewType,
                questionCount,
              }
            );

          localStorage.setItem(
            "generatedQuestions",
            JSON.stringify(
              response.data.questions
            )
          );

          setQuestions(
            response.data.questions
          );
          alert(
  "Questions received: " +
  response.data.questions.length
);

        } catch (error) {

          console.log(error);

        } finally {

          setLoadingQuestions(
            false
          );

        }
      };

    fetchQuestions();

  }, []);
  useEffect(() => {

  const timer = setInterval(() => {

    setProgress((prev) => {

      if (prev >= 95) {
        return prev;
      }

      return prev + 5;

    });

  }, 250);

  return () =>
    clearInterval(timer);

}, []);

  const handleAnswerChange =
    (e) => {

      const updatedAnswers =
        [...answers];

      updatedAnswers[
        currentQuestion
      ] = e.target.value;

      setAnswers(
        updatedAnswers
      );
    };

  const nextQuestion =
    () => {

      if (
        currentQuestion <
        questions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );

      }
    };

  const finishInterview =
    async () => {

      try {

        setLoadingReport(
          true
        );

        const response =
          await axios.post(
            "https://ai-interview-platform-0cd2.onrender.com/submit",
            {
              interviewType,
              questions,
              answers,
            }
          );

        localStorage.setItem(
          "report",
          JSON.stringify(
            response.data
          )
        );

        localStorage.setItem(
          "answers",
          JSON.stringify(
            answers
          )
        );

        localStorage.removeItem(
          "generatedQuestions"
        );

        navigate(
          "/review"
        );

      } catch (error) {

        console.log(
          error
        );

        setLoadingReport(
          false
        );

        alert(
          "Unable to connect to the server."
        );
      }
    };

  
if (loadingQuestions) {

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
          marginTop: "30px",
          color: "#0F172A"
        }}
      >
        Generating Interview Questions
      </h2>

      <p
        style={{
          color: "#64748B"
        }}
      >
        Preparing your AI interview...
      </p>

    </div>

  );
}




if (loadingReport) {

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
          marginTop: "30px",
          color: "#0F172A"
        }}
      >
        Generating Interview Report
      </h2>

      <p
        style={{
          color: "#64748B"
        }}
      >
        AI is evaluating your answers...
      </p>

    </div>

  );
}
if (questions.length === 0) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <h2>No questions found</h2>

      <button
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}


  return (
    <div
      style={{
        minHeight:
          "100vh",
        padding:
          "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth:
            "900px",
          margin:
            "0 auto"
        }}
      >
        <h1>
          {
            interviewType
          } Interview
        </h1>

        <p>
          Question{" "}
          {
            currentQuestion + 1
          }{" "}
          of{" "}
          {
            questions.length
          }
        </p>

        <div
          style={{
            background:
              "white",
            padding:
              "40px",
            borderRadius:
              "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            marginTop:
              "30px"
          }}
        >
          <h2
            style={{
              marginBottom:
                "30px"
            }}
          >
            {
              questions[
                currentQuestion
              ]
            }
          </h2>

          <textarea
            rows="8"
            value={
              answers[
                currentQuestion
              ]
            }
            onChange={
              handleAnswerChange
            }
            placeholder="Enter your answer here..."
          />

          <div
            style={{
              marginTop:
                "30px",
              textAlign:
                "right"
            }}
          >
            {
              currentQuestion <
              questions.length - 1 ? (

                <button
                  onClick={
                    nextQuestion
                  }
                >
                  Next Question
                </button>

              ) : (

                <button
                  onClick={
                    finishInterview
                  }
                >
                  Finish Interview
                </button>

              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;

