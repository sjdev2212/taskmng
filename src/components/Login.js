import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

import '../styles/Login.css'

const Login = ({ setIsLogged, onLogin, language }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");


  const navigate = useNavigate();

  const logged = () => toast(  'You are logged in', {
    duration: 3000,
    position: 'top-center',
    style: {
      background: "#3450A1",
      color: "#DA43F0",
      height: "10vh",
      width: "35vh",
      fontSize: "1.2rem",
      fontWeight: "bold",
      borderRadius: "15px",
    },
  icon: '👏',
});
const logueado = () => toast(  'Estas logueado', {
  duration: 3000,
  position: 'top-center',
  style: {
    background: "#3450A1",
    color: "#DA43F0",
    height: "10vh",
    width: "35vh",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderRadius: "15px",
  },
icon: '👏',
});




  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-danielamoroso31.b4a.run/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      onLogin(token);
      language === 'english' ? logged() : logueado()
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <main className="main-login">
    <section className="container-login" >
      {language === 'english' ? <h1 className="title-login"> Login</h1> : <h1 className="title-es">Iniciar Sesion </h1>}
 
      <form className="form-login">
        <div className="login-groups">
          <label htmlFor="email"> {language ==="spanish" ?  "Correo" : "Email"  }</label>
          <input
            type="email"
            onChange={handleEmailChange}
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="login-groups">
          <label htmlFor="password">{language ==="spanish" ?  "Contraseña" : "Password"  }</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            id="password"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="login-btn">
          {language ==="spanish" ?  "Iniciar Sesion" : "Login"  }
        </button>
      </form>
      </section>

      </main>
    
  );
};

export default Login;
