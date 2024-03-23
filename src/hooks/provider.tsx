import { LangProvider } from './useLang';
import { DarkModeProvider } from './useDarkMode';
import { MainModalProvider } from './useMainModal';
import { LessonsProvider } from './useLessons';
import { SchedulesProvider } from './useSchedules';
import { SessionsProvider } from './useSessions';

export function HooksProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LangProvider>
				<DarkModeProvider>
					<MainModalProvider>
						<SessionsProvider>
							<LessonsProvider>
								<SchedulesProvider>
									{children}
								</SchedulesProvider>
							</LessonsProvider>
						</SessionsProvider>
					</MainModalProvider>
				</DarkModeProvider>
			</LangProvider>
		</>
	);
}