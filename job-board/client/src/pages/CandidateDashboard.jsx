import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications"
      );

      // Supports both formats:
      // [] OR { success:true, applications:[...] }
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.applications || [];

      setApplications(data);
    } catch (error) {
      console.log(error);
      setApplications([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleProfileUpdate = () => {
    alert("Profile Updated Successfully");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <h1>👨‍💼 Candidate Dashboard</h1>

        <p>Track all your job applications</p>

        <div className="stats-card">
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="dashboard-card">
        <h2>👤 My Profile</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({
              ...profile,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          value={profile.email}
          onChange={(e) =>
            setProfile({
              ...profile,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Skills (React, Node.js, MongoDB)"
          value={profile.skills}
          onChange={(e) =>
            setProfile({
              ...profile,
              skills: e.target.value,
            })
          }
        />

        <button onClick={handleProfileUpdate}>
          Update Profile
        </button>
      </div>

      <h2 className="section-title">
        My Applications
      </h2>

      <div className="application-container">
        {applications.length === 0 ? (
          <p>No Applications Found</p>
        ) : (
          applications.map((app, index) => (
            <div
              key={app._id}
              className="application-card"
            >
              <div className="app-icon">
                👤
              </div>

              <h3>
                Application #{index + 1}
              </h3>

              <p>
                <strong>Name:</strong>{" "}
                {app.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {app.email}
              </p>

              <p>
                <strong>Resume:</strong>{" "}
                {app.resume
                  ? "📄 Resume Uploaded"
                  : "No Resume"}
              </p>

              <p className="status">
                ✅ Applied
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;