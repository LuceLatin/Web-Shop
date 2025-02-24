import React from "react";
import { useFilter } from "./FilterContext";

const FilteredResults = () => {
  const { filteredProizvodi } = useFilter();

  return (
    <div>
      <h3>Filtrirani proizvodi:</h3>
      <ul>
        {filteredProizvodi.map(proizvod => (
          <li key={proizvod._id}>
            <strong>Naziv:</strong> {proizvod.naziv}, &nbsp;
            <strong>Postotak kakaa:</strong> {proizvod.postotakKakaa}%, &nbsp;
            <strong>Cijena:</strong> {proizvod.cijena} kn, &nbsp;
            <strong>Proizvođač:</strong> {proizvod.proizvodac.naziv}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredResults;
