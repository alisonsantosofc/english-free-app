'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlaySquare } from 'lucide-react';

import { Heading } from '@/components/custom/Heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EnglishLevelCard } from '@/features/lessons/EnglishLevelCard';

import { ILesson } from '@/features/lessons/@types/ILesson';
import { useLang } from '@/hooks/useLang';

import i18n from './i18n.json';
import { useLessons } from '@/hooks/useLessons';

interface ILevel {
  level: string;
  lessons: ILesson[];
}

const LessonsPage = () => {
	const { lang } = useLang();
	const { lessons, fetchLessons } = useLessons();

	const [levels, setLevels] = useState<ILevel[]>([]);

	useEffect(() => {
		if (!lessons.length) {
			fetchLessons();
		}
	}, []);

	useEffect(() => {
		const a1 = {
			level: 'a1',
			lessons: lessons.filter((lesson) => lesson.level === 'a1'),
		};
		const a2 = {
			level: 'a2',
			lessons: lessons.filter((lesson) => lesson.level === 'a2'),
		};
		const b1 = {
			level: 'b1',
			lessons: lessons.filter((lesson) => lesson.level === 'b1'),
		};
		const b2 = {
			level: 'b2',
			lessons: lessons.filter((lesson) => lesson.level === 'b2'),
		};
		const c1 = {
			level: 'c1',
			lessons: lessons.filter((lesson) => lesson.level === 'c1'),
		};
		const c2 = {
			level: 'c2',
			lessons: lessons.filter((lesson) => lesson.level === 'c2'),
		};

		setLevels([a1, a2, b1, b2, c1, c2]);
		console.log({ levels });
	}, [lessons]);

	return (
		<section className="w-full h-section">
			<Heading 
				title={i18n[lang].content.title}
				description={i18n[lang].content.description}
				icon={PlaySquare}
				bgColor="bg-red-500"
			/>
			<ScrollArea className="w-full h-scroll border-t-2">
				<div className="my-4 sm:my-8 px-4 sm:px-8 min-w-full">
					<div className="space-y-4">
						{
							levels.map((level, i) => (
								<EnglishLevelCard 
									key={i}
									level={level.level} 
									lessons={level.lessons}
								/>
							))
						} 
					</div>
				</div>
			</ScrollArea>
		</section>
	);
};

export default LessonsPage;