import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function ApplyJob() {
  const location = useLocation();

  const queryParams = new URLSearchParams(
    location.search
  );

  const jobId =
    queryParams.get("jobId") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    jobId,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]?.name || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/applications",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        resume: "",
        jobId,
      });
    } catch (error) {
      alert("Application Failed");
    }
  };

  return (
    <div className="apply-page">
      <div className="apply-card">

        <div className="candidate-icon">
          👨‍💼
        </div>

        <h1>Apply For This Job</h1>

        <p className="apply-text">
          Submit your application and resume.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="upload-box">
            📄 Upload Resume
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              hidden
              required
            />
          </label>

          {formData.resume && (
            <p className="resume-text">
              Selected: {formData.resume}
            </p>
          )}

          <input
            type="hidden"
            name="jobId"
            value={formData.jobId}
          />

          <button type="submit">
            Submit Application
          </button>
        </form>

      </div>
    </div>
  );
}

export default ApplyJob;