import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <h2>Online Quiz Maker</h2>

      <div>
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/create">Create Quiz</Link>

            <button
              onClick={handleLogout}
              style={{
                width: "auto",
                padding: "8px 15px",
                marginLeft: "10px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;