import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/AddBill.css";

const AddBill = ({ userId, language, getBills, theme,total }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

    const toastTheme = theme === "light" ? "whitesmoke" : "gray ";
    const toastColor = theme === 'light' ? 'black' : 'whitesmoke'


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



  const handleAddBill  = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      amount: amount,
      dueDate: dueDate,
    };

    try {
      const response = await axios.post(
        `https://todo-danielamoroso31.b4a.run/${userId}/create-bill`,
        data
      );
      if (response.status === 200) {

        language === "english" ? billAdded() : gastoAgregado();
        navigate("/bills");
        getBills();
      
      }
      if (response.status === 500) {
        language === "english" ? problem() : problema();
        
      }


    } catch (error) {
      console.log(error);
    }
};


  return (
    <>

 
      <section className="addbill-cont"  >
      <div className="total">
      <h1>Total
      <br></br><span>${total}</span>
      </h1>
    </div>
      <h1>{language === "english" ? "Add bill" : "Agregar gasto"}</h1>
        <form className="addbill-form" >
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
            onClick={handleAddBill}
            className={theme === "dark" ? "dark" : "light"}
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
  closeModal: PropTypes.func.isRequired,
  getBills: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default AddBill;
