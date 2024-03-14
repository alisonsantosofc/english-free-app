'use client';

import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { ILesson } from '@/src/features/lessons/@types/ILesson';
import { TRequestStatus } from '@/src/@types/IRequest';

interface LessonsProviderProps {
  children: ReactNode;
}

interface LessonsContextData {
  lessons: ILesson[];
  setLessons: Dispatch<SetStateAction<ILesson[]>>;
	fetchLessons: () => Promise<void>;
	fetchLessonsReqStatus: TRequestStatus;
}

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData
);

export function LessonsProvider({ children }: LessonsProviderProps) {
	const [lessons, setLessons] = useState<ILesson[]>([]);
	const [fetchLessonsReqStatus, setFetchLessonsReqStatus] = useState<TRequestStatus>('idle');

	async function fetchLessons() {
		try {
			setFetchLessonsReqStatus('loading');
			const response = await axios.get('/api/lessons');

			const lessonsResponse = response.data as ILesson[];

			setLessons(lessonsResponse);
			
			setFetchLessonsReqStatus('succeeded');

			setTimeout(() => {
				setFetchLessonsReqStatus('idle');
			}, 500);
		} catch (error) {
			setFetchLessonsReqStatus('failed');
		}
	};

	return (
		<LessonsContext.Provider value={{ lessons, setLessons, fetchLessons, fetchLessonsReqStatus }}>
			{children}
		</LessonsContext.Provider>
	);
}

export function useLessons() {
	const context = useContext(LessonsContext);

	return context;
}
