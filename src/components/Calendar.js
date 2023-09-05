import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Calendar.css';

function Calendar({language, theme}) {
  const [date, setDate] = useState(new Date());
  const today = date.getDate();

 
const calHeaderTheme = theme === 'light' ? 'calendar-header-light' : 'calendar-header-dark';
  const daysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const days = [];
    const daysCount = daysInMonth();
    const startDay = firstDayOfMonth();
    const dayNames = language === 'english'?  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

 

    for (let i = 0; i < dayNames.length; i++) {
      days.push(
        <div key={`day-name-${i}`} className="day-header">
          {dayNames[i]}
        </div>
      );
    }

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="d"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div  id='day' 
    
          key={`day-${i}`}
           className={today === i ? 'day-today' : 'day'}>
         
         {i}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const options = language === 'english' ? 'default': 'es';




  return (
    <div className="calendar">
      <div className={calHeaderTheme}>
        <button onClick={handlePrevMonth}>{language === 'english' ? 'Previous' : 'Anterior'}</button>
        <h1>
      
          {date.toLocaleString(options, { month: 'long' })} {date.getFullYear()}
        </h1>
        <button onClick={handleNextMonth}>{language ==='english' ?  'Next' : 'Siguiente'}</button>
      </div>
      <div className="parent">
        {renderCalendar()}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Calendar;
