import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>

          <h1>TASK MANAGER APP</h1>
        </div>
      
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
