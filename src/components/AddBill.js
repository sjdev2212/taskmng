import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/AddBill.css";

const AddBill = ({ userId, language, getBills, theme, totalPaid, totalUnPaid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
  const toastColor = theme === "light" ? "black" : "whitesmoke";
  const addBillConTheme =
    theme === "light" ? "add-bill-con-light" : "add-bill-con-dark";
  const addTaskBtn = theme === "light" ? "add-task-btn-light" : "add-task-btn-dark";


    const styledTitle = {
      color: "#e61e46",
      fontSize: "1vw",
    };



  const billAdded = () =>
    toast("Bill added", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        fontWeight: "bold",
        border: "solid 2px black",
        borderRadius: "15px",
      },
      icon: "✔️",
    });
  const gastoAgregado = () =>
    toast("Gasto agregado", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        border: "solid 2px black",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "✔️",
    });
  const problem = () =>
    toast("Problem adding bill", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        border: "solid 2px black",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "❌",
    });

  const problema = () =>
    toast("Hubo un error agregando el gasto", {
      duration: 3000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        border: "solid 2px black",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "❌",
    });

    const fillAllFields = () =>
    toast("Please fill all fields", {
      duration: 2000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        border: "solid 2px black",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "❌",
    });

    const llenarTodosLosCampos = () =>
    toast("Por favor llena todos los campos", {
      duration: 2000,
      position: "middle-center",
      style: {
        background: { toastTheme },
        color: { toastColor },
        height: "18vh",
        width: "35vh",
        fontSize: "1.2rem",
        border: "solid 2px black",
        fontWeight: "bold",
        borderRadius: "15px",
      },
      icon: "❌",
    });



  const handleAddBill = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      amount: amount,
      dueDate: dueDate,
    };
    /*validate data*/
    if (name === "" || amount === 0 || dueDate === "") {
      language === "english" ? fillAllFields() : llenarTodosLosCampos();
      return;
    }
    try {
      const response = await axios.post(
        `https://todo-danielamoroso31.b4a.run/${userId}/create-bill`,
        data
      );
      if (response.status === 200) {
        language === "english" ? billAdded() : gastoAgregado();
        navigate("/bills");
        getBills();
        setName("");
        setAmount(0);
        setDueDate("");
      }
    } catch (error) {
      language === "english" ? problem() : problema();
    }
  };



  return (
    <>
      <div className="total">
      
        
       
          <span>{
            language === "english" ? " Paid: " : "Pagado: "
            }  ${totalPaid}</span>
        
      </div>
      <div className="total-unpaid">
        <span style={
          theme === "light" ? {color:"crimson"} : styledTitle
        }>
          {language === "english" ? "Unpaid: " : "Sin pagar: "}
          ${totalUnPaid}
        </span>
      </div>

     

      <section className={addBillConTheme}>
        <h1 data-testid="gasto">{language === "english" ? "Add bill" : "Agregar gasto"}</h1>
        <form className="addbill-form">
          <label htmlFor="name">
            {language === "english" ? "Name" : "Nombre"}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="amount">
            {language === "english" ? "Amount" : "Cantidad"}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="dueDate">
            {language === "english" ? "Due date" : "Fecha de vencimiento"}
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            type="submit"
            className={addTaskBtn}
            onClick={handleAddBill}
          /*  style={{

              backgroundColor: theme === "light" ? "#404040" : "whitesmoke",
              color: theme === "light" ? "white" : "#404040",
               fontWeight: "bold",
               border: "solid 2px black",
               borderRadius: "15px",      }} */
          >
            {language === "english" ? "Add bill" : "Agregar gasto"}
          </button>
        </form>
      </section>
    </>
  );
};
AddBill.propTypes = {
  userId: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  getBills: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  totalPaid: PropTypes.number.isRequired,
  totalUnPaid: PropTypes.number.isRequired,

};

export default AddBill;
