import React, { useState } from 'react';
import '../styles/Calendar.css';

function Calendar() {
  const [date, setDate] = useState(new Date());

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
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
        <div key={`day-${i}`} className="day">
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

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <h1>
          {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
        </h1>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="parent">
        {renderCalendar()}
      </div>
    </div>
  );
}

export default Calendar;
