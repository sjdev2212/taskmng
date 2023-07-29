import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [language, setLanguage] = useState('')
  const handleLogin = (token) => {
    setToken(token); // Save the token in the state when the user logs in.
  };
  const handleLanguage = (e) => {
    console.log(language)
    if (e.target.value === 'english') {
      setLanguage('english')
    }
   else
    setLanguage('spanish')
  }

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
  }, [language]);





  return (
    <>
      <BrowserRouter>
        <Navbar
          isLogged={isLogged}
          isAuthenticated={isAuthenticated}
          handleLoginOut={handleLoginOut}
          handleLanguage={handleLanguage}
          language={language}
        />


        <Routes>
          <Route path="/" element={<Home  
          language={language}
          />} />
          <Route
            path="register"
            element={
            <Register 
             isLogged={isLogged} 
             setIsLogged={setIsLogged}
             language={language}
              />}
             
           
            />

          <Route
            path="login"
            element={
              <Login
                isLogged={isLogged}
                onLogin={handleLogin}
                setIsLogged={setIsLogged}
                language={language}
              />
            }
          />
        </Routes>
       
  <Toaster />

      </BrowserRouter>
    </>
  );
}

export default App;
