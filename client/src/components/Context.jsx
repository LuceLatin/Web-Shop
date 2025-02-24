import { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

export const useResultsContext = () => {
  return useContext(ResultsContext);
};

export const ResultsProvider = ({ children }) => {
  const [filteredProizvodi, setFilteredProizvodi] = useState([]);

  const value = {
    filteredProizvodi,
    setFilteredProizvodi,
  };

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  );
};
