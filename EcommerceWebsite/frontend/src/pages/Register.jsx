import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card p-4">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control mb-3"
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  onChange={handleChange}
                  required
                />

                <button
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>

              <p className="mt-3 text-center">
                Already have an account?
                <Link to="/login">
                  {" "}Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;