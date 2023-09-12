import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddBill from "./AddBill";
import paid from "../img/paid.png";
import paidDark from "../img/paid-dark.svg";
import edit from "../img/edit.svg";
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
  const [total, setTotal] = useState(0);

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


  const getBills = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/bills`
    );

    if (result.data.result === undefined) {
      setBills([]);
      setLoading(false);
      handleTotal();
    } else {
      setBills(result.data.result);
      handleTotal();
      setLoading(false);
    }
  };
  const handleTotal = () => {
    let totalAmount = 0;

    let paidBills = bills.filter((bill) => bill.paid === true);
     paidBills.forEach((bill) => {
      totalAmount += bill.amount;
    });
    setTotal(totalAmount);
  };

  useEffect(() => {
    getBills();
   
   // eslint-disable-next-line
  }, [userId, total]);

  const deleteBill = async (id) => {
    const result = await axios.delete(
      `https://todo-danielamoroso31.b4a.run/${userId}/delete-bill/${id}`
    );
    if (result.status === 200) {
      getBills();
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




  return (
    <>
      <main className={billsCont}>
        <div>
          <h1>{language === "english" ? "Bills" : "Cuentas"}</h1>
          <section className={showBillsTheme}>
            <div>
              {loading ? (
                <div className="loader"></div>
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
                      <div>{bill.dueDate}</div>
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
                        width: "32px",
                        height: "29px",
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
                      <button
                        className="edit-bill-btn"
                        onClick={() => console.log("edit")}
                      >
                        {
                          language === "english" ? "Edit " : "Editar"
                        }
                        <img src={edit} alt="edit" style={{
                          width: "20px",
                          height: "20px",
                        }} />
                      </button>

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
            total={total}
            theme={theme}
            handleTotal={handleTotal}
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
