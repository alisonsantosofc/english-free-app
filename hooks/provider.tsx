import { LangProvider } from './useLang';
import { DarkModeProvider } from './useDarkMode';
import { MainModalProvider } from './useMainModal';

export function HooksProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LangProvider>
				<DarkModeProvider>
					<MainModalProvider>
						{children}
					</MainModalProvider>
				</DarkModeProvider>
			</LangProvider>
		</>
	);
}