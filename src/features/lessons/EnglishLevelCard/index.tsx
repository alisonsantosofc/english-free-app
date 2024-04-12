import { useEffect, useState } from 'react';
import { BookOpenCheck, Languages, Lightbulb, LucideIcon } from 'lucide-react';

import { Card } from '@/src/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion';
import { LessonCard } from '../LessonCard';

import { ILesson } from '@/src/features/lessons/@types/ILesson';
import { useLang } from '@/src/hooks/useLang';
import { useMainModal } from '@/src/hooks/useMainModal';
import { cn } from '@/src/lib/utils';

import i18n from './i18n.json';
import { ILevel, useLessons } from '@/src/hooks/useLessons';

interface EnglishLevelCardProps {
  level: ILevel;
}

export function EnglishLevelCard({ level }: EnglishLevelCardProps) {
	const { lang } = useLang();
	const { setMainModal } = useMainModal();

	function getLevelDescription() {
		switch (level.code) {
		case 'a1':
			return i18n[lang].content.levelsDescriptions.a1;
		case 'a2':
			return i18n[lang].content.levelsDescriptions.a2;
		case 'b1':
			return i18n[lang].content.levelsDescriptions.b1;
		case 'b2':
			return i18n[lang].content.levelsDescriptions.b2;
		case 'c1':
			return i18n[lang].content.levelsDescriptions.c1;
		case 'c2':
			return i18n[lang].content.levelsDescriptions.c2;

		default: 
			return '';
		}
	}
  
	return (
		<Card
			className="min-w-full p-6 border-var(--border)/5 flex flex-col justify-between transition"
		>
			<h4 className="text-xl font-medium mb-4">{`${level.code.toUpperCase()} - ${getLevelDescription().toUpperCase()}`}</h4>

			<Accordion className="flex flex-col justify-center" type="single" collapsible>
				{level.categories.map((category, i) => (
					<AccordionItem key={i} value={`item-${i + 1}`} className={cn('px-4', i === 0 ? 'border-t' : '')}>
						<AccordionTrigger>
							<div className="flex gap-1">
								<category.icon className={cn('h-5 w-5 md:h-6 md:w-6 mr-3')} />
								{category.title}
							</div>
						</AccordionTrigger>
						<AccordionContent className="grid xl:grid-cols-2 gap-2">
							{category.lessons.map((lesson) => (
								<Card
									key={lesson.id} 
									className={cn('flex items-center px-4 py-2 transition cursor-pointer', lesson.checked ? 'border-blue-800/5 bg-blue-800 hover:bg-blue-900 ' : 'border-var(--border)/5 hover:bg-black/5 dark:hover:bg-white/5' )} 
									onClick={() => setMainModal(
										<LessonCard lesson={lesson} onCloseModal={() => setMainModal(null)} />
									)}
								>
									<div className="flex gap-3 items-center">
										<div className={cn('min-w-6 min-h-6 rounded-md flex justify-center items-center', lesson.checked ? 'bg-white text-blue-800' : 'bg-blue-800 text-white')}>{lesson.priority}</div>
										<span className={cn('line-clamp-1', lesson.checked ? 'text-white' : '')}>{lesson.name}</span>
									</div>
								</Card>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</Card>
	);
}