import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplyJob from "./pages/ApplyJob";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route
        path="/job-details/:id"
        element={<JobDetails />}
      />

      <Route
        path="/apply"
        element={<ApplyJob />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer-dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;