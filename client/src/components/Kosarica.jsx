import React from 'react';

const Kosarica = ({ kosarica, ukloniIzKosarice }) => {
  return (
    <div>
      <h2>Košarica</h2>
      <ul>
        {kosarica.map((proizvod) => (
          <li key={proizvod.id}>
            {proizvod.naziv} - {proizvod.cijena} kn
            <button onClick={() => ukloniIzKosarice(proizvod.id)}>Ukloni</button>
          </li>
        ))}
      </ul>
      <p>Ukupna cijena: {kosarica.reduce((sum, proizvod) => sum + proizvod.cijena, 0)} kn</p>
    </div>
  );
};

export default Kosarica;
