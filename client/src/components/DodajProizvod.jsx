import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DodajProizvod = () => {
  const [proizvodaci, setProizvodaci] = useState([]);
  const [newProduct, setNewProduct] = useState({
    naziv: "",
    cijena: 0,
    postotakKakaa: 0,
    boja: "",
    tip: "",
    proizvodac: "",
  });
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log("Proizvod uspješno dodan");
        setNewProduct({
          naziv: "",
          cijena: 0,
          postotakKakaa: 0,
          boja: "",
          tip: "",
          proizvodac: "",
        });
        navigate('/')
      } else {
        console.error("Greška prilikom dodavanja proizvoda");
      }
    } catch (error) {
      console.error("Greška prilikom slanja zahtjeva:", error.message);
    }
  };

  const fetchProizvodaci = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("/proizvodaci", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }});
      const data = await response.json();
      setProizvodaci(data);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvođača:", error.message);
    }
  };

  useEffect(() => {
    fetchProizvodaci();
  }, []);

  return (
    <div className="container-css">
      <h1>Dodaj proizvod</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv proizvoda:
          <input
            type="text"
            name="naziv"
            value={newProduct.naziv}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Cijena:
          <input
            type="number"
            name="cijena"
            value={newProduct.cijena}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Postotak kakaa:
          <input
            type="number"
            name="postotakKakaa"
            value={newProduct.postotakKakaa}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Boja:
          <input
            type="text"
            name="boja"
            value={newProduct.boja}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Tip:
          <input
            type="text"
            name="tip"
            value={newProduct.tip}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Proizvođač:
          <br />
          <select
            name="proizvodac"
            value={newProduct.proizvodac}
            onChange={handleInputChange}
            required
            style={{ height: "2em" }}
          >
            <option value="">Odaberite proizvođača</option>
            {proizvodaci.map((proizvodac) => (
              <option key={proizvodac._id} value={proizvodac._id}>
                {proizvodac.naziv}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Dodaj proizvod</button>
      </form>
    </div>
  );
};

export default DodajProizvod;
