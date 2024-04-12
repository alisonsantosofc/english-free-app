'use client';

import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { BookOpenCheck, Languages, Lightbulb, LucideIcon } from 'lucide-react';

import { ILesson } from '@/src/features/lessons/@types/ILesson';
import { TRequestStatus } from '@/src/@types/IRequest';

import i18n from '../i18n/useLessons.i18n.json';
import { useLang } from './useLang';

interface LessonsProviderProps {
  children: ReactNode;
}

interface LessonsContextData {
  lessons: ILesson[];
	levels: ILevel[];
	getLessonByLevelCategory: (lessonId: number) => ILesson;
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

export interface ILevel {
  code: string;
  categories: LevelCategory[];
}

export interface LevelCategory {
  title: string;
  lessons: ILesson[];
  icon: LucideIcon;
}

interface FormatLessonsForCategoryProps {
	category: 'grammar' | 'vocabulary' | 'topics';
	lessons: ILesson[];
}

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData
);

export function LessonsProvider({ children }: LessonsProviderProps) {
	const { lang } = useLang();

	// +++++ Main State +++++
	const [lessons, setLessons] = useState<ILesson[]>(
		JSON.parse(
		localStorage.getItem('lessons') as string
		) || []);
	// ----- Main State -----

	// +++++ By Levels +++++
	const [levels, setLevels] = useState<ILevel[]>([]);

	function formatLessonsForCategory({ category, lessons }: FormatLessonsForCategoryProps) {
		const lessonsFiltered = lessons.filter((lesson) => lesson.category === category).sort((a, b) => a.priority < b.priority ? -1 : 1);
		const lessonsMapped = lessonsFiltered.map((lesson, index) => {
			const previousLessonId = index && index < lessonsFiltered.length ? lessonsFiltered[index - 1].id : null;
			const nextLessonId = index < lessonsFiltered.length - 1 ? lessonsFiltered[index + 1].id : null;

			return {
				...lesson,
				previousLessonId,
				nextLessonId,
			};
		});

		return lessonsMapped; 
	}

	function getLevelCategories(lessons: ILesson[]): LevelCategory[] {
		const grammarLessons = {
			title: i18n[lang].content.categoriesTitles.grammar,
			icon: Languages,
			lessons: formatLessonsForCategory({
				category: 'grammar',
				lessons,
			}),
		}; 
		const vocabularyLessons = {
			title: i18n[lang].content.categoriesTitles.vocabulary,
			icon: BookOpenCheck,
			lessons: formatLessonsForCategory({
				category: 'vocabulary',
				lessons,
			}),
		}; 
		const topicsLesssons = {
			title: i18n[lang].content.categoriesTitles.topics,
			icon: Lightbulb,
			lessons: formatLessonsForCategory({
				category: 'topics',
				lessons,
			}),
		};

		return [grammarLessons, vocabularyLessons, topicsLesssons];
	}

	useEffect(() => {
		const a1 = {
			code: 'a1',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'a1')),
		};
		const a2 = {
			code: 'a2',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'a2')),
		};
		const b1 = {
			code: 'b1',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'b1')),
		};
		const b2 = {
			code: 'b2',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'b2')),
		};
		const c1 = {
			code: 'c1',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'c1')),
		};
		const c2 = {
			code: 'c2',
			categories: getLevelCategories(lessons.filter((lesson) => lesson.level === 'c2')),
		};
		
		setLevels([a1, a2, b1, b2, c1, c2]);
	}, [lessons]);

	function getLessonByLevelCategory(lessonId: number): ILesson {
		let lessonsForFilter: ILesson[] = [];

		levels.forEach(level => {
			lessonsForFilter = [
				...lessonsForFilter,
				...level.categories[0].lessons,
				...level.categories[1].lessons,
				...level.categories[2].lessons
			];
		});

		const lesson = lessonsForFilter.filter((lesson) => lesson.id === lessonId)[0];

		return lesson;
	}
	// ----- By Levels -----

	// +++++ Requests +++++
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
	// ----- Requests -----
	
	return (
		<LessonsContext.Provider value={{ 
			lessons, 
			levels,
			getLessonByLevelCategory, 
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
