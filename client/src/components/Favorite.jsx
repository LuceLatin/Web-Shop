import React from "react";
import { useFavorites } from "./FavoriteContext";

const Favorite = () => {
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useFavorites();

  const handleAddToFavorites = (item) => {
    addToFavorites(item);
  };

  const handleRemoveFromFavorites = (item) => {
    removeFromFavorites(item);
  };

  const handleClearFavorites = () => {
    clearFavorites();
  };

  return (
    <div className="container-css">
      <h2>Favoriti </h2>

      {favorites.length === 0 ? (
        <p>Još nema favorita.</p>
      ) : (
        <div>
          {favorites.map((item) => (
            <div key={item._id}>
              {item.naziv} - {item.cijena} kn
              <button onClick={() => handleRemoveFromFavorites(item)}>
                Ukloni iz favorita
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleClearFavorites}>Izbrisi sve favorite</button>
    </div>
  );
};

export default Favorite;
