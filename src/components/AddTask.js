import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = ({ userId, language }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const taskAdded = () =>
    toast("Task added", {
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
  const tareaAgregada = () =>
    toast("Tarea agregada", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };

    axios
      .post(`https://todo-danielamoroso31.b4a.run/${userId}/create-task`, data)
      .then((response) => {
        if (response.status === 200) {
          if (language === "english") {
            taskAdded();
            navigate("/home");
          } else {
            tareaAgregada();
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      {language === "english" ? "Add a task" : "Agregar una tarea"}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
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
        <div>
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
        <button>
          {language === "english" ? "Add a task" : "Agregar una tarea"}
        </button>
      </form>
    </section>
  );
};

export default AddTask;
