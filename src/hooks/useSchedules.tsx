'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { ISchedule } from '@/src/features/schedules/@types/ISchedule';

interface SchedulesProviderProps {
  children: ReactNode;
}

interface SchedulesContextData {
  schedule: ISchedule | null;
  setSchedule: Dispatch<SetStateAction<ISchedule | null>>;
}

const SchedulesContext = createContext<SchedulesContextData>(
  {} as SchedulesContextData
);

export function SchedulesProvider({ children }: SchedulesProviderProps) {
	const [schedule, setSchedule] = useState<ISchedule | null>(null);

	return (
		<SchedulesContext.Provider value={{ schedule, setSchedule }}>
			{children}
		</SchedulesContext.Provider>
	);
}

export function useSchedules() {
	const context = useContext(SchedulesContext);

	return context;
}
