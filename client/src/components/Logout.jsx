import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("jwt");
      console.log("Uspjesno odjavljen.");
      navigate('/login'); 

      window.location.reload()
    } catch (error) {
      console.error("Greška prilikom odjave:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h2>Logout</h2>
      <button className="button-css" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
