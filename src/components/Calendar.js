import React from "react";
import { useState } from "react";
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



const Dater = () => {

  const [newEvent, setNewEvent] = useState({ title: "", start: "" });
    const [allEvents, setAllEvents] = useState("");

    function handleAddEvent() {
        
   
      
      setAllEvents([...allEvents, newEvent]);
  }
  return (
    <>
      <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>


       <div>
    <Calendar localizer={localizer} events={allEvents} startAccessor="start"  style={{ height: 465, margin: "2vw" }} />
        </div>
    </>
  ) 
        
}

export default Dater