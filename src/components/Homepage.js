import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "../styles/Navbar.css";
import ReactCountryFlag from "react-country-flag";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

import '../styles/Homepage.css'

const Homepage = ({

    isAuthenticated,
  handleLoginOut,
  handleLanguage,
  language,
  handleColor,
  theme

}

    
) => {


    const navigate = useNavigate();
 
  
    const toastTheme = theme === "light" ? "whitesmoke" : "gray";
    const toastColor = theme === "light" ? "black" : "whitesmoke";
  
    const loggedOut = () =>
      toast("Until next time", {
        duration: 3000,
        position: "top-center",
        style: {
          background: toastTheme,
          color: toastColor,
          height: "10vh",
          width: "35vh",
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "15px",
        },
        icon: "👏",
      });
    const deslogueado = () =>
      toast("Popoxima", {
        duration: 3000,
        position: "top-center",
        style: {
          background: toastTheme,
          color: toastColor,
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
      language === "english" ? loggedOut() : deslogueado();
      navigate("/");
    };
 
    const btnTheme = theme === "light" ? "btns-light" : "btns-dark";
    const brandTheme = theme === "light" ? "brand-light" : "brand-dark";
  
  return (
    <>
        <div className='homepage-container'>

            <div className='triangle'>
            <nav className={theme === "light" ? "navbar-light" : "navbar-dark"}>
        <div className="nav-container">
          <Link to="/" className={brandTheme}>
            {language === "english" ? (
              <p> Task Manager </p>
            ) : (
              <p> Administrador </p>
            )}
          </Link>
        </div>

        <ul className="ul-btns">
          {isAuthenticated() ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className={
                    theme === "light" ? "btn-logout-light" : "btn-logout-dark"
                  }
                >
                  {language === "english" ? " Log out " : " Cerrar sesión "}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={btnTheme}>
                  {language === "english" ? (
                    <p> Login </p>
                  ) : (
                    <p> Iniciar sesión </p>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/register" className={btnTheme}>
                  {language === "english" ? (
                    <p> Register </p>
                  ) : (
                    <p> Registrarse </p>
                  )}
                </Link>
              </li>
            </>
          )}
        </ul>
        <div>
          <select
            className={theme === "light" ? "select-light" : "select-dark"}
            onChange={handleLanguage}
          >
            <option value="spanish">
              <ReactCountryFlag countryCode="ES" />
            </option>
            <option value="english">
              <ReactCountryFlag countryCode="GB" />
            </option>
          </select>
        </div>

        <div>
          <button
            className={theme === "light" ? "btn-theme-light" : "btn-theme-dark"}
            onClick={handleColor}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </nav>
                <div 
className='homepage-img'   ></div>
                </div>
      </div>
      </>
      )
}
Homepage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    handleLoginOut: PropTypes.func.isRequired,
    handleLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    handleColor: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    };

export default Homepage