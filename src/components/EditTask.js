import React from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditTask.css";


const EditTask = ({ userId, theme, language}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
    const toastColor = theme === "light" ? "black" : "whitesmoke";
    const editTheme = theme === "light" ? "edit-task-light" : "edit-task-dark";
    const editContainer = theme === "light" ? "edit-container-light" : "edit-container-dark";
    const editBtn = theme === "light" ? "edit-btn-light" : "edit-btn-dark";
    const navigate = useNavigate();
    const { taskId } = useParams();
    
    const tareaEditada = () =>  
    toast("Tarea editada", {
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

    const taskEdited = () =>
    toast("Task edited", {
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

    

    const handleEditTask = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
        };

        try {
            const result = await axios.put(
                `https://todo-danielamoroso31.b4a.run/${userId}/edit-task/${taskId}`,
                data
            );
            if (result.status === 200) {
          language === 'english' ? taskEdited() : tareaEditada()
                navigate("/tasks");
            }
        } catch (error) {
            toast("Error editing task", {
                duration: 3000,
                position: "middle-center",
                style: {
                    background: toastTheme,
                    color: toastColor,
                },
                icon: "❌",
            });
        }
    };

  return (
    <main className='edit-main-container'>
    <section className={editContainer}>
        <div className={editTheme}>


        <h1>{language === 'english' ?  'Edit task' : 'Editar tarea'}</h1>
        </div>
        <form onSubmit={handleEditTask}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text" 
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className={editBtn}>
                Edit Task
            </button>
        </form>


    </section>
    </main>
  )
}

EditTask.propTypes = {
    userId: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
};

export default EditTask