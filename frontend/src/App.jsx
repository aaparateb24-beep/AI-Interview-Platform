import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Review from "./pages/Review";
import History from "./pages/History";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/review"
          element={<Review />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/resume-analyzer"
          element={
            <ResumeAnalyzer />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;