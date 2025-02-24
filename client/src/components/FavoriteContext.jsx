import React, { createContext, useContext, useReducer } from "react";

const FavoriteContext = createContext();

const initialState = {
  favoriteItems: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
        // Provjeri je li proizvod već u favoritima prije dodavanja
        const isAlreadyInFavorites = state.favoriteItems.some(
          (item) => item._id === action.payload._id
        );
  
        if (isAlreadyInFavorites) {
          // Ako je već u favoritima, vrati trenutno stanje
          return state;
        }
  
        // Inače dodaj proizvod u favorite
        return {
          ...state,
          favoriteItems: [...state.favoriteItems, action.payload],
        };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "CLEAR_FAVORITES":
      return {
        ...state,
        favoriteItems: [],
      };

    default:
      return state;
  }
};

const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  const addToFavorites = (item) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: item });
  };

  const removeFromFavorites = (item) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
  };

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites: state.favoriteItems,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};

export { FavoriteProvider, useFavorites };
