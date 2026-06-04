import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

function EmployerDashboard() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        job
      );

      alert("Job Posted Successfully");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });

      fetchJobs();
    } catch (error) {
      alert("Failed to Post Job");
    }
  };

  const editJob = (job) => {
    setJob({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
    });

    setEditingId(job._id);
  };

  const updateJob = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${editingId}`,
        job
      );

      alert("Job Updated Successfully");

      setEditingId(null);

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`
      );

      alert("Job Deleted Successfully");

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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

        <h1>🏢 Employer Dashboard</h1>

        <div className="stats-card">
          <h2>{jobs.length}</h2>
          <p>Total Jobs Posted</p>
        </div>

      </div>

      <div className="dashboard-card">

        <h2>
          {editingId
            ? "Update Job"
            : "Post New Job"}
        </h2>

        <form
          onSubmit={
            editingId
              ? updateJob
              : handleSubmit
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            {editingId
              ? "Update Job"
              : "Post Job"}
          </button>
        </form>

      </div>

      <h2>My Posted Jobs</h2>

      <div className="application-container">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="application-card"
          >
            <h3>{job.title}</h3>

            <p>🏢 {job.company}</p>

            <p>📍 {job.location}</p>

            <p>💰 {job.salary}</p>

            <p>{job.description}</p>

            <button
              className="edit-btn"
              onClick={() =>
                editJob(job)
              }
            >
              Edit Job
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteJob(job._id)
              }
            >
              Delete Job
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default EmployerDashboard;