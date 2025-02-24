import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoriteContext";

const DetaljiProizvoda = () => {
  const { id } = useParams();
  const [proizvod, setProizvod] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();

  const handleAddToCart = () => {
    addToCart(proizvod);
  };

  const handleAddToFavorites = () => {
    addToFavorites(proizvod);
  };

  useEffect(() => {
    fetchProizvod();
  }, [id]);

  const fetchProizvod = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.isAdmin);
    }
    try {
      const response = await fetch(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const proizvodData = await response.json();
      setProizvod(proizvodData);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvoda:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/proizvod/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error(
          "Nije moguće izbrisati proizvod. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom brisanja proizvoda:", error.message);
    }
  };

  if (!proizvod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-css">
      <h1>Detalji proizvoda</h1>
      <h3>{proizvod.naziv}</h3>
      <p>Cijena: {proizvod.cijena} kn</p>
      <p>Postotak kakaa: {proizvod.postotakKakaa}</p>
      <p>Boja: {proizvod.boja}</p>
      <p>Tip: {proizvod.tip}</p>
      <p>Proizvodac: {proizvod.proizvodac.naziv}</p>
      <Link to={`/proizvodac/${proizvod.proizvodac._id}`}>
        <button className="button-css">Pogledaj detalje o proizvodacu</button>
      </Link>
      {isAdmin && (
        <div>
          <button className="button-css" onClick={handleDelete}>
            Izbriši proizvod
          </button>
          <Link to={`/proizvod/update/${proizvod._id}`}>
            <button className="button-css">Uredi proizvod</button>
          </Link>
        </div>
      )}

      <button className="button-css" onClick={handleAddToCart}>
        Dodaj u košaricu
      </button>
      <button className="button-css" onClick={handleAddToFavorites}>
        Dodaj u favorite
      </button>
    </div>
  );
};

export default DetaljiProizvoda;
