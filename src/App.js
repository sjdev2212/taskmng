import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token); // Save the token in the state when the user logs in.
  };

  const handleLoginOut = () => {
    setToken(null);
    setIsLogged(false); // Clear the token from the state when the user logs out.
  };
  // Function to check if the user is authenticated using the token.
  const isAuthenticated = () => {
    return !!token;
  };
  // Axios interceptor to attach the token to every request if the user is authenticated.
  axios.interceptors.request.use((config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    // Check if a token is stored in browser storage or cookies
    const storedToken = localStorage.getItem("token"); // Or document.cookie for HttpOnly cookies

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar
          isLogged={isLogged}
          isAuthenticated={isAuthenticated}
          handleLoginOut={handleLoginOut}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="register"
            element={
            <Register 
             isLogged={isLogged} 
             setIsLogged={setIsLogged} />}
            />

          <Route
            path="login"
            element={
              <Login
                isLogged={isLogged}
                onLogin={handleLogin}
                setIsLogged={setIsLogged}
              />
            }
          />
        </Routes>
       <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
