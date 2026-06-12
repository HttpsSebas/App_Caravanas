import React, { createContext, useState, useContext } from "react";

const sheetNameContext = createContext<{
  sheetName: string;
  setSheetName: (name: string) => void;
}>(undefined as any);

export const SheetNameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sheetName, setSheetName] = useState("Lecturas");
    return (
    <sheetNameContext.Provider value={{ sheetName, setSheetName }}>
      {children}
    </sheetNameContext.Provider>
  );
};

export const useSheetName = () => {
  const context = useContext(sheetNameContext);
  if (!context) {
    throw new Error("useSheetName must be used within a SheetNameProvider");
  }
  return context;
};