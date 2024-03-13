import { LangProvider } from './useLang';
import { DarkModeProvider } from './useDarkMode';
import { MainModalProvider } from './useMainModal';
import { LessonsProvider } from './useLessons';
import { ScheduleProvider } from './useSchedule';

export function HooksProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LangProvider>
				<DarkModeProvider>
					<MainModalProvider>
						<LessonsProvider>
							<ScheduleProvider>
								{children}
							</ScheduleProvider>
						</LessonsProvider>
					</MainModalProvider>
				</DarkModeProvider>
			</LangProvider>
		</>
	);
}