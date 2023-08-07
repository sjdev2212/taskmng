import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import '../styles/Task.css'


const Task = ({ language, userId,logged,tasks , loading}) => {

 

  const navigate = useNavigate();

  const openModal = () => {
  let modal = document.getElementById("modal");
  modal.style.display = "block";

};
const closeModal = () => {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
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
      <section>
        {
        ( loading ? (
            <div>
                <h1>Loading...</h1>
            </div>
        ) :
        
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
                      <td>{task.title}</td>
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
      <div>
        <button onClick={openModal}>
         
            {language === "english" ? "Add a task" : "Agregar una tarea"}

       
        </button>
      </div>
      <div id="modal">
      <AddTask/>
      <button onClick={closeModal}>Close</button>
      </div>
    </main>
  );
};

export default Task;
