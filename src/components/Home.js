import React from "react";
import Sidebar from "./Sidebar";
import Task from "./Task";
import '../styles/Home.css'
import { useEffect, useCallback } from "react";
import axios from "axios";



const Home = ({language ,user ,tasks, isLogged, userId, loading, setTasks, setLoading, theme}) => {
  
  const getTasks = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://todo-danielamoroso31.b4a.run/${userId}/tasks`
      );
      if (response.status === 200) {
        console.log (userId)
        console.log(response.data.result)

        setTasks(response.data.result);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);


    }

  }, [setTasks, setLoading, userId]);

/*     const getTasks = async () => {
        try {
          const response = await axios.get(
            `https://todo-danielamoroso31.b4a.run/${userId}/tasks`
          );
          if (response.status === 200) {
            console.log (userId)
            console.log(response.data.result)
            
            setTasks(response.data.result);
         
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
    
        
    
        }
    
      }; */

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
        }, [getTasks]);
 

 
      return (
        <main className={theme === 'light' ?  "home-container-light" : "home-container-dark"}>
          {console.log(userId)}

{isLogged ?   <> <section   ><h1> {
     language === 'english' ? `Welcome ${user}!` : `Bienvenido ${user}!`}</h1>
    
        <Task
         language={language}
         userId={userId}
         logged={isLogged}
            tasks={tasks}
            loading={loading}
          
         />
       
    
     </section>
     <div className="sidebar-container">
      <Sidebar language={language} />
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