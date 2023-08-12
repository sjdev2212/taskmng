import React from "react";
import Sidebar from "./Sidebar";
import Task from "./Task";
import '../styles/Home.css'
import { useEffect } from "react";
import axios from "axios";
import background from '../img/background.jpeg'


const Home = ({language ,user ,tasks, isLogged, userId, loading, setTasks, setLoading}) => {
  
  
    const getTasks = async () => {
        try {
          const response = await axios.get(
            `https://todo-danielamoroso31.b4a.run/${userId}/tasks`
          );
          if (response.status === 200) {
            console.log (userId)
            console.log(response.data)
            setTasks(response.data.result);
            console.log(tasks)
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
    
        
    
        }
    
      };

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
        }, [userId]);


 
      

    const backgroundStyle = {

        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '34vw',
        width: '91vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '2px solid #DA43F0',
        borderRadius: '15px',
        color: '#DA43F0',
        fontSize: '2.3vw',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px #000000',
        boxShadow: '2px 2px 4px #000000',
        margin: '2vw',
        opacity: '0.9',
        fontFamily: 'Arial, Helvetica, sans-serif',
        textAlign: 'center',
        padding: '2vw',
        marginTop: '2vw',

        '@media (max-width: 650px)': {
            height: '50vw',
            width: '91vw',
            fontSize: '5vw',
            border : 'none'
            
        }
    }





    return (
        <main className="home-container">

{isLogged ?   <> <section className="homepage" ><h1> {
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
     <section className="home-mobile"  >

        <h1>
        {language === 'english' ? 'Task Manager' : 'Organizador'}
        </h1>
        <p>
        {language === 'english' ? 'Organize your tasks and activities' : 'Organiza tus tareas y actividades'}
        </p>
        <p>
        {language === 'english' ? 'Register or Log in and start organizing' : 'Registrate  o inicia sesion y comienza a organizar'}
        </p>


     </section>
  




          

}
        </main>
    );
    }

export default Home;