import React from "react";
import Sidebar from "./Sidebar";
import Task from "./Task";
import '../styles/Home.css'
import { useEffect } from "react";
import axios from "axios";



const Home = ({language ,user ,tasks, isLogged, userId, loading, setTasks, setLoading, theme}) => {
  const welcomeTheme = theme === 'light' ? 'welcomeText-light' : 'welcomeText-dark'
  const textTop = theme === 'light' ? 'text-top-light' : 'text-top-dark'
  const upperSection = theme === 'light' ? 'upper-section-light' : 'upper-section-dark'
  const getTasks = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/tasks`
    );
    console.log(userId)
    console.log(result.data.result)
    if (result.data.result === undefined) {
      setTasks([]);
      setLoading(false);
    }
    else{


      setTasks(result.data.result);
      setLoading(false);
    }

      
  };

useEffect(() => {
  
  getTasks();
   // eslint-disable-next-line 
}, [userId]);

 
      return (
        <main className={theme === 'light' ?  "home-container-light" : "home-container-dark"}>
        

{isLogged ?   <> <section  className={welcomeTheme}  > {
     language === 'english' ? (<div >
      <div className={textTop}>
        <div className={upperSection}>
        </div>
      <h1>Welcome to Task Manager {user}!</h1>
      </div>
      <h3>
      Organize your life with ease using our intuitive task manager. Whether it's for work, personal projects, or anything in between, we've got you covered. Say goodbye to forgetting important tasks and hello to productivity!
      </h3>
      <p>
      Key Features:
      </p>
      <ul>
<li>- Create tasks and set due dates.</li>
<li> Prioritize tasks to stay focused.</li>
<li>- Categorize tasks for better organization.</li>
<li>- Get reminders so you never miss a deadline.</li>
<li>- Collaborate with others by sharing tasks.</li>
</ul>
      <p>
      Get started now and take control of your tasks like never before. Your productive journey begins here!
      </p>
    </div>)
    
    
    :
    
    (<div >
       <div className={textTop}>
        <div className={upperSection}>

        </div>
      <h1>Bienvenido/a al Organizaor de Tareas {user}!</h1>
      </div>
      <h3>
      ¡Organiza tu vida con facilidad usando nuestro intuitivo gestor de tareas! Ya sea para el trabajo, proyectos personales o cualquier otra cosa, ¡estamos aquí para ayudarte! Di adiós a olvidar tareas importantes y di hola a la productividad.
      </h3>
      <p>
      Funciones principales:
      </p>
      <ul>
<li>- Crea tareas y establece fechas límite.</li>
<li>-Prioriza tareas para mantener el enfoque.</li>
<li>-Clasifica tareas para una mejor organización.</li>
<li>-Recibe recordatorios para nunca perder una fecha límite.</li>
<li>-Colabora con otros compartiendo tareas.</li>
</ul>
      <p>
      Comienza ahora y toma el control de tus tareas como nunca antes. ¡Tu jornada productiva comienza aquí!
      </p>
    </div>)

       }
    
     {/*    <Task
         language={language}
         userId={userId}
         logged={isLogged}
            tasks={tasks}
            loading={loading}
         getTasks={getTasks}
           
          
         />
        */}
    
       </section>
     <div >
      <Sidebar language={language}
      theme={theme}
       />
        </div>
        </>
     :
     <section className={theme === 'light' ? "home-mobile-light" : "home-mobile-dark"}  >
<div className="mob-card">
  <div className="home-group">
        <h1>
        {language === 'english' ? 'Task Manager' : 'Organizador'}
        </h1>
        </div>
<div className="mob-card">
        <p>
        {language === 'english' ? 'Organize your tasks and activities' : 'Organiza tus tareas y actividades'}
        </p>
        </div>
        <div className="mob-card">
        <p>
        {language === 'english' ? 'Register or Log in and start organizing' : 'Registrate  o inicia sesion y comienza a organizar'}
        </p>
        </div>
        </div>


     </section>
  




          

}
        </main>
    );
    }

export default Home;