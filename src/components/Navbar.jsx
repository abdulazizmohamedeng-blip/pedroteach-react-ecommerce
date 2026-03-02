import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  let { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="./" className="navbar-brand">
          ShopHub
        </Link>
        <div className="navbar-links">
          <Link to="./" className="navbar-link">
            Home
          </Link>
          <Link to="./checkout" className="navbar-link">
            Checkout
          </Link>
        </div>
        <div className="navbar-auth">
          {!currentUser ? (
            <div className="navbar-auth-links">
              <Link to="auth" className="btn btn-primary">
                Login
              </Link>
              <Link to="auth" className="btn btn-secondary">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="navbar-greeting">
                Hello, {currentUser.email}
              </span>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
