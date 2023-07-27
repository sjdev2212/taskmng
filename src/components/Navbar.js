import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Navbar.css";

const Navbar = ({ isLogged, isAuthenticated, handleLoginOut }) => {
  const navigate = useNavigate();

  const loggedOut = () =>
    toast("Until next time", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#3450A1",
        color: "#DA43F0",
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "👏",
    });
  const handleLogout = () => {
    localStorage.removeItem("token");
    handleLoginOut();
    loggedOut();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <p className="brand">Task Manager </p>
        </div>

        <ul className="ul-btns">
          {isAuthenticated() ? (
            <>
              <li className="li-btns">
                <button onClick={handleLogout} className="btns">
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="li-btns">
                <Link to="/login" className="btns">
                  Login
                </Link>
              </li>
              <li className="li-btns">
                <Link to="/register" className="btns">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
