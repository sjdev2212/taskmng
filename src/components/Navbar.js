import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "../styles/Navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import ReactCountryFlag from "react-country-flag";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const Navbar = ({
  isAuthenticated,
  handleLoginOut,
  handleLanguage,
  language,
  handleColor,
  theme,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toastTheme = theme === "light" ? "whitesmoke" : "gray";
  const toastColor = theme === "light" ? "black" : "whitesmoke";
  const dateTheme = theme === "light" ? "date-light" : "date-dark";

  const getCurrentMonthAndDay = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' }); // Get short month name
    const day = currentDate.getDate(); // Get day of the month
    return `${month} ${day}`;
  };


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
  const handleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  const btnTheme = theme === "light" ? "btns-light" : "btns-dark";
  const brandTheme = theme === "light" ? "brand-light" : "brand-dark";

  return (
    <>
      <nav className="navbar-mobile">
        <IconContext.Provider value={{ size: 40, style: { color: "#DA43F0" } }}>
          <div>
            <span
              className={showMenu ? "hide-hamb" : "show-hamb"}
              onClick={handleMenu}
              size={30}
              style={{ fill: "black" }}
            >
              <AiOutlineMenu />
            </span>

            <div className={theme === "light" ? "select-light" : "select-dark"}>
              <select onChange={handleLanguage}>
                <option value="spanish">
                  <ReactCountryFlag countryCode="ES" />
                </option>
                <option value="english">
                  <ReactCountryFlag countryCode="GB" />
                </option>
              </select>
            </div>
          </div>
        </IconContext.Provider>
        <section className={showMenu ? "menu-section" : "menu-section-hide"}>
          <ul className="ul-btns">
            {isAuthenticated() ? (
              <>
                <li className="li-btns">
                  <button onClick={handleLogout} className="logout-btn">
                    {language === "english" ? (
                      <p> Log out </p>
                    ) : (
                      <p> Cerrar sesión </p>
                    )}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="li-btns">
                  <Link to="/login" className="btns-light">
                    {language === "english" ? (
                      <p> Login </p>
                    ) : (
                      <p> Iniciar sesión </p>
                    )}
                  </Link>
                </li>
                <li className="li-btns">
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
            <span
              className={showMenu ? "show-hamb" : "hide-hamb"}
              onClick={handleMenu}
            >
              <AiOutlineClose />
            </span>
          </div>
        </section>
      </nav>
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
            <li className={dateTheme}> <p>
                {language === "english" ? "Today is" : "Hoy es"}
           <span> {getCurrentMonthAndDay()}</span>
              </p>              
            </li>
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
    </>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  handleLoginOut: PropTypes.func.isRequired,
  handleLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  handleColor: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Navbar;
