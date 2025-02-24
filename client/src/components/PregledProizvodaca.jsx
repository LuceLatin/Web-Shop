import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const PregledProizvodaca = () => {
  const [proizvodaci, setProizvodaci] = useState([]);

  useEffect(() => {
    fetchProizvodaci();
  }, []);

  const fetchProizvodaci = async () => {
    try {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        console.log("Korisnik nije prijavljen");
        return;
      }
  
      const response = await fetch("/proizvodaci", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const proizvodaciData = await response.json();
      setProizvodaci(proizvodaciData);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvođača:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h1>Pregled proizvođača</h1>
      <div className="list-container">
        {proizvodaci.map((proizvodac) => (
          <div key={proizvodac._id} className="item">
            <Link
              to={`/proizvodac/${proizvodac._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{proizvodac.naziv}</h3>
            </Link>
            <p>Godina osnivanja: {proizvodac.godinaOsnivanja}</p>
            <p>Država: {proizvodac.drzava}</p>
            <Link to={`/proizvodac/${proizvodac._id}`}>
              <button className="button-css">Pogledaj detalje</button>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregledProizvodaca;
