import { Link } from "react-router-dom";

function FeaturedJobs() {
  return (
    <section className="jobs">

      <h2>Featured Jobs</h2>

      <div className="job-container">

        <div className="job-card">
          <h3>Frontend Developer</h3>

          <p>Google</p>

          <Link to="/jobs">
            <button>
              Apply Now
            </button>
          </Link>
        </div>

        <div className="job-card">
          <h3>Backend Developer</h3>

          <p>Microsoft</p>

          <Link to="/jobs">
            <button>
              Apply Now
            </button>
          </Link>
        </div>

        <div className="job-card">
          <h3>Full Stack Developer</h3>

          <p>Amazon</p>

          <Link to="/jobs">
            <button>
              Apply Now
            </button>
          </Link>
        </div>

      </div>

    </section>
  );
}

export default FeaturedJobs;