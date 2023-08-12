import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import "../styles/Task.css";
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';



const Task = ({ language, userId, logged, tasks, loading }) => {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  //styles  
  const showModal = {
    display: "flex",
    position: "fixed",
    zIndex: "1",
    top: "3.5vw",
    left: "30vw",
    width: "28vw",
    height: "19vw",
    overflow: "auto",
    backgroundColor: "#3450A1",
    padding: "10vw",
    textAlign: "center",
    color: "#DA43F0",
    fontSize: "2.3vw",
    fontWeight: "bold",
    fontFamily: "Roboto",
    borderRadius: "15px",
    border: "solid 2px #DA43F0",
    boxShadow: "0 0 10px #DA43F0",
    margin: "2vw",
    opacity: "1",
  };
  const hideModal = {
    display: "none",
  };

  const closeModalButton = {
position: "absolute",
top: "0.5vw",
right: "0.5vw",
 backgroundColor: 'rgba(0, 0, 0, 0.0)',
    cursor: "pointer",
    border: "none",
    outline: "none",
   
    

  };




  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleDelete = (id) => {
    console.log("clocked");
    console.log(id);
    axios
      .delete(
        `https://todo-danielamoroso31.b4a.run/${userId}/delete-task/${id}`
      )
      .then((response) => {
        if (response.status === 200) {
          if (language === "english") {
            taskDeleted();
            navigate("/home");
          } else {
            tareaEliminada();
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const taskDeleted = () =>
    toast("Task deleted", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#3450A1",
        color: "#DA43F0",
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "✔️",
    });
  const tareaEliminada = () =>
    toast("Tarea eliminada", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#3450A1",
        color: "#DA43F0",
        height: "10vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",

        borderRadius: "15px",
      },
      icon: "✔️",
    });

  return (
   <main>
      <h2>{language === "english" ? "Add a task" : "Agregar una tarea"}</h2>

    
        {loading ? (
          <div>

            {language === "english" ? "Loading..." : "Cargando..."}
          </div>
        ) : (
      <section>
    
       { tasks === undefined || tasks.length === 0 ? (<div>
          {language === "english" ? "You don't have any tasks yet" : "Aun no tienes tareas"}
        </div>)
         : (

          tasks.map((task) => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>{language === "english" ? "Title" : "Titulo"}</th>
                    <th>
                      {language === "english" ? "Description" : "Descripcion"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <div key={task.idForTask}>
                      <td>{task.title} </td>
                      <td>{task.description}</td>
                    </div>
                  </tr>
                  <tr>
                    <td>
                      <button>
                        <Link to={`/edit/${task.idForTask}`}>
                          {language === "english" ? "Edit" : "Editar"}
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(task.idForTask)}>
                        {language === "english" ? "Delete" : "Borrar"}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })
        )}
      </section>
        )}
      <div>
        <button onClick={openModal}>
          {language === "english" ? "Add a task" : "Agregar una tarea"}
        </button>
      </div>
      <div style={modal ? showModal : hideModal}>
        <AddTask />
        <button className="btn-modal" style={closeModalButton} onClick={closeModal}>
          <Icon path={mdiCloseThick} size={2} />
        </button>
      </div>
    </main> 




  );
};




export default Task;
