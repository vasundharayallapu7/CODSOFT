import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div className="logged-home">
        <h1>🎉 Welcome Back!</h1>

        <p>
          Ready to continue your learning
          journey?
        </p>

        <div className="home-actions">
          <Link to="/quizzes">
            <button>
              📚 Take Quiz
            </button>
          </Link>

          <Link to="/create">
            <button>
              ➕ Create Quiz
            </button>
          </Link>
        </div>

        <div className="dashboard-preview">
          <div className="preview-card">
            <h3>📚 Available Quizzes</h3>
            <p>
              Explore quizzes and improve
              your knowledge.
            </p>
          </div>

          <div className="preview-card">
            <h3>📝 Create Quizzes</h3>
            <p>
              Create custom quizzes for
              others to attempt.
            </p>
          </div>

          <div className="preview-card">
            <h3>🏆 Track Results</h3>
            <p>
              Get instant feedback and
              monitor your progress.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>ONLINE QUIZ MAKER</h1>

          <h2>Create, Share & Challenge</h2>

          <p>
            Build interactive quizzes, test
            your skills, and track your
            performance with instant
            feedback.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button className="primary-btn">
                Start Exploring
              </button>
            </Link>

            <Link to="/register">
              <button className="secondary-btn">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Learning Made Easy</h3>
            <p>
              Practice with interactive
              quizzes.
            </p>
          </div>

          <div className="feature-card">
            <h3>🎯 Smart Assessment</h3>
            <p>
              Get instant scores and
              feedback.
            </p>
          </div>

          <div className="feature-card">
            <h3>👥 Community Quizzes</h3>
            <p>
              Attempt quizzes created by
              others.
            </p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>
              Works on all devices.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2026 Online Quiz Maker
        </p>
      </footer>
    </div>
  );
}

export default Home;