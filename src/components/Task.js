import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AddTask from "./AddTask";
/* import { Link } from "react-router-dom"; */
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mdiCloseThick } from "@mdi/js";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { BsTrash3Fill } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Icon from "@mdi/react";
import "../styles/Task.css";
const Task = ({
  language,
  userId,
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
  const themeModal = theme === "light" ? "whitesmoke" : "#404040";
  const modalColor = theme === "light" ? "gray" : "whitesmoke";
  const spinnerTheme = theme === "light" ? "black" : "whitesmoke";
  const noTasksTheme = theme === "light" ? "no-tasks-light" : "no-tasks-dark";
  const showTasksTheme =
    theme === "light" ? "show-tasks-light" : "show-tasks-dark";
  const taskItemTheme =
    theme === "light" ? "task-item-light" : "task-item-dark";
  const addTaskContTheme =
    theme === "light" ? "add-task-cont-light" : "add-task-cont-dark";
  const noTasker = theme === "light" ? "notask-btn-light" : "notask-btn-dark";
/*   const addTaskWithItems =
    theme === "light" ? "add-btn-items-light" : "add-btn-items-dark"; */
  const idBtnTheme = theme === "light" ? "btn-add-light" : "btn-add-dark";
  const clearCompletedTheme = theme === "light" ? "clear-btn-light" : "clear-btn-dark"; 
  const btnClearCom = theme === "light" ? "btn-clear-com-light" : "btn-clear-com-dark"; 
  const checkTheme = theme === "light" ? "hover-check-light" : "hover-check-dark";
  const btnDelCont = theme === "light" ? "btn-cont-delete-light" : "btn-cont-delete-dark";

  /*   const textCompleted = {
    textDecoration: "line-through",
    color: "gray",
  };
  const textIncomplete = {
    textDecoration: "none",
    color: "black",
    backgroundColor: "whitesmoke",
  }; */
  /*   const disbleBtn = {
    backgroundColor: "gray",
    color: "whitesmoke",
    border: "none",
    outline: "none",
    cursor: "not-allowed",
    disabled: "true",
  }; */
  /*   const enableBtn = {
    backgroundColor: "whitesmoke",
    color: "black",
    border: "none",
    outline: "none",
    cursor: "pointer",
    disabled: "false",
  };
 */

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
    color: "whitesmoke",
    backgroundColor: "#404040",
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
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleted = async (id) => {
    await axios
      .put(`https://todo-danielamoroso31.b4a.run/${userId}/complete-task/${id}`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/tasks");
          getTasks();
        }
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });
  };
  const handleIncomplete = async (id) => {
    await axios
      .put(
        `https://todo-danielamoroso31.b4a.run/${userId}/incomplete-task/${id}`
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/tasks");
          getTasks();
        }
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });
  };



  const handleClearCompleted = async () => {
    await axios
      .delete(`https://todo-danielamoroso31.b4a.run/${userId}/delete-completed-tasks`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/tasks");
          getTasks();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    <main className={addTaskContTheme}>
      {loading ? (
        <div className="spinner">
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
              {language === "english" ? (
                <h3>You do not have any tasks yet</h3>
              ) : (
                <h3>No tienes tareas todavía</h3>
              )}
              <div className="btn-notasks">
                <button className={noTasker} onClick={openModal}>
                  {language === "english" ? "Add a task" : "Agregar una tarea"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <button   id={idBtnTheme}  onClick={openModal}>
                  {language === "english" ? "Add a task" : "Agregar una tarea"}
                </button>
              </div>
              <div>
                <button className={clearCompletedTheme} onClick={handleClearCompleted}>
                  {language === "english"
                    ? "Clear Completed"
                    : "Limpiar Completados"}
                </button>
              </div>

              <section className={showTasksTheme}>
                {tasks.map((task) => (
                  <div className={taskItemTheme} key={task.idForTask}>
                    <div className="task-detail">
                      <div style={{
                        textDecoration: "underline",
                        fontWeight: "500",
                        fontSize: "1.2vw",
                        fontFamily: "Sans-serif",
                      }}>
                { language === 'english' ? "Title:" : "Titulo:"}
                      </div>
                       <div>
                       {task.title}
                       </div>
                       
                       </div>
                    <div className="task-detail">
                     <div
                     style={{
                      textDecoration: "underline",
                      fontWeight: "500",
                      fontSize: "1.2vw",
                      fontFamily: "Sans-serif",
                    }}
                     
                     
                     >{language === 'english' ?  "Description:" : "Descripcion:"}</div>
                     <div>
                       {task.description}
                       </div>
                    </div>
                    <div className="task-detail"> 
                    <div
                     style={{
                      textDecoration: "underline",
                      fontWeight: "500",
                      fontSize: "1.2vw",
                      fontFamily: "Sans-serif",
                    }}>
                      {language === 'english' ?  "Completed?" : "Completado?"}
                    </div>


                    <button className={btnClearCom} onClick={task.completed ?  () =>handleIncomplete(task.idForTask) : () => handleCompleted(task.idForTask)}>
                     
                      {" "}
                      {task.completed ? (
                        <BsCheckCircle
                        className={checkTheme}
                        
                        />
                      ) : (
                        <ImCross className="hover-crossed" />
                      )}
                    </button>
                    </div>
                    <button className={btnDelCont} onClick={() => handleDelete(task.idForTask)}>
                      <BsTrash3Fill className="btn-delete-task" />
                    </button>
                  </div>
                ))}
              </section>
            </>
          )}
        </section>
      )}

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

Task.propTypes = {
  language: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setTasks: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Task;
