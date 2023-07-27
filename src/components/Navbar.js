import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import {AiOutlineClose} from "react-icons/ai";


const Navbar = ({ isLogged, isAuthenticated, handleLoginOut }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

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
  const handleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };


  return (
    <>
      <nav className="navbar-mobile">
      <div >
          <span className={showMenu ? "hide-hamb" : "show-hamb"} onClick={handleMenu}> 
            <AiOutlineMenu />
          </span>
        
        </div>
        <section className={showMenu ? "menu-section" : "menu-section-hide"}>
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
        <div>
        <span className={showMenu ? "show-hamb" : "hide-hamb"} onClick={handleMenu}>
            <AiOutlineClose />
          </span>
        </div>

            </section>
      </nav>
      <nav className="navbar">
      
      <div className="nav-container">
          <p className="brand"> Task Manager </p>
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
