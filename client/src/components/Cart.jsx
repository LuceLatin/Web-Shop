import React from "react";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart } = useCart();
  const { removeFromCart } = useCart();
  const { clearCart } = useCart();

  const renderCartItem = (item, index) => (
    <tr key={`${item._id}-${index}`}>
      <td>{item.naziv} </td>
      <td>{item.cijena} kn</td>
      <td>{item.kolicina} </td>
      <td>{(item.cijena * item.kolicina).toFixed(2)} kn</td>
      <td>
        <button onClick={() => removeFromCart(item)}>Ukloni proizvod</button>
      </td>
    </tr>
  );

  const handleCheckOut = () => {
    clearCart();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.kolicina === 0) {
        item.kolicina = 1;
      }

      const itemCijena = Number(item.cijena);
      const itemKolicina = Number(item.kolicina);

      if (!isNaN(itemCijena) && !isNaN(itemKolicina)) {
        return total + itemCijena * itemKolicina;
      } else {
        console.error(
          `Invalid price or quantity for item with ID: ${item._id}`
        );
        return total;
      }
    }, 0);
  };

  return (
    <div className="container-css">
      <h1>Kosarica </h1>
      <div className="list-container">
        {cart.length === 0 ? (
          <p>Kosarica je prazna.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Proizvod </th>
                <th>Cijena po komadu </th>
                <th>Kolicina </th>
                <th>Ukupna cijena </th>
              </tr>
            </thead>
            <tbody>{cart.map(renderCartItem)}</tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Ukupno:</td>
                <td>{calculateTotalPrice().toFixed(2)} kn</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      <button onClick={handleCheckOut}>Ukloni sve</button>
    </div>
  );
};

export default Cart;
