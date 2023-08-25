import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = ({language, theme}) => {
  const sidebarTheme = theme === 'light' ? 'sidebar-container-light' : 'sidebar-container-dark'
  return (
    <>
        <div className={sidebarTheme}>
            <ul>
                <li>Home</li>
                <li>
                  <Link to="/tasks" >
                  Tasks
                  </Link>
                  </li>

                <li>Activities</li>
                <li>Calendar</li>
                <li>Settings</li>
            </ul>
            
        </div>
        
    </>
  )
}

export default Sidebar