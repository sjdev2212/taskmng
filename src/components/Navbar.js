import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Register from './Register';


const Navbar = () => {
  return (
    <>
        <nav className='navbar'>
            <div className="container">
                <p className="brand" >Task Manager</p>
            </div>

            <ul className='ul-btns'>
             <li> <Link to="/register" component={Register} >Register</Link></li>
             <li> <Link to="/login" component={Login} >Login</Link></li>
       
            </ul>
        </nav>
    </>
  )
}

export default Navbar