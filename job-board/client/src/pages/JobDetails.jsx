import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return (
      <div className="job-details">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="job-details">
      <div className="details-card">

        <Link to="/jobs">
          <button className="back-btn">
            ← Back to Jobs
          </button>
        </Link>

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <h1>{job.title}</h1>

        <p>
          <strong>🏢 Company:</strong>{" "}
          {job.company}
        </p>

        <p>
          <strong>📍 Location:</strong>{" "}
          {job.location}
        </p>

        <p>
          <strong>💰 Salary:</strong>{" "}
          {job.salary}
        </p>

        <p>
          <strong>📝 Job Description:</strong>
        </p>

        <p>{job.description}</p>

        <div className="skills">
          <span>React</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>CSS</span>
        </div>

        <Link
          to={`/apply?jobId=${job._id}`}
        >
          <button className="apply-btn">
            Apply For This Job
          </button>
        </Link>

      </div>
    </div>
  );
}

export default JobDetails;