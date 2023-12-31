import React, { useState, useEffect } from "react";
import "./App.css";
import {Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import AddTask from "./components/AddTask.js";
import Task from "./components/Task.js";
import Home from "./components/Home.js";
import EditTask from "./components/EditTask.js";
import EditBill from "./components/EditBill.js";
import Bills from "./components/Bills.js";
import Calendar from "./components/Calendar.js";
import { Toaster, toast } from "react-hot-toast";
import { useIdleTimer } from "react-idle-timer";




function App() {
 
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [language, setLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isIdle, setIsIdle] = useState(false);
  const [bills, setBills] = useState([]);
  
 const navigate = useNavigate();

  const handleOnIdle = () => {
    setIsIdle(true);
    handleLoginOut();
    navigate("/");
   
  };

  const handleOnActive = () => {
    setIsIdle(false);
   
  };
 // eslint-disable-next-line 
const controlIdle =  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  })


  useEffect(() => {
    // Check if a token is stored in browser storage or cookies
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");
    if (storedToken) {
      setToken(storedToken);
      setUserName(storedUserName);
      setUserId(storedId);
      setIsLogged(true);
     
    }
  }, [language, theme,isIdle]);

  const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
  const toastColor = theme === 'light' ? 'black' : 'whitesmoke'

  const handleLogin = (token) => {
    setToken(token); // Save the token in the state when the user logs in.
  };

  const handleLanguage = (e) => {
    if (e.target.value === "english") {
      setLanguage("english");
    } else setLanguage("spanish");
  };

  const handleColor = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#333333";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#E0E0E0";
    }
  };

  const logged = () =>
    toast("You are logged in", {
      duration: 3000,
      position: "top-center",
      style: {
        background: toastTheme,
        color: toastColor,
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "👏",
    });
  const logueado = () =>
    toast("Estas logueado", {
      duration: 3000,
      position: "top-center",
      style: {
        background: toastTheme,
        color: toastColor,
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "👏",
    });
  const noUsuario = () =>
    toast("No existe usuario con ese email", {
      duration: 3000,
      position: "top-center",
      style: {
        background: toastTheme,
        color: toastColor,
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
    });
  const noUser = () =>
    toast("No user with the email provided", {
      duration: 3000,
      position: "top-center",
      style: {
        background: toastTheme,
        color: toastColor,
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
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
        const username = response.data.user;
        const id = response.data.id;
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("id", id);
        handleLogin(token);
        setIsLogged(true);
        language === "english" ? logged() : logueado();
        navigate("/");
        setUserName(username);
        setUserId(id);
      }
    } catch (error) {
   
      language === "english" ? noUser() : noUsuario();
    }
  };

  const handleLoginOut = () => {
    setToken(null);
    setIsLogged(false);
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id"); // Clear the token from the state when the user logs out.
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


  return (
  
    <>
  
      <Navbar
      data-testid="navbar"
        isLogged={isLogged}
        isAuthenticated={isAuthenticated}
        handleLoginOut={handleLoginOut}
        handleLanguage={handleLanguage}
        language={language}
        handleColor={handleColor}
        theme={theme}
     
      />
      <Routes>

        <Route
          path="/"
          element={
            <Home
              language={language}
              user={userName}
              isLogged={isLogged}
              tasks={tasks}
              loading={loading}
              setTasks={setTasks}
              userId={userId}
              setUserId={setUserId}
              setLoading={setLoading}
              theme={theme}
            />
          }
        />
        <Route
          path="register"
          element={<Register language={language} theme={theme} />}
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
              theme={theme}
            />
          }
        />
        <Route
          path="/addtask"
          element={<AddTask 
            userId={userId}  
            language={language}
            theme={theme}
         
         
             />}
        />
        <Route 
        path="/tasks"
        element={<Task
          language={language}
          userId={userId}
          logged={isLogged}
              tasks={tasks}
              loading={loading}
              setTasks={setTasks}
              setLoading={setLoading}
              theme={theme}
        
        />
        }
        />
        <Route
          path="/edit-task/:taskId"
          element={<EditTask
            language={language}
            userId={userId}
            theme={theme}
            />}
        />
   
        

        <Route
          path="/bills"
          element={<Bills
            language={language}
            theme={theme}
            userId={userId}
            bills={bills}
            setBills={setBills}
            loading={loading}
            setLoading={setLoading}
          
          
          />}
        />
        <Route
          path="/calendar"
          element={<Calendar
            language={language}
            theme={theme}
            userId={userId}
           />}
        />
         <Route
          path="/edit-bill/:billId"
          element={<EditBill
            language={language}
            userId={userId}
            theme={theme}
            />}
        />
   
 

        
      </Routes>



      <Toaster />
    </>
  );
}

export default App;
