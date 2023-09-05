import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddBill from "./AddBill";
import '../styles/Bills.css'

const Bills = ({ setBills, bills, userId, language, loading, setLoading }) => {
  const [total , setTotal] = useState(0)

  const handleTotal = () => {
    let total = 0
    bills.forEach(bill => {
      total += bill.amount
    })
    setTotal(total)
  }
  const getBills = async () => {
    const result = await axios.get(
      `https://todo-danielamoroso31.b4a.run/${userId}/bills`
    );

    if (result.data.result === undefined) {
      setBills([]);
      setLoading(false);
    } else {
      setBills(result.data.result);
      handleTotal()
      setLoading(false);
    }
  };

  useEffect(() => {
    getBills();
    // eslint-disable-next-line
  }, [userId,total]);
  return (
    <>
      <main className="bills-container">
   
        <section className="show-bills">
          <h1>{language === "english" ? "Bills" : "Cuentas"}</h1>
          <div>
            {loading ? (
              <div className="loader"></div>
            ) : bills.length === 0 ? (
              <div className="no-tasks">No bills yet</div>
            ) : (
              bills.map((bill) => (
                <div className="expense" key={bill.id}>
                  <span>
                  Name: {bill.name} 
                  </span>
                  <span>
                 Amount: ${bill.amount}  

                  </span>
                  <span>
                  Due date: {bill.dueDate}

                  </span>
                  <span>
                   Paid: {bill.paid ? "Yes" : "No"}

                  </span>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="bills-section">
          <AddBill
            userId={userId}
            language={language}
            setLoading={setLoading}
            getBills={getBills}
            total={total}
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
