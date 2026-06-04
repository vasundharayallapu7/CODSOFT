import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <section className="jobs">
      <div className="jobs-header">
        <h1>Find Your Dream Job</h1>

        <p>
          Explore opportunities from top
          companies and apply with one click.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Jobs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="job-container">
        {jobs
          .filter((job) =>
            job.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((job) => (
            <div
              className="job-card"
              key={job._id}
            >
              <h3>{job.title}</h3>

              <div className="job-info">
                <p>🏢 {job.company}</p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💰 {job.salary}
                </p>
              </div>

              <p className="job-desc">
                {job.description}
              </p>

              <div className="job-buttons">
                <Link
                  to={`/job-details/${job._id}`}
                >
                  <button className="details-btn">
                    View Details
                  </button>
                </Link>

                <Link to="/apply">
                  <button className="apply-btn">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Jobs;