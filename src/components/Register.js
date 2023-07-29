import React from "react";
import { useState } from "react";
import  {useNavigate} from "react-router-dom";
import axios from "axios";
import '../styles/Register.css'

function Register({language}) {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://todo-danielamoroso31.b4a.run/register", data)
      .then((response) => {
        if (response.status === 200) {
          alert("You are registered");
          navigate("/home");
        } 
        if (response.status === 409) {
          alert("User already exists");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


      

      





  return (
    <main className="main-register">
      <section className="container-register" >
        <h1 className="register-title"> 
        {language === 'english' ? 'Register' : 'Registrarse'}
        </h1>
     
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="register-groups">
            <label htmlFor="email">
              {language === 'english' ? 'Email' : 'Correo electrónico'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="register-groups">
            <label htmlFor="password">
              {language === 'english' ? 'Password' : 'Contraseña'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="register-btn" type="submit">
            {language === 'english' ? 'Register' : 'Registrarse'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
