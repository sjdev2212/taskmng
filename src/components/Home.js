import React from "react";
import '../styles/Home.css'

const Home = ({language ,user ,logged }) => {
    return (
        <main className="home-container">

{logged ?    <section ><h1> {
     language === 'english' ? `Welcome ${user}!` : `Bienvenido ${user}!`}</h1>
     </section>
     :
     <section className="homepage">

        <h1>
        {language === 'english' ? 'Task Manager' : 'Organizador'}
        </h1>
     </section>
  




          

}
        </main>
    );
    }

export default Home;