import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const [selectedType, setSelectedType] = useState("");

  const navigate = useNavigate();

  const startInterview = () => {
    if (selectedType === "") {
      alert("Please select interview type");
      return;
    }

    localStorage.setItem("interviewType", selectedType);

    navigate("/interview");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Select Interview Type</h2>

      <button onClick={() => setSelectedType("HR")}>
        HR Interview
      </button>

      <br />
      <br />

      <button onClick={() => setSelectedType("Technical")}>
        Technical Interview
      </button>

      <br />
      <br />

      <button onClick={() => setSelectedType("Aptitude")}>
        Aptitude Interview
      </button>

      <h3>Selected: {selectedType}</h3>

      <button onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default Dashboard;