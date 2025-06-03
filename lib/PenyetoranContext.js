import { createContext, useContext, useState } from 'react';

const PenyetoranContext = createContext();

export const PenyetoranProvider = ({ children }) => {
  const [itemSampah, setItemSampah] = useState([]);

  return (
    <PenyetoranContext.Provider value={{ itemSampah, setItemSampah }}>
      {children}
    </PenyetoranContext.Provider>
  );
};

export const usePenyetoran = () => useContext(PenyetoranContext);
