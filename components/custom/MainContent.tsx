'use client';

import { ReactNode, useEffect } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
	const { darkMode } = useDarkMode();

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}

		return () => {
			document.body.classList.remove('dark');
		};
	}, [darkMode]);

	return (
		<>
			{localStorage && children}
		</>
	);
}