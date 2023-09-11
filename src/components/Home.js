import React from "react";

import Homepage from "./Homepage";
import PropTypes from "prop-types";
import "../styles/Home.css";

const Home = ({ language, user, isLogged, theme }) => {
  const homeConTheme =
    theme === "light" ? "home-container-light" : "home-container-dark";

  return (
    <main>
      {isLogged ? (
        <>
          <Homepage language={language} user={user} theme={theme} />
        </>
      ) : (
        <section className={homeConTheme}>
          <div className="mob-card">
            <div className="home-group">
              <h1>{language === "english" ? "Task Manager" : "Organizador"}</h1>
            </div>
            <div className="mob-card">
              <p>
                {language === "english"
                  ? "Organize your tasks and activities"
                  : "Organiza tus tareas y actividades"}
              </p>
            </div>
            <div className="mob-card">
              <p>
                {language === "english"
                  ? "Register or Log in and start organizing"
                  : "Registrate  o inicia sesion y comienza a organizar"}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

Home.propTypes = {
  language: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Home;
