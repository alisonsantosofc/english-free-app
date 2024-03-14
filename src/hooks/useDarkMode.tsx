'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContextData {
  darkMode: boolean | null;
  handleChangeDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextData>(
  {} as DarkModeContextData
);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
	const [darkMode, setDarkMode] = useState<boolean | null>(null);

	useEffect(() => {
		const localDarkMode = JSON.parse(
      window.localStorage.getItem('dark_mode') as string
		);

		if (localDarkMode !== null) {
			setDarkMode(localDarkMode);
		}
	}, []);

	function handleChangeDarkMode() {
		// Saving data to local stoge
		window.localStorage.setItem(
			'dark_mode',
			JSON.stringify(!darkMode)
		);

		const newDarkMode = darkMode ? false : !darkMode ? true : null;

		setDarkMode(newDarkMode);
	}

	return (
		<DarkModeContext.Provider value={{ darkMode, handleChangeDarkMode }}>
			{darkMode !== null && children}
		</DarkModeContext.Provider>
	);
}

export function useDarkMode() {
	const context = useContext(DarkModeContext);

	return context;
}
