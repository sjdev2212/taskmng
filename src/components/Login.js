import React from "react";
import '../styles/Login.css'

const Login = ({ setIsLogged,
   onLogin,
    language, 
    handleSubmit,
  setEmail,
setpassword, 
theme}) => {

const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };
const themeClass = theme === 'light' ? 'container-login-light' : 'container-login-dark'
const titleTheme = theme === 'light' ? 'title-login-light' : 'title-login-dark'
const labelTheme = theme === 'light' ? 'label-light' : 'label-dark'
const btnTheme = theme === 'light' ? 'login-btn-light' : 'login-btn-dark'

  return (
  <main className="main-login">
    <section className={themeClass} >
      {language === 'english' ? <h1 className={titleTheme}> Login</h1> : <h1 className={titleTheme}>Iniciar Sesion </h1>}
 
      <form className="form-login">
        <div className="login-groups">
          <label className={labelTheme} htmlFor="email"> {language ==="spanish" ?  "Correo electronico" : "Email"  }</label>
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
          <label className={labelTheme} htmlFor="password">{language ==="spanish" ?  "Contraseña" : "Password"  }</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            id="password"
            placeholder="Enter password"
            required
            title="Please enter a valid password"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className={btnTheme}>
          {language ==="spanish" ?  "Iniciar Sesion" : "Login"  }
        </button>
      </form>
      </section>

      </main>
    
  );
};

export default Login;
