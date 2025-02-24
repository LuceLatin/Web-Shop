import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const UnosProizvodaca = () => {
  const [noviProizvodac, setNoviProizvodac] = useState({
    naziv: "",
    godinaOsnivanja: 0,
    drzava: "",
    opisFirme: "",
    logoURL: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoviProizvodac((prethodniProizvodac) => ({
      ...prethodniProizvodac,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    try {
      const odgovor = await fetch("/dodajProizvodaca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noviProizvodac),
      });

      if (odgovor.ok) {
        setNoviProizvodac(null);
        navigate("/proizvodaci");
      } else {
        console.error("Greška prilikom dodavanja proizvođača");
      }
    } catch (error) {
      console.error("Greška prilikom slanja zahtjeva:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h1>Unos novog proizvođača</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv proizvođača:
          <input
            type="text"
            name="naziv"
            value={noviProizvodac.naziv}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Godina osnivanja:
          <input
            type="number"
            name="godinaOsnivanja"
            value={noviProizvodac.godinaOsnivanja}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Država:
          <input
            type="text"
            name="drzava"
            value={noviProizvodac.drzava}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Opis firme:
          <textarea
            name="opisFirme"
            value={noviProizvodac.opisFirme}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Logo URL:
          <input
            type="text"
            name="logoURL"
            value={noviProizvodac.logoURL}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Dodaj proizvođača</button>
      </form>
    </div>
  );
};

export default UnosProizvodaca;
