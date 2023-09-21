import React from 'react'
import Sidebar from "./Sidebar.js" ;
import "../styles/Homepage.css";
import PropTypes from 'prop-types';


const Homepage = ({language,user,theme}) => {

    const welcomeTheme =
    theme === "light" ? "welcomeText-light" : "welcomeText-dark";
    const homepageTheme = theme === "light" ? "homepage-container-light" : "homepage-container-dark";
  return (
    <div>
        <main className='main-cont'>
    <section className={homepageTheme}>
         
         {language === "english" ? (
           <div className={welcomeTheme}>
            
               
               <h1>Welcome to Task Manager {user}!</h1>
             
             <h3>
               Organize your life with ease using our intuitive task manager.
               Whether it&#39;s for work, personal projects, or anything in
               between, we&#39;ve got you covered. Say goodbye to forgetting
               important tasks and hello to productivity!
             </h3>
             <p>Key Features:</p>
             <ul className='ul'>
               <li>Create tasks and set due dates.</li>
               <li>Prioritize tasks to stay focused.</li>
               <li>Categorize tasks for better organization.</li>
               <li>Get reminders so you never miss a deadline.</li>
               <li>Collaborate with others by sharing tasks.</li>
             </ul>
             <p>
               Get started now and take control of your tasks like never
               before. Your productive journey begins here!
             </p>
           </div>
         ) : (
           <div data-testid="homepage"
            className={welcomeTheme}>
          
           
               <h1>Bienvenido/a al Organizador de Tareas {user}!</h1>
           
             <h3>
               ¡Organiza tu vida con facilidad usando nuestro intuitivo
               gestor de tareas! Ya sea para el trabajo, proyectos personales
               o cualquier otra cosa, ¡estamos aquí para ayudarte! Di adiós a
               olvidar tareas importantes y di hola a la productividad.
             </h3>
             <p>Funciones principales:</p>
             <ul className='ul'>
               <li>Crea tareas y establece fechas límite.</li>
               <li>Prioriza tareas para mantener el enfoque.</li>
               <li>Clasifica tareas para una mejor organización.</li>
               <li>Recibe recordatorios para nunca perder una fecha límite.
               </li>
               <li>Colabora con otros compartiendo tareas.</li>
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
       </main>

    </div>
  )
}
Homepage.propTypes = {
    language: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    };


export default Homepage