import React from "react";
import Sidebar from "./Sidebar";
import '../styles/Home.css'
import background from '../img/background.jpeg'


const Home = ({language ,user ,logged }) => {
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
    }



    return (
        <main className="home-container">
{console.log('logged',logged)}
{logged ?    <section ><h1> {
     language === 'english' ? `Welcome ${user}!` : `Bienvenido ${user}!`}</h1>
     <Sidebar language={language} />
     </section>
     :
     <section style={backgroundStyle}>

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