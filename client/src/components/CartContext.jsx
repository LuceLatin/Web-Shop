import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (existing) => existing._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedCartItems = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, kolicina: item.kolicina + 1 }
            : item
        );

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If the item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, kolicina: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cartItems.map((item) => {
        if (item._id === action.payload._id) {
          // If the quantity is greater than 1, decrement it; otherwise, remove the item
          return {
            ...item,
            kolicina: item.kolicina > 1 ? item.kolicina - 1 : 0,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItems.filter((item) => item.kolicina > 0), // Remove items with quantity 0
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    //  postoji li već proizvod u košarici
    const existingItem = state.cartItems.find(
      (existing) => existing._id === item._id
    );

    // Ako postoji, ažuriraj količinu, inače dodaj novi proizvod
    if (existingItem) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...existingItem, kolicina: existingItem.kolicina + 1 },
      });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: { ...item, kolicina: 1 } });
    }
  };

  const removeFromCart = (item) => {
    // Provjeri postoji li već proizvod u košarici
    const existingItem = state.cartItems.find(
      (existing) => existing._id === item._id
    );

    // Ako postoji i količina veća od 1, ažuriraj količinu, inače ukloni proizvod
    if (existingItem && existingItem.kolicina > 1) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { ...existingItem, kolicina: existingItem.kolicina - 1 },
      });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: item });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart: state.cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
