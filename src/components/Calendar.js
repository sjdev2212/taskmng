import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  /* "en-US": require("date-fns/locale/en-US"), */
  //eslint-disable-next-line
"es-ES": require("date-fns/locale/es")
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});



const Dater = ({language}) => {

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState("");

    function handleAddEvent() {
        
   
      
      setAllEvents([...allEvents, newEvent]);
  }
  return (
    <>
      <h1>{language === 'english' ?  'Calendar' : 'Calendario'}</h1>
           <h2>
           {language === 'english' ?  'Add Event' : 'Añadir Evento'}
           </h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px",marginTop:"10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <br />
                <br />
                <br />
                <br />

                
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    {language === 'english' ?  'Add Event' : 'Añadir Evento'}
                </button>
            </div>


       <div>
    <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor={"end"}  style={{ height: 465, margin: "2vw" }} />
        </div>
    </>
  ) 
        
}

Dater.propTypes = {
  language: PropTypes.string.isRequired,
};

export default Dater