import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>JobBoard</h2>

      <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;