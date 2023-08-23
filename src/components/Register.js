import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/Register.css";

function Register({ language, theme }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const toastTheme = theme === 'light' ? 'whitesmoke' : 'gray'
const toastColor = theme === 'light' ? 'black' : 'whitesmoke'
const registerTheme = theme === 'light' ? 'container-register-light' : 'container-register-dark'
const registerTitle = theme === 'light' ? 'register-title-light' : 'register-title-dark'
const registerLabels = theme === 'light' ? 'register-labels-light' : 'register-labels-dark'
const registerBtn = theme === 'light' ? 'register-btn-light' : 'register-btn-dark'


  const registered = () =>
    toast("You are now registered. Please Log in", {
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
      icon: "✔️",
    });
  const registrado = () =>
    toast("Ahora estas registrado. Por favor inicia sesion", {
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
      icon: "✔️",
    });

  const userExists = () =>
    toast(
      "There is a user already registered with that email. please enter a different one or login",
      {
        duration: 3000,
        position: "top-center",
        style: {
          background: toastTheme,
          color: toastColor,
          height: "10vh",
          width: "50vh",
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "15px",
        },
        icon: "⚠️",
      }
    );
  const existeUsuario = () =>
    toast(
      "Ya hay una cuenta registrada con ese correo, por favor usa uno diferente o inicia sesion",
      {
        duration: 3000,
        position: "top-center",
        style: {
          background: toastTheme,
          color: toastColor,
          height: "10vh",
          width: "50vh",
          fontSize: "1.1rem",
          fontWeight: "bold",
          borderRadius: "15px",
        },
        icon: "⚠️",
      }
    );

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: userName,
      email: email,
      password: password,
    };

    axios
      .post("https://todo-danielamoroso31.b4a.run/register", data)
      .then((response) => {
        if (response.status === 200) {
          language === "english" ? registered() : registrado();
          navigate("/login");
        }
        if (response.status === 201) {
          navigate("/register");
          language === "english" ? userExists() : existeUsuario();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="main-register">
      <section className={registerTheme}>
        <h1 className={registerTitle}>
          {language === "english" ? "Register" : "Registrarse"}
        </h1>

        <form className="form-register" onSubmit={handleSubmit}>
          <div className="register-groups">
            <label htmlFor="username" className={registerLabels}>
              {language === "english" ? "Username" : "Nombre de usuario"}
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div className="register-groups">
            <label htmlFor="email"  className={registerLabels}>
              {language === "english" ? "Email" : "Correo electrónico"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="register-groups">
            <label htmlFor="password"  className={registerLabels}>
              {language === "english" ? "Password" : "Contraseña"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              pattern=".{6,}"
              title="Password must be at least 6 characters long."
            />
          </div>
          <button className={registerBtn} type="submit">
            {language === "english" ? "Register" : "Registrarse"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
