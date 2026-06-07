import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

      window.location.href = "/login";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>🚀 Join Quiz Maker</h1>

        <p>
          Create quizzes, challenge
          friends, and improve your
          knowledge every day.
        </p>
      </div>

      <div className="auth-right">
        <div className="form-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;