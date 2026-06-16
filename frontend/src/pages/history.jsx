import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "http://127.0.0.1:8000/history"
      )
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const totalInterviews =
    history.length;

  const averageScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / history.length
        )
      : 0;

  const bestScore =
    history.length > 0
      ? Math.max(
          ...history.map(
            (item) => item.score
          )
        )
      : 0;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>
        Interview Analytics
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        <div className="card">
          <h2>
            {totalInterviews}
          </h2>

          <p>
            Total Interviews
          </p>
        </div>

        <div className="card">
          <h2>
            {averageScore}%
          </h2>

          <p>
            Average Score
          </p>
        </div>

        <div className="card">
          <h2>
            {bestScore}%
          </h2>

          <p>
            Best Score
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginTop: "40px"
        }}
      >
        <h2>
          Recent Interviews
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>

            {history.map(
              (item) => (

                <tr
                  key={item.id}
                >
                  <td>
                    {item.id}
                  </td>

                  <td>
                    {
                      item.interview_type
                    }
                  </td>

                  <td>
                    {item.score}%
                  </td>
                </tr>

              )
            )}

          </tbody>
        </table>
      </div>

      <div
        className="card"
        style={{
          marginTop: "30px"
        }}
      >
        <h2>
          Detailed Feedback
        </h2>

        {history.map(
          (item) => (

            <div
              key={
                item.id
              }
              style={{
                marginBottom:
                  "25px"
              }}
            >
              <h3>
                Interview #
                {item.id}
              </h3>

              <p>
                Type:
                {" "}
                {
                  item.interview_type
                }
              </p>

              <p>
                Score:
                {" "}
                {
                  item.score
                }
                %
              </p>

              <p>
                {
                  item.feedback
                }
              </p>

              <hr />
            </div>

          )
        )}

      </div>
    </div>
  );
}

export default History;

