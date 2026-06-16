import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Interview from "./pages/interview";
import Review from "./pages/review";
import History from "./pages/history";
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