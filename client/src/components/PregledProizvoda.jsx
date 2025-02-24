import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { jwtDecode } from "jwt-decode";


const PregledProizvoda = () => {
  const [proizvodi, setProizvodi] = useState([]);

  useEffect(() => {
    fetchProizvodi();
  }, []);

  const fetchProizvodi = async () => {
    try {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        console.log("Korisnik nije prijavljen");
        return;
      }
  
      const response = await fetch("/products", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Nije moguće dohvatiti proizvode. Status:", response.status);
        return;
      }
  
      const proizvodiData = await response.json();
  
      // Sortiranje proizvoda po proizvođaču i nazivu proizvoda
      const sortiraniProizvodi = proizvodiData.sort(
        (a, b) =>
          a.proizvodac.naziv.localeCompare(b.proizvodac.naziv) ||
          a.naziv.localeCompare(b.naziv)
      );
  
      setProizvodi(sortiraniProizvodi);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvoda:", error.message);
    }
  };
  
  return (
    <div className="container-css">
      <h1>Pregled proizvoda</h1>
      <div className="list-container">
        {proizvodi.map((proizvod) => (
          <div key={proizvod._id} className="item">
            <Link
              to={`/products/${proizvod._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{proizvod.naziv}</h3>
            </Link>
            <p>Cijena: {proizvod.cijena} kn</p>
            <p>Proizvodač: {proizvod.proizvodac.naziv}</p>
            <Link to={`/products/${proizvod._id}`}>
              <button className="button-css">Pogledaj detalje</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregledProizvoda;
