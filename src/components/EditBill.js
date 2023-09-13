import React from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditBill.css";


const EditBill = ({ userId, theme, language}) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [dueDate, setDueDate] = useState("");

    const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
    const toastColor = theme === "light" ? "black" : "whitesmoke";
    const editTheme = theme === "light" ? "edit-task-light" : "edit-task-dark";
    const editContainer = theme === "light" ? "edit-container-light" : "edit-container-dark";
    const editBtn = theme === "light" ? "edit-btn-light" : "edit-btn-dark";
    const navigate = useNavigate();
    const { billId } = useParams();
    
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
    toast("Bill edited", {
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

    

    const handleEditBill = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            amount: amount,
            dueDate: dueDate,
        };

        try {
            const result = await axios.put(
                `https://todo-danielamoroso31.b4a.run/${userId}/edit-bill/${billId}`,
                data
            );
            if (result.status === 200) {
          language === 'english' ? taskEdited() : tareaEditada()
                navigate("/bills");
            }
        } catch (error) {
            toast("Error editing bill", {
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


        <h1>{language === 'english' ?  'Edit Bill' : 'Editar Gasto'}</h1>
        </div>
        <form onSubmit={handleEditBill}>
            <div className="form-group">
                <label htmlFor="name">
                    {language === 'english' ?  'Name' : 'Nombre'}
                </label>
                <input
                    type="text" 
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">
                    {language === 'english' ?  'Amount' : 'Monto'}
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dueDate">

                    {language === 'english' ?  'Due Date' : 'Vencimiento'}
                </label>
                <input
                    className="form-control"
                    id="dueDate"
                     type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                ></input>
            </div>
         
            <button type="submit" className={editBtn}>
                {
                    language === 'english' ?  'Edit Bill' : 'Editar Gasto'
                }
            </button>
        </form>


    </section>
    </main>
  )
}

EditBill.propTypes = {
    userId: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
};

export default EditBill