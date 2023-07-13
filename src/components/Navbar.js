import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='navbar'>
            <div className="container">
                <p className="brand" >Task Manager</p>
            </div>
            <ul className='ul-btns'>
                <li>Login</li>
                <li>Register</li>
                
            </ul>
        </nav>
    </>
  )
}

export default Navbar