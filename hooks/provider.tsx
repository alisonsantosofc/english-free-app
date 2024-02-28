import { LangProvider } from './useLang';
import { DarkModeProvider } from './useDarkMode';

export function HooksProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LangProvider>
				<DarkModeProvider>
					{children}
				</DarkModeProvider>
			</LangProvider>
		</>
	);
}