import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-text">

          <h4>🚀 4500+ Jobs Available</h4>

          <h1>Find Your Dream Job Today</h1>

          <p>
            Explore thousands of opportunities from
            leading companies and take the next step
            in your career.
          </p>

          <div className="hero-buttons">

            <Link to="/jobs">
              <button className="browse-btn">
                Browse Jobs
              </button>
            </Link>

            <Link to="/apply">
              <button className="hero-btn">
                Upload Resume
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-image">
          <img
            src={heroImage}
            alt="Professional Woman Working"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;