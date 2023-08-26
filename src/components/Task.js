import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import "../styles/Task.css";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCloseThick } from "@mdi/js";
import { useEffect } from "react";
import {   RotatingLines } from  'react-loader-spinner'



const Task = ({
  language,
  userId,
  logged,
  tasks,
  loading,
  setTasks,
  setLoading,
  theme,
}) => {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
  const toastColor = theme === "light" ? "black" : "whitesmoke";
  const themeModal = theme === "light" ? "whitesmoke" : "black";
  const modalColor = theme === "light" ? "gray" : "whitesmoke";
  const spinnerTheme = theme === "light" ? "black" : "whitesmoke";
  const noTasksTheme = theme === "light" ? "no-tasks-light" : "no-tasks-dark";
  const addTaskContainerTheme = theme === "light" ? "add-task-container-light" : "add-task-container-dark";
  const addBtnTheme = theme === "light" ? "add-btn-light" : "add-btn-dark";
  const addBtn = theme === "light" ? "btn-add-light" : "btn-add-dark";
  const btnsTheme = theme === "light" ? "btns-theme-light" : "btns-theme-dark";


  const modalBorder =
    theme === "light" ? "solid 2px black" : "solid 2px whitesmoke";
  const modalShadow =
    theme === "light" ? "0 0 10px black" : "0 0 10px whitesmoke";
  const modalBtnTheme =
    theme === "light" ? "btn-modal-light" : "btn-modal-dark";

  const getTasks = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/tasks`
    );

    if (result.data.result === undefined) {
      setTasks([]);
      setLoading(false);
    } else {
      setTasks(result.data.result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [userId]);
  //styles
  const showModal = {
    display: "flex",
    position: "fixed",
    zIndex: "1",
    top: "3.5vw",
    left: "25vw",
    width: "28vw",
    height: "19vw",
    overflow: "auto",
    backgroundColor: themeModal,
    color: modalColor,
    padding: "10vw",
    textAlign: "center",
    fontSize: "2.3vw",
    fontWeight: "bold",
    fontFamily: "Roboto",
    borderRadius: "15px",
    border: modalBorder,
    boxShadow: modalShadow,
    margin: "2vw",
    opacity: "1",
  };
  const hideModal = {
    display: "none",
  };

  const closeModalButtonLight = {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw",
    backgroundColor: "whitesmoke",
    cursor: "pointer",
    border: "none",
    outline: "none",
  };

  const closeModalButtonDark = {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw",
    backgroundColor: "black",

    cursor: "pointer",
    border: "none",
    outline: "none",
  };

  const closeModalButton =
    theme === "light" ? closeModalButtonLight : closeModalButtonDark;
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://todo-danielamoroso31.b4a.run/${userId}/delete-task/${id}`
      )
      .then((response) => {
        if (response.status === 200) {
          language === "english" ? taskDeleted() : tareaEliminada();

          navigate("/tasks");
          getTasks();
        }
      })
      .catch((error) => {});
  };
  const taskDeleted = () =>
    toast("Task deleted", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "15vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        border: "solid 2px black ",
        borderRadius: "15px",
      },
      icon: "✔️",
    });
  const tareaEliminada = () =>
    toast("Tarea eliminada", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "15vh",
        width: "35vh",
        border: "solid 2px black",
        fontSize: "1.2rem",
        fontWeight: "bold",

        borderRadius: "15px",
      },
      icon: "✔️",
    });

  return (
    <main className={addTaskContainerTheme}>
   

      {loading ? (
        <div className="spinner" >
 <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="60"
  visible={true}
  color={spinnerTheme}

/>
        </div>
      ) : (
        <section>
          {tasks.length === 0 ? (
            <div className={noTasksTheme}>
              {language === "english"
                ? "You don't have any tasks yet"
                : "Aun no tienes tareas"}
            </div>
          ) : (

            <table>
           <thead>
                    <tr>
                      <th>{language === "english" ? "Title" : "Titulo"}</th>
                      <th>
                        {language === "english" ? "Description" : "Descripcion"}
                      </th>
                      <th>{language === "english" ? "Edit" : "Editar"}</th>
                      <th>{language === "english" ? "Delete" : "Eliminar"}</th>
                    </tr>
                  </thead>
            <tbody>
                {tasks.map((task) => (

                    <tr key={task.idForTask}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                       <Link to={`/edit-task/${task.idForTask}`}>

                            <button className={btnsTheme} >
                              {language === "english" ? "Edit" : "Editar"}
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className={btnsTheme}
                            onClick={() => handleDelete(task.idForTask)}
                          >
                            {language === "english" ? "Delete" : "Eliminar"}
                          </button>
                        </td>
                    </tr>
                    
                ))}

            </tbody>


        </table>
          )

            
    
                }
        </section>
      )}
      <div className={addBtnTheme}>
        <button className={addBtn} onClick={openModal}>
          {language === "english" ? "Add a task" : "Agregar una tarea"}
        </button>
      </div>
      <div style={modal ? showModal : hideModal}>
        <AddTask
          userId={userId}
          language={language}
          closeModal={closeModal}
          getTasks={getTasks}
          theme={theme}
        />
        <button
          className={modalBtnTheme}
          style={closeModalButton}
          onClick={closeModal}
        >
          <Icon path={mdiCloseThick} size={2} />
        </button>
      </div>
    </main>
  );
};

export default Task;
