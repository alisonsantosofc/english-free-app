'use client';

import { useEffect, useState } from 'react';
import { PlaySquare } from 'lucide-react';

import { Heading } from '@/src/components/custom/Heading';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { EnglishLevelCard } from '@/src/features/lessons/EnglishLevelCard';

import { ILesson } from '@/src/features/lessons/@types/ILesson';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';
import { useLessons } from '@/src/hooks/useLessons';
import { toast } from '@/src/components/ui/use-toast';

interface ILevel {
  level: string;
  lessons: ILesson[];
}

const LessonsPage = () => {
	const { lang } = useLang();
	const { lessons, getLessons, getLessonsReqStatus, getLessonsReqCode } = useLessons();

	const [levels, setLevels] = useState<ILevel[]>([]);

	useEffect(() => {
		if (!lessons.length) {
			getLessons();
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
	}, [lessons]);

	// Monitor get lessons request
	useEffect(() => {
		if (getLessonsReqStatus === 'failed') {
			toast({
				description: (i18n as any)[lang].requests[getLessonsReqCode].message,
				variant: (i18n as any)[lang].requests[getLessonsReqCode].variant,
			});
		}
	}, [getLessonsReqStatus]);
	
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
							getLessonsReqStatus === 'loading' ? 'Carregando...' : (
								levels.map((level, i) => (
									<EnglishLevelCard 
										key={i}
										level={level.level} 
										lessons={level.lessons}
									/>
								))
							)
						} 
					</div>
				</div>
			</ScrollArea>
		</section>
	);
};

export default LessonsPage;