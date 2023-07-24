import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Navbar.css";





const Navbar = ({ isLogged , isAuthenticated , handleLoginOut }) => {
  const navigate = useNavigate();

  const loggedOut = () => toast.success('You are logged out!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
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
          <p className="brand">Task Manager {isLogged ? "true" : "false"}{isAuthenticated() ?  "si" : "no"}</p>
        </div>

        <ul className="ul-btns">
          { isAuthenticated() ? (
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
