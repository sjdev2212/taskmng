import React, { useState } from 'react';
import Calendar from 'react-calendar';

import "../styles/Calendar.css";

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className='calendar-container'>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
}

export default MyCalendar;
