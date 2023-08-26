import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/AddTask.css";



const AddTask = ({ userId, language, closeModal, getTasks,theme }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
  const toastColor = theme === 'light' ? 'black' : 'whitesmoke'
  const addTaskBtnTheme = theme === 'light' ? 'add-task-btn-light' : 'add-task-btn-dark'


  const taskAdded = () =>
  toast("Task added", {
    duration: 3000,
    position: "middle-center",
    style: {
      background: {toastTheme},
      color: {toastColor},
      height: "18vh",
      width: "35vh",
      fontSize: "1.2rem",
      fontWeight: "bold",
      border: "solid 2px black",
      borderRadius: "15px",
    },
    icon: "✔️",
  });
const tareaAgregada = () =>
  toast("Tarea agregada", {
    duration: 3000,
    position: "middle-center",
    style: {
      background: {toastTheme},
      color: {toastColor},
      height: "18vh",
      width: "35vh",
      fontSize: "1.2rem",
      border: "solid 2px black",
      fontWeight: "bold",
      borderRadius: "15px",
    },
    icon: "✔️",
  });
  const handleAddTask  = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };

    try {
      const response = await axios.post(
        `https://todo-danielamoroso31.b4a.run/${userId}/create-task`,
        data
      );
      if (response.status === 200) {

        language === "english" ? taskAdded() : tareaAgregada();
        navigate("/tasks");
        closeModal();
        getTasks();
       
      }
      if (response.status === 500) {
        
      }


    } catch (error) {
      console.log(error);
    }
};

  return (
    <section>
      <div className="modal-title">
      {language === "english" ? "Add a task" : "Agregar una tarea"}
      </div>
      <form onSubmit={handleAddTask} className="form-add-task">
        <div className="modal-input">
          <label htmlFor="title"  >
            
            {language === "english" ? "Title" : "Titulo"}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="modal-input">
          <label htmlFor="description">
            {language === "english" ? "Description" : "Descripcion"}
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className={addTaskBtnTheme}> 
          {language === "english" ? "Add a task" : "Agregar una tarea"}
        </button>
      </form>
    </section>
  );
};

export default AddTask;
