import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
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

      if (res.data.user.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          👨‍💼
        </div>

        <h1>Welcome Back</h1>

        <p>
          Login to access your dashboard
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

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register Here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;