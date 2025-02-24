import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UrediProizvod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proizvodaci, setProizvodaci] = useState([]);
  const [proizvod, setProizvod] = useState({
    naziv: "",
    cijena: 0,
    postotakKakaa: 0,
    boja: "",
    tip: "",
    proizvodac: "",
  });

  useEffect(() => {
    fetchProizvod();
    fetchProizvodaci();
  }, [id]);

  const fetchProizvod = async () => {
    try {
      const response = await fetch(`/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      const proizvodData = await response.json();
      setProizvod(proizvodData);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvoda:", error.message);
    }
  };

  const fetchProizvodaci = async () => {
    try {
      const response = await fetch("/proizvodaci", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      const proizvodaciData = await response.json();
      setProizvodaci(proizvodaciData);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvodaca:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProizvod((prevProizvod) => ({
      ...prevProizvod,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/proizvod/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(proizvod),
      });

      if (response.ok) {
        navigate(`/products/${id}`);
      } else {
        console.error(
          "Nije moguće ažurirati proizvod. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom ažuriranja proizvoda:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h1>Uredi proizvod</h1>
      <label>Naziv: </label>
      <input
        type="text"
        name="naziv"
        value={proizvod.naziv}
        onChange={handleChange}
      />
      <label>Cijena: </label>
      <input
        type="number"
        name="cijena"
        value={proizvod.cijena}
        onChange={handleChange}
      />
      <br />
      <label>
        Postotak kakaa:
        <input
          type="number"
          name="postotakKakaa"
          value={proizvod.postotakKakaa}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Boja:
        <input
          type="text"
          name="boja"
          value={proizvod.boja}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Tip:
        <input
          type="text"
          name="tip"
          value={proizvod.tip}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Proizvođač:
        <br />
        <select
          name="proizvodac"
          value={proizvod.proizvodac}
          onChange={handleChange}
          required
          style={{ height: "2em" }}
        >
          <option value="">{proizvod.proizvodac.naziv}</option>
          {proizvodaci.map((proizvodac) => (
            <option key={proizvodac._id} value={proizvodac._id}>
              {proizvodac.naziv}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button className="button-css" onClick={handleUpdate}>
        Spremi promjene
      </button>
    </div>
  );
};

export default UrediProizvod;
