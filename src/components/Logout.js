import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";


const Logout = ({handleLoginOut, user}) => {
   
            
  return (
 <>
 <button onClick={handleLogout}>{user}</button>

 </>
  )
}

export default Logout