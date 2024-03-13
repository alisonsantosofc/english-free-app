'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { ISchedule } from '@/features/schedules/@types/ISchedule';

interface ScheduleProviderProps {
  children: ReactNode;
}

interface ScheduleContextData {
  schedule: ISchedule | null;
  setSchedule: Dispatch<SetStateAction<ISchedule | null>>;
}

const ScheduleContext = createContext<ScheduleContextData>(
  {} as ScheduleContextData
);

export function ScheduleProvider({ children }: ScheduleProviderProps) {
	const [schedule, setSchedule] = useState<ISchedule | null>(null);

	return (
		<ScheduleContext.Provider value={{ schedule, setSchedule }}>
			{children}
		</ScheduleContext.Provider>
	);
}

export function useSchedule() {
	const context = useContext(ScheduleContext);

	return context;
}
