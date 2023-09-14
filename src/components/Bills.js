import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AddBill from "./AddBill";
import paid from "../img/paid.png";
import paidDark from "../img/paid-dark.jpg";
import edit from "../img/edit.svg";
import { RotatingLines } from "react-loader-spinner"; 
import { BsTrash3Fill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import "../styles/Bills.css";



const Bills = ({
  setBills,
  bills,
  userId,
  language,
  loading,
  setLoading,
  theme,
}) => {

  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnPaid, setTotalUnPaid] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [sortType, setSortType] = useState('default');
  const date  = new Date();
/* STYLING VARIABLES */
  const billsCont = theme === "light" ? "bills-cont-light" : "bills-cont-dark";
  const showBillsTheme =
    theme === "light" ? "show-bills-light" : "show-bills-dark";
  const expenseTheme = theme === "light" ? "expense-light" : "expense-dark";
  const billsSecTheme =
    theme === "light" ? "bills-sec-light" : "bills-sec-dark";
  const noBillsTheme = theme === "light" ? "no-bills-light" : "no-bills-dark";
  const billHeader = theme === "light" ? "bill-header-light" : "bill-header-dark";
  const deletgBillBtn = theme === "light" ? "delete-bill-btn-light" : "delete-bill-btn-dark";
  const payBillTheme = theme === "light" ? "pay-bill-light" : "pay-bill-dark";
  const spinnerTheme = theme === "light" ? "black" : "whitesmoke";
  const titleBill = theme === "light" ? "title-bill-light" : "title-bill-dark";
  const deleteAllTheme = theme === "light" ? "delete-all-light" : "delete-all-dark";
  const sortedTheme = theme === "light" ? "sorted-light" : "sorted-dark";
  const titlePosTheme = theme === "light" ? "title-pos-light" : "title-pos-dark";





  const getBills = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/bills`
    );

    if (result.data.result === undefined) {
      setBills([]);
      setLoading(false);
      setEmpty(true);
    } else {
      setBills(result.data.result);
      setLoading(false);
      setEmpty(false);
    }
  };

  useEffect(() => {
    getBills();


   
   
   // eslint-disable-next-line
  }, [userId ]);

  useEffect(() => {
    if (sortType === 'paid') {
      getPaidBills();
    }
    if (sortType === 'unpaid') {
      getUnPaidBills();
    }
    if (sortType === 'bydateasc') {
      getSortedAsc();
    }
    if (sortType === 'bydatedesc') {
      getSortedDesc();
    }
     else {
      getBills();
    }
    // eslint-disable-next-line
  }, [sortType]);

  useEffect(() => {
    // Calculate total paid and total unpaid whenever bills change
    let totalPaidAmount = 0;
    let totalUnPaidAmount = 0;

    bills.forEach((bill) => {
      if (bill.paid) {
        totalPaidAmount += bill.amount;
      } else {
        totalUnPaidAmount += bill.amount;
      }
    });

    setTotalPaid(totalPaidAmount);
    setTotalUnPaid(totalUnPaidAmount);
  }, [bills]);

  const handleSortBills = (e) => {
    setSortType(e.target.value);
  };


  const deleteBill = async (id) => {
    const result = await axios.delete(
      `https://todo-danielamoroso31.b4a.run/${userId}/delete-bill/${id}`
    );
    if (result.status === 200) {
      getBills();
    }
  };
  const handleDeletePaidBills = async () => {
    const result = await axios.delete(
      `https://todo-danielamoroso31.b4a.run/${userId}/delete-paid-bills`
    );
   try {
    if (result.status === 200) {
      getBills();
    }
   }
    catch(error) {
      console.log(error);
    }

  };





const handlePayBill = async (id) => {
  const result = await axios.put(
    `https://todo-danielamoroso31.b4a.run/${userId}/paid-bill/${id}`
  );
  if (result.status === 200) {
 
    getBills();
  }
};
const getPaidBills = async () => {
  const result = await axios.get(
    `https://todo-danielamoroso31.b4a.run/${userId}/paid-bills`
  );
  if (result.status === 200) {
   setBills(result.data.bills);
    }
  };

  const getUnPaidBills = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/unpaid-bills`
    );
    if (result.status === 200) {
     setBills(result.data.bills);
      }
    };
  const getSortedAsc = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/bills-by-date-ascending`
    );
    if (result.status === 200) {
      setBills(result.data.bills);
    }
  };


  const getSortedDesc = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/bills-by-date-descending`
    );
    if (result.status === 200) {
      setBills(result.data.bills);
    }
  };


  



  
  

  return (
    <>
      <main className={billsCont}>
        <div>
          <div className={titlePosTheme}>
          <h1 className={titleBill}>{language === "english" ? "Bills" : "Cuentas"}</h1>
          </div>
          <div style={
            empty ? {display: "none"} : {display: "flex"}
          } className="handle-paid">
            <div className={sortedTheme}>
            <select   onChange={handleSortBills}  >
            <option >{
                language === "english" ? "Unsorted:" : "Sin Orden:"
              }</option>
              <option  value="paid">{
                language === "english" ? "Paid" : "Pagado"
              }</option>
              <option value="unpaid">{
                language === "english" ? "Unpaid" : "Sin pagar"
              }</option>
              <option value="bydateasc">
                {
                  language === "english" ? "By Date Ascending" : "Por fecha ascendente"
                }
              </option>
              <option value="bydatedesc">{
                language === "english" ? "By Date Descending" : "Por fecha descendente"
              }</option>
           </select>
           </div>
                      <button className={deleteAllTheme} style={
                        empty ? {display: "none"} : {display: "flex"}
                      } onClick={ handleDeletePaidBills}>{language === 'english' ? 'Clear paid bills' : 
                      'Borrar cuentas pagadas'
                      
                      }</button>
                    </div>
    
          <section className={showBillsTheme}>
            <div>
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
        
                
              ) : bills.length === 0 ? (
             
                <div className={noBillsTheme}>
                
                  {language === "english"
                    ? "No bills yet"
                    : "Aun no hay gastos"}
                </div>
              ) : (  
                bills.map((bill) => (
                  
                  <div className={expenseTheme} key={bill.id}>
                   
                    <div className="bills-details">
                      <div className={billHeader}>
                        {language === "english" ? "Name:" : "Nombre:"}
                        </div>
                      <div>
                        {bill.name}
                      </div>
                    </div>
                    <div className="bills-details">
                      <div className={billHeader}
                      >{
                        language === "english" ? "Amount:" : "Monto:"
                      }</div>
                      <div>${bill.amount}</div>
                    </div>

                    <div className="bills-details">
                      <div className={billHeader}
                      >{
                        language === "english" ? "Due date:" : "Vencimiento:"
                      }</div>
                      <div style={{
                    color: new Date(bill.dueDate) < date ? theme === "light" ? "red" : "#e61e46" : "black",

                       } } >{bill.dueDate}</div>
                    </div>
                    <div className="bills-details">
                      <div 
                      className={billHeader}
                      >
                        {language === "english" ? "Paid?" : "Pagado?"}
                      </div>
                      <div>{bill.paid ?  
                      <img style={{
                        backgroundColor: "white",
                        width: "34px",
                        height: "29px",
                        borderRadius: "50%",
                      }} src={ theme === 'dark' ?  paidDark : paid} alt="paid" className="paid-icon" />
                      : "No"}</div>
                    </div>
                    <div className={payBillTheme}>
                    <GiPayMoney onClick={() => handlePayBill(bill.idForBill)}/>
                    </div>
                    <div>
                      <button 
                        className={deletgBillBtn}
                        onClick={() => deleteBill(bill.idForBill)}
                      >
                         <BsTrash3Fill />
                      </button> 

                    </div>
                    <div>
                      <Link to={`/edit-bill/${bill.idForBill}`}>
                      <button
                        className="edit-bill-btn"
                        onClick={() => console.log("edit")}
                      >
                      
                        <img src={edit} alt="edit" style={{
                          width: "20px",
                          height: "20px",
                          margin: "11px 0 0 0",
                          padding: "0 ",
                          border: "none",
                          backgroundColor: "transparent",
                          outline: "none",
                         

                        }} />
                      </button>
                      </Link>
                    </div>
                  </div>
                ))
                
              )} 
            </div>
          
                
          </section>
        </div>
        <section className={billsSecTheme}>
          <AddBill
            userId={userId}
            language={language}
            setLoading={setLoading}
            getBills={getBills}
        totalPaid={totalPaid}
        totalUnPaid={totalUnPaid}
            theme={theme}
           
          />
        </section>
      </main>
    </>
  );
};

Bills.propTypes = {
  setBills: PropTypes.func.isRequired,
  bills: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Bills;
