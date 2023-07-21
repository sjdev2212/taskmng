import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setIsLogged, onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const logged = () => toast.success('Welcome you are logged in!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        };

    const handlePasswordChange = (event) => {
            setpassword(event.target.value);
            };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://todo-danielamoroso31.b4a.run/login", {
                email,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            setIsLogged(true);
            onLogin(token);
            logged();
            navigate("/");
        } catch (error) {

            console.error(error);
        }
    };

            
                

  return (
<>
<form onSubmit={handleSubmit}>
    <div>    
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleEmailChange} id="email" placeholder="Enter email" />
    </div>
    <div >
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handlePasswordChange} id="password" placeholder="Enter password" />
    </div>
    <button type="submit" className="">Login</button>
  
</form>

</>
  )
}

export default Login