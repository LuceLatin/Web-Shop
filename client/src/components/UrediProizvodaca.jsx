import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UrediProizvodaca = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proizvodac, setProizvodac] = useState({
    naziv: "",
    godinaOsnivanja: 0,
    drzava: "",
    opisFirme: "",
    logoURL: "",
  });

  useEffect(() => {
    fetchProizvodac();
  }, [id]);

  const fetchProizvodac = async () => {
    try {
      const response = await fetch(`/proizvodac/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      const proizvodacData = await response.json();
      setProizvodac(proizvodacData);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvođača:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProizvodac((prevProizvodac) => ({
      ...prevProizvodac,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/proizvodac/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(proizvodac),
      });

      if (response.ok) {
        navigate(`/proizvodac/${id}`);
      } else {
        console.error(
          "Nije moguće ažurirati proizvođača. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom ažuriranja proizvođača:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h1>Uredi proizvođača</h1>
      <label>Naziv: </label>
      <input
        type="text"
        name="naziv"
        value={proizvodac.naziv}
        onChange={handleChange}
      />
      <label>Godina osnivanja: </label>
      <input
        type="number"
        name="godinaOsnivanja"
        value={proizvodac.godinaOsnivanja}
        onChange={handleChange}
      />
      <br />
      <label>Država: </label>
      <input
        type="text"
        name="drzava"
        value={proizvodac.drzava}
        onChange={handleChange}
      />
      <br />
      <label>Opis firme: </label>
      <textarea
        type="text"
        name="opisFirme"
        value={proizvodac.opisFirme}
        onChange={handleChange}
      />
      <br />
      <label>Logo URL: </label>
      <input
        type="text"
        name="logoURL"
        value={proizvodac.logoURL}
        onChange={handleChange}
      />
      <br />
      <button className="button-css" onClick={handleUpdate}>
        Spremi promjene
      </button>
    </div>
  );
};

export default UrediProizvodaca;
