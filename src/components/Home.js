import React from "react";
import Sidebar from "./Sidebar";
import Homepage from "./Homepage";
import PropTypes from 'prop-types';
import "../styles/Home.css";

const Home = ({
  language,
  user,
  isLogged,
  theme,
  isAuthenticated,
  handleLoginOut,
  handleColor,


}) => {

  return (
    <main
      className={
        theme === "light" ? "home-container-light" : "home-container-dark"
      }
    >
      {isLogged ? (
        <>
        
        
          <section>
            
         
            {language === "english" ? (
              <div >
                <div >
                  <div></div>
                  <h1>Welcome to Task Manager {user}!</h1>
                </div>
                <h3>
                  Organize your life with ease using our intuitive task manager.
                  Whether it&#39;s for work, personal projects, or anything in
                  between, we&#39;ve got you covered. Say goodbye to forgetting
                  important tasks and hello to productivity!
                </h3>
                <p>Key Features:</p>
                <ul>
                  <li>- Create tasks and set due dates.</li>
                  <li> Prioritize tasks to stay focused.</li>
                  <li>- Categorize tasks for better organization.</li>
                  <li>- Get reminders so you never miss a deadline.</li>
                  <li>- Collaborate with others by sharing tasks.</li>
                </ul>
                <p>
                  Get started now and take control of your tasks like never
                  before. Your productive journey begins here!
                </p>
              </div>
            ) : (
              <div >
                <div >
                  <div ></div>
                  <h1>Bienvenido/a al Organizador de Tareas {user}!</h1>
                </div>
                <h3>
                  ¡Organiza tu vida con facilidad usando nuestro intuitivo
                  gestor de tareas! Ya sea para el trabajo, proyectos personales
                  o cualquier otra cosa, ¡estamos aquí para ayudarte! Di adiós a
                  olvidar tareas importantes y di hola a la productividad.
                </h3>
                <p>Funciones principales:</p>
                <ul>
                  <li>- Crea tareas y establece fechas límite.</li>
                  <li>-Prioriza tareas para mantener el enfoque.</li>
                  <li>-Clasifica tareas para una mejor organización.</li>
                  <li>
                    -Recibe recordatorios para nunca perder una fecha límite.
                  </li>
                  <li>-Colabora con otros compartiendo tareas.</li>
                </ul>
                <p>
                  Comienza ahora y toma el control de tus tareas como nunca
                  antes. ¡Tu jornada productiva comienza aquí!
                </p>
              </div>
            )}
          </section>
          <div>
            <Sidebar language={language} theme={theme} />
          </div>
        </>
      ) : (
      /*   <section
          className={
            theme === "light" ? "home-mobile-light" : "home-mobile-dark"
          }
        >
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
        </section> */
        <div>
          <Homepage 
          language={language}
          theme={theme}
          isAuthenticated={isAuthenticated}
          handleLoginOut={handleLoginOut}
          handleColor={handleColor}
          

          
          />
        </div>
      )} 
    </main>
  );
};

Home.propTypes = {
  language: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLoginOut: PropTypes.func.isRequired,
  handleColor: PropTypes.func.isRequired,
  
};

export default Home;
