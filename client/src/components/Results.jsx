import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFilter } from "./FilterContext";

const Results = () => {
  const [proizvodaci, setProizvodaci] = useState([]);
  const [selectedProizvodac, setSelectedProizvodac] = useState("");
  const [postotakKakaa, setPostotakKakaa] = useState("");
  const { setFilter } = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios.get("/proizvodaci",  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
      })
      .then(response => {
        setProizvodaci(response.data);
      })
      .catch(error => {
        console.error("Greška prilikom dohvaćanja proizvođača:", error);
      });
  }, []);

  const handleFilter = () => {
    const token = localStorage.getItem("jwt");

    if (selectedProizvodac && postotakKakaa) {
      axios.post("/obarana", { proizvodac: selectedProizvodac, postotakKakaa: postotakKakaa},  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
      })
        .then(response => {
          setFilter(response.data);
          navigate('/rezultati');
        })
        .catch(error => {
          console.error("Greška prilikom filtriranja proizvoda:", error);
        });
    } else {
      alert("Molimo Vas da popunite oba polja.");
    }
  };
  return (
    <div>
      <h2>Filtriranje proizvoda</h2>
      <label>Proizvođač:</label>
      <select onChange={(e) => setSelectedProizvodac(e.target.value)}>
        <option value="">Odaberite proizvođača</option>
        {proizvodaci.map(proizvodac => (
          <option key={proizvodac._id} value={proizvodac._id}>{proizvodac.naziv}</option>
        ))}
      </select>

      <label>Postotak kakaa:</label>
      <input type="number" value={postotakKakaa} onChange={(e) => setPostotakKakaa(e.target.value)} />

      <button onClick={handleFilter}>Filtriraj</button>

      {/* {filteredProizvodi.length > 0 && (
        <div>
          <h3>Filtrirani proizvodi:</h3>
          <ul>
            {filteredProizvodi.map(proizvod => (
              <li key={proizvod._id}>{proizvod.naziv}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Results;
