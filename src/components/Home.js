import React from "react";
import '../styles/Home.css'

const Home = ({language}) => {
    return (
        <main className="home-container">
          
     {language === 'english' ? <h1> Welcome!</h1> : <h1>Bienvenido!</h1>}
        
        </main>
    );
    }

export default Home;