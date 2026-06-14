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

  return (
    <div>

      <h1>
        Interview History
      </h1>

      {history.map((item) => (

        <div key={item.id}>

          <h3>
            Interview #{item.id}
          </h3>

          <p>
            Type:
            {item.interview_type}
          </p>

          <p>
            Score:
            {item.score}%
          </p>

          <p>
            Feedback:
            {item.feedback}
          </p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default History;