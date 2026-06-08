import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          ShopEZ
        </Link>

        <div>

          <Link
            to="/"
            className="btn btn-secondary me-2"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-light me-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-warning"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/orders"
                className="btn btn-success me-2"
              >
                My Orders
              </Link>

              <Link
                to="/cart"
                className="btn btn-info me-2"
              >
                Cart
              </Link>

              <button
                onClick={logout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;