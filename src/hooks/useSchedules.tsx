'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { Flame, Star, Timer } from 'lucide-react';

import { ISchedule } from '@/src/features/schedules/@types/ISchedule';
import { useLang } from './useLang';

import schedulesWeekLessons from '../features/schedules/schedulesWeekLessons.json';
import i18n from '../features/schedules/i18n.json';

interface SchedulesProviderProps {
  children: ReactNode;
}

interface SchedulesContextData {
	studySchedules: ISchedule[];
  userSchedule: ISchedule | null;
  handleSelectSchedule: (schedule: ISchedule) => void;
	handleSelectOtherSchedule: () => void;
}

const SchedulesContext = createContext<SchedulesContextData>(
  {} as SchedulesContextData
);

export function SchedulesProvider({ children }: SchedulesProviderProps) {
	const { lang } = useLang();
	
	const studySchedules = [
		{
			id: 1,
			months: 6,
			description: i18n[lang].content.schedules.sixMonths.description,
			tags: i18n[lang].content.schedules.sixMonths.tags,
			icon: Flame,
			weeks: schedulesWeekLessons.weeks.sixMonths,
		},
		{
			id: 2,
			months: 12,
			description: i18n[lang].content.schedules.twelveMonths.description,
			tags: i18n[lang].content.schedules.twelveMonths.tags,
			icon: Star,
			weeks: schedulesWeekLessons.weeks.twelveMonths,
		},
		{
			id: 3,
			months: 24,
			description: i18n[lang].content.schedules.twelveMonths.description,
			tags: i18n[lang].content.schedules.twelveMonths.tags,
			icon: Timer,
			weeks: schedulesWeekLessons.weeks.twentyFourMonths,
		},
	];

	const [userSchedule, setUserSchedule] = useState<ISchedule | null>(
		studySchedules.filter(schedule => schedule.id === JSON.parse(
		localStorage.getItem('scheduleId') as string
		))[0] || null
	);

	function handleSelectSchedule(schedule: ISchedule) {
		setUserSchedule(schedule);
		// save data in local storage
		localStorage.setItem('scheduleId', JSON.stringify(schedule.id));
	}

	function handleSelectOtherSchedule() {
		setUserSchedule(null);
		// save data in local storage
		localStorage.setItem('scheduleId', JSON.stringify(''));
	}

	return (
		<SchedulesContext.Provider value={{ studySchedules, userSchedule, handleSelectSchedule, handleSelectOtherSchedule }}>
			{children}
		</SchedulesContext.Provider>
	);
}

export function useSchedules() {
	const context = useContext(SchedulesContext);

	return context;
}
