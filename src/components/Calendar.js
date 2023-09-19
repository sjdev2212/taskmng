import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import "../styles/Calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner"; 
import { toast } from "react-hot-toast";


function MyCalendar({ userId,language,theme }) {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // eslint-disable-next-line

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line

/*styles*/
const appointmentTheme = theme === "light" ? "appointment-light" : "appointment-dark";
const expired = {
  color: "red",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textDecoration: "crossed",
};
const notExpired = {
  color: "green",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textDecoration: "none",
};
const deleteAppointmentTheme = theme === "light" ? "btn-delete-light" : "btn-delete-dark";
const appRenderTheme = theme === "light" ? "app-render-light" : "app-render-dark";
const noAppTheme = theme === "light" ? "no-app-light" : "no-app-dark";
const singleAppTheme = theme === "light" ? "single-app-light" : "single-app-dark";
const addAppBtn = theme === "light" ? "add-app-btn-light" : "add-app-btn-dark";

  const navigate = useNavigate();
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const appointmentAdded = () =>
    toast("Appointment added", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: "whitesmoke",
        color: "black",
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        border: "solid 2px black",
        borderRadius: "15px",
      },
      icon: "✔️",
    });



  const handleDayClick = (value) => {
  
    setSelectedDate(value);
  };


/*   const addAppointment = () => {
    if (selectedDate && description.trim() !== "") {
      setAppointments([...appointments, { date: selectedDate, text: description }]);
    

      setSelectedDate(null);
      setDescription("");
    }
  }; */
  const saveAppointments = (e) => {
    e.preventDefault();
    
    const data = {
        date: date,
        description: description,
        category: category,
       
      };
      axios.post(`https://todo-danielamoroso31.b4a.run/${userId}/save-date`, data)
      .then(res => {
     if (res.status === 200) {
      appointmentAdded();
      getAppointment();
      setDescription("");
      setCategory("");
  }
      })
      .catch(err => {
        console.log(err);
      }
      )

    
   
  };
/*   const markAppointments = ({ date }) => {
    const hasAppointments = appointments.some((appointment) =>
      isSameDay(appointment.date, date)
    );

    return hasAppointments ? (
      <span className="appointment-marker">{description || ""}</span>
    ) : null;
  }; */
  useEffect(() => {
    getAppointment();
    
    //eslint-disable-next-line  
  }, [userId ]);
  




  const getAppointment = async () => {
    try {
   const result = await axios.get(
        `https://todo-danielamoroso31.b4a.run/${userId}/dates-saved`
      );
      if (result.data.result === undefined) {
        setAppointments([]);
        setLoading(false);
      } else {
        setAppointments(result.data.result);
        setLoading(false);
      }
    }
    catch (error) {
    console.log(error)
    }
  };




  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `https://todo-danielamoroso31.b4a.run/${userId}/delete-date/${id}`
      );
      if (response.status === 200) {

        getAppointment();
        navigate("/calendar");
       

      }

    } catch (error) {
      console.log(error);
    }
  };

return (
    <div>
      <div id="date" className="calendar-container">
        <Calendar
        className="date"
        onChange={handleDateChange}
        value={date}
    /*     tileContent={markAppointments} */
        onClickDay={handleDayClick}
        data-testid="calendar"
        
       />

        <div className="cont-right">
          <div>
          <form  onSubmit={saveAppointments}>
            <input
              type="text"
              id="description"
              data-testid="input"
              placeholder="Add appointment text..."
              value={description}
              data={selectedDate}
              onChange={(e) => setDescription(e.target.value)}
              className="input-text"
            />
            <select 
             data-testid="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-category"
            >
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
              <option value="reminder">Reminder</option>
              <option value="other">Other</option>
              <option value="doctor">Doctor</option>
            </select>
            <button 
            type="submit"
            className={addAppBtn}
            data-testid="Add"
            >Add </button>
          </form>
          </div>
          <section className={appRenderTheme}>

{loading ? (
        <div className="loading">
          <RotatingLines
           color="#404040"
           strokeColor="grey"
           strokeWidth="5"
           animationDuration="0.75"
           width="60"
           visible={true}
           position="center"
                          
                          
                          
                          />
        </div>
      ) : (
        <div >
          {

            appointments.length === 0 ? (
              <div className={noAppTheme}> 
              <h1>{
                language === "english" ?
                "No appointments yet" : "No hay fechas aún"

                }</h1>
              </div>
            ) : (
              <div className={appointmentTheme}>
                {appointments.map((appointment) => (
                  <div className={singleAppTheme} key={appointment._id}>
                  
                      <div className="appointment-date">
                        <p>{
                          language === "english" ? 
                            "Date: " : "Fecha: "
                          
                          }</p>
                        <p >{
                        new Date(appointment.date.slice(0, 10 )) < new Date() ?
                        <span style={expired}>{appointment.date.slice(0, 10)}</span> :
                        <span style={notExpired}>{appointment.date.slice(0, 10)}</span>
                        
                        
                        
                        
                        }</p>
                      </div>
                      <div className="appointment-text">
                        <p>{theme ===  'english' ? 
                            "Description: " : "Descripción: "}
                      </p>
                        <p>{appointment.description}</p>
                      </div>
                      <div className="appointment-category">
                        <p>{language === "english" ?
                          "Category: " : "Categoría: "}   
                        </p>                  
                        <p>{appointment.category}</p>
                      </div>
                     
                      <div className="appointment-actions">
                      <button data-testid="Delete" className={deleteAppointmentTheme}

                        onClick={() => deleteAppointment(appointment.idForDate)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )

          }

</section>
 </div>
</div>
</div>
)}

MyCalendar.propTypes = {
  userId: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default MyCalendar;
