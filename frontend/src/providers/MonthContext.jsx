import React, { createContext, useState, useContext } from 'react';

const MonthContext = createContext();

export const useMonth = () => {
  return useContext(MonthContext);
};

export const MonthProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(3);

  const setMonth = (month) => {
    setSelectedMonth(month);
  };

  return (
    <MonthContext.Provider value={{ selectedMonth, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
};