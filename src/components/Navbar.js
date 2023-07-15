import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Register from './Register';


const Navbar = ({isLogged}) => {
  return (
    <>
        <nav className='navbar'>
            <div className="container">
                <p className="brand" >Task Manager {isLogged?  'true' : 'false'}</p>
            </div>

            <ul className='ul-btns'>
            {isLogged ? <li> <Link to="/login" component={Login} >Logout</Link></li> : null
            }
           
            </ul>
        </nav>
    </>
  )
}

export default Navbar