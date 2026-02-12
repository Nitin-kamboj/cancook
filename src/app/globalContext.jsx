"use client";
import { createContext, useState, useContext, useEffect } from "react";

const globalContext = createContext();

export function GlobalProvider({ children }) {
  const [isLoggedIN, setLogIn] = useState(false);

  return (
    <globalContext.Provider value={{ isLoggedIN, setLogIn }}>
      {children}
    </globalContext.Provider>
  );
}
export const useGlobal = () => useContext(globalContext);