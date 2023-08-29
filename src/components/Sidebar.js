import React from 'react'
import Proptypes from 'prop-types'
import {Link} from 'react-router-dom'
import {BsCalendar3} from 'react-icons/bs'
import {FaTasks} from 'react-icons/fa'
import '../styles/Sidebar.css'

const Sidebar = ({language, theme}) => {
  const sidebarTheme = theme === 'light' ? 'sidebar-container-light' : 'sidebar-container-dark'
  const ulTheme = theme === 'light' ? 'ul-theme-light' : 'ul-theme-dark'
  const calIconTheme = theme === 'light' ? 'cal-icon-light' : 'cal-icon-dark'
  const taskIconTheme = theme === 'light' ? 'task-icon-light' : 'task-icon-dark'

  return (
    <>
        <div className={sidebarTheme}>
            <ul className={ulTheme}>
                
                  <Link className='link' to="/tasks" >
                <li  >
                  {language === 'english' ? 'Tasks' : 'Tareas'}
                 <div className={taskIconTheme}>
                    <FaTasks/>
                    </div>
                  </li>
                  </Link>

                  <Link className='link' to="/bills" >
                <li>
                {language === 'english' ? 'Bills $ Payments' : 'Facturas $ Pagos'}
                   </li>
                  </Link>
                <Link className='link' to="/calendar" >
                <li>
                  {language === 'english' ? 'Calendar' : 'Calendario'}
                  <div className={calIconTheme}>
                <BsCalendar3/>
                  </div>
                </li>
                  </Link>
               
            </ul>
            
        </div>
        
    </>
  )
}

Sidebar.propTypes = {
  language: Proptypes.string.isRequired,
  theme: Proptypes.string.isRequired
}


export default Sidebar