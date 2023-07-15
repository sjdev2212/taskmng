import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  
  return (
    <>
      <BrowserRouter>
        <Navbar isLogged={isLogged} />
        <div className="container">
          <Routes>
            <Route path="register" element={<Register isLogged={isLogged} setIsLogged={setIsLogged}/>} />
            <Route path="login" element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />} />
          </Routes>

          <h1>TASK MANAGER APP</h1>
        </div>
      
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
