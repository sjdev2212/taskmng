import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import {AiOutlineClose} from "react-icons/ai";
import { IconContext } from "react-icons";
import ReactCountryFlag from "react-country-flag"
const Navbar = ({ isLogged, isAuthenticated, handleLoginOut ,handleLanguage, language }) => {
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
        <IconContext.Provider value={{ size: 40, style: { color: '#DA43F0' } }} >
      <div >
          <span className={showMenu ? "hide-hamb" : "show-hamb"} onClick={handleMenu} size={30} style={{ fill: 'black' }} > 
            <AiOutlineMenu />
          </span>
        <div>
          <select className="select" onChange={handleLanguage}>
            <option value="spanish">      
            
            <ReactCountryFlag countryCode="ES" 
      />
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
          {language === 'english' ? <p> Log out </p> : <p> Cerrar sesión </p>}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="li-btns">
                <Link to="/login" className="btns">
                 {language === 'english' ? <p> Login </p> : <p> Iniciar sesión </p>}
                </Link>
              </li>
              <li className="li-btns">
                <Link to="/register" className="btns">
                  {language === 'english' ? <p> Register </p> : <p> Registrarse </p>}
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
          <p className="brand"> 
          {language === 'english' ? <p> Task Manager </p> : <p> Administrador </p>}
          </p>
        </div>

        <ul className="ul-btns">
          {isAuthenticated() ? (
            <>
              <li className="li-btns">
                <button onClick={handleLogout} className="btns">
                  {language === 'english' ? <p> Log out </p> : <p> Cerrar sesión </p>}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="li-btns">
                <Link to="/login" className="btns">
               {language === 'english' ? <p> Login </p> : <p> Iniciar sesión </p>}
                </Link>
              </li>
              <li className="li-btns">
                <Link to="/register" className="btns">
                  {language === 'english' ? <p> Register </p> : <p> Registrarse </p>}
                </Link>
              </li>
            </>
          )}
        </ul> 
        <div>
          <select className="select" onChange={handleLanguage}>
            <option value="spanish">
            <ReactCountryFlag countryCode="ES" 
      />
            </option>
            <option value="english">
            <ReactCountryFlag countryCode="GB" />
            </option>
            </select>
        </div>

      </nav>
    </>
  );
};

export default Navbar;
