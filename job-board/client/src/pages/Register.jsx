import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          📝
        </div>

        <h1>Create Account</h1>

        <p>
          Register to start applying for jobs
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

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="candidate">
              👨‍💼 Candidate
            </option>

            <option value="employer">
              🏢 Employer
            </option>
          </select>

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="register-link">
          Already have an account?{" "}
          <Link to="/login">
            Login Here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;