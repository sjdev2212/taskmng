import React from "react";


import '../styles/Login.css'

const Login = ({ setIsLogged,
   onLogin,
    language, 
    handleSubmit,
  setEmail,
setpassword}) => {

const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };


  return (
  <main className="main-login">
    <section className="container-login" >
      {language === 'english' ? <h1 className="title-login"> Login</h1> : <h1 className="title-es">Iniciar Sesion </h1>}
 
      <form className="form-login">
        <div className="login-groups">
          <label htmlFor="email"> {language ==="spanish" ?  "Correo electronico" : "Email"  }</label>
          <input
            type="email"
            onChange={handleEmailChange}
            id="email"
            placeholder="Enter email"
            required
            title="Please enter a valid email address"
          />
        </div>
        <div className="login-groups">
          <label htmlFor="password">{language ==="spanish" ?  "Contraseña" : "Password"  }</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            id="password"
            placeholder="Enter password"
            required
            title="Please enter a valid password"
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
