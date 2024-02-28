"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContextData {
  darkMode: boolean;
  handleChangeDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextData>(
  {} as DarkModeContextData
);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const localDarkMode = JSON.parse(
      localStorage.getItem('dark_mode') as string
    );

    if (localDarkMode) {
      setDarkMode(localDarkMode);
    }
  }, []);

  function handleChangeDarkMode() {
    // Saving data to local stoge
    localStorage.setItem(
      'dark_mode',
      JSON.stringify(!darkMode)
    );

    setDarkMode(!darkMode);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, handleChangeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  return context;
}
