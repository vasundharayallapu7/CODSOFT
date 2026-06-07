import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      // Redirect to Home Page
      window.location.href = "/";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <h1>🎯 Online Quiz Maker</h1>

        <h2>Learn • Practice • Challenge</h2>

        <p>
          Create interactive quizzes,
          test your knowledge, and get
          instant feedback anytime,
          anywhere.
        </p>

        <div className="auth-features">
          <div>
            ✅ Create Custom Quizzes
          </div>
          <div>
            ✅ Attempt Unlimited Quizzes
          </div>
          <div>
            ✅ Instant Results
          </div>
          <div>
            ✅ Secure Authentication
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="form-card">
          <h2>Welcome Back 👋</h2>

          <p className="form-subtitle">
            Login to continue
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">
              Login
            </button>
          </form>

          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;