import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filteredProizvodi, setFilteredProizvodi] = useState([]);

  const setFilter = (data) => {
    setFilteredProizvodi(data);
  };

  return (
    <FilterContext.Provider value={{ filteredProizvodi, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};