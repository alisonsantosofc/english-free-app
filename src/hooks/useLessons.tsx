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
	getLessons: () => Promise<void>;
	getLessonsReqStatus: TRequestStatus;
	getLessonsReqCode: string;
	checkUserLesson: (data: CheckUserLessonProps) => Promise<void>;
	checkUserLessonReqStatus: TRequestStatus;
	checkUserLessonReqCode: string;
}

interface CheckUserLessonProps {
	lessonId: number;
	checked: boolean;
}

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData
);

export function LessonsProvider({ children }: LessonsProviderProps) {
	const [lessons, setLessons] = useState<ILesson[]>(
		JSON.parse(
		localStorage.getItem('lessons') as string
		) || []);

	const [getLessonsReqStatus, setGetLessonsReqStatus] = useState<TRequestStatus>('idle');
	const [getLessonsReqCode, setGetLessonsReqCode] = useState<string>('');
	const [checkUserLessonReqStatus, setCheckUserLessonReqStatus] = useState<TRequestStatus>('idle');
	const [checkUserLessonReqCode, setCheckUserLessonReqCode] = useState<string>('');

	async function getLessons() {
		try {
			setGetLessonsReqStatus('loading');

			const response = await axios.get('/api/lessons');
			const lessonsResponse = response.data as ILesson[];
			
			setLessons(lessonsResponse);
			// save data in local storage
			localStorage.setItem('lessons', JSON.stringify(lessonsResponse));
			
			setGetLessonsReqStatus('succeeded');
			setTimeout(() => {
				setGetLessonsReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setGetLessonsReqCode(error.response.data.code);
			setGetLessonsReqStatus('failed');
		}
	};

	async function checkUserLesson({ lessonId, checked }: CheckUserLessonProps) {
		try {
			setCheckUserLessonReqStatus('loading');

			await axios.post('/api/lessons/check', {
				lessonId,
				checked,
			});

			const lessonsUpdated = [...lessons];
			const lessonIndex = lessonsUpdated.findIndex(lesson => lesson.id === lessonId);
			lessonsUpdated[lessonIndex] = {
				...lessonsUpdated[lessonIndex],
				checked,
			};
			
			setLessons(lessonsUpdated);
			// save data in local storage
			localStorage.setItem('lessons', JSON.stringify(lessonsUpdated));
			
			setCheckUserLessonReqStatus('succeeded');
			setTimeout(() => {
				setCheckUserLessonReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setCheckUserLessonReqCode(error.response.data.code);
			setCheckUserLessonReqStatus('failed');
		}
	};
	
	return (
		<LessonsContext.Provider value={{ 
			lessons, 
			setLessons, 
			getLessons, 
			getLessonsReqStatus, 
			getLessonsReqCode,
			checkUserLesson,
			checkUserLessonReqStatus,
			checkUserLessonReqCode, 
		}}>
			{children}
		</LessonsContext.Provider>
	);
}

export function useLessons() {
	const context = useContext(LessonsContext);

	return context;
}
