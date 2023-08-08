import "./App.css";
import {  Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [language, setLanguage] = useState('')
  const [email, setEmail] = useState("");
const [password, setpassword] = useState("");
const [userName, setUserName] = useState("");
const [userId , setUserId] = useState('')

 const navigate = useNavigate();
  const handleLogin = (token) => {
    setToken(token); // Save the token in the state when the user logs in.

  };
  const handleLanguage = (e) => {
    if (e.target.value === 'english') {
      setLanguage('english')
    }
   else
    setLanguage('spanish')
  }



  const logged = () => toast(  'You are logged in', {
    duration: 3000,
    position: 'top-center',
    style: {
      background: "#3450A1",
      color: "#DA43F0",
      height: "10vh",
      width: "35vh",
      fontSize: "1.2rem",
      fontWeight: "bold",
      borderRadius: "15px",
    },
  icon: '👏',
});
const logueado = () => toast(  'Estas logueado', {
  duration: 3000,
  position: 'top-center',
  style: {
    background: "#3450A1",
    color: "#DA43F0",
    height: "10vh",
    width: "35vh",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderRadius: "15px",
  },
icon: '👏',
});
const noUsuario = () => toast(  'No existe usuario con ese email', {
  duration: 3000,
  position: 'top-center',
  style: {
    background: "#3450A1",
    color: "#DA43F0",
    height: "10vh",
    width: "35vh",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderRadius: "15px",
  },

});
const noUser = () => toast(  'No user with the email provided', {
  duration: 3000,
  position: 'top-center',
  style: {
    background: "#3450A1",
    color: "#DA43F0",
    height: "10vh",
    width: "35vh",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderRadius: "15px",
  }
});


const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://todo-danielamoroso31.b4a.run/login",
      {
        email,
        password,
      }
    );
    if (response.status === 200) {
     
      const username = response.data.user
      const id = response.data.id
      const { token } = response.data;
      localStorage.setItem("token", token);
      handleLogin(token);
      setIsLogged(true);
      language === 'english' ? logged() : logueado()
      navigate("/home");
      setUserName(username)
      setUserId(id)
      

    
    }
  } catch (error) {

    console.error(error);
    language === 'english' ? noUser() : noUsuario()
  }
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
      setIsLogged(true);
    }
  }, [language]);





  return (
    <>
     
        <Navbar
          isLogged={isLogged}
          isAuthenticated={isAuthenticated}
          handleLoginOut={handleLoginOut}
          handleLanguage={handleLanguage}
          language={language}
        />


        <Routes>
          <Route path="/home" element={<Home  
          language={language}
          user={userName}
          isLogged={isLogged}
          userId={userId}
          token={token}
          setIsLogged={setIsLogged}
          setToken={setToken}
          />} />
          <Route
            path="register"
            element={
            <Register 
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
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setpassword={setpassword}

              />
            }
          />
          <Route path="/addtask" element={<AddTask
          userId={userId}
          language={language}
          />} />
        </Routes>
       
  <Toaster />

    
    </>
  );
}

export default App;
