import { useEffect, useState } from 'react';
import { BookOpenCheck, Languages, Lightbulb, LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import { ILesson } from '@/features/lessons/@types/ILesson';
import { cn } from '@/lib/utils';

import i18n from './i18n.json';
import { useLang } from '@/hooks/useLang';

interface EnglishLevelCardProps {
  level: string;
  lessons: ILesson[];
}

interface LevelCategory {
  title: string;
  lessons: ILesson[];
  icon: LucideIcon;
}

export function EnglishLevelCard({ level, lessons }: EnglishLevelCardProps) {
	const { lang } = useLang();
	const [categories, setCategories] = useState<LevelCategory[]>([]);

	useEffect(() => {
		const grammarLessons = {
			title: i18n[lang].content.categoriesTitles.grammar,
			icon: Languages,
			lessons: lessons.filter((lesson) => lesson.category === 'grammar'),
		}; 
		const vocabularyLessons = {
			title: i18n[lang].content.categoriesTitles.vocabulary,
			icon: BookOpenCheck,
			lessons: lessons.filter((lesson) => lesson.category === 'vocabulary'),
		}; 
		const topicsLesssons = {
			title: i18n[lang].content.categoriesTitles.topics,
			icon: Lightbulb,
			lessons: lessons.filter((lesson) => lesson.category === 'topics'),
		}; 

		setCategories([grammarLessons, vocabularyLessons, topicsLesssons]);
	}, [lang]);

	function getLevelDescription() {
		switch (level) {
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
			className="p-6 border-var(--border)/5 flex flex-col justify-between transition"
		>
			<h4 className="text-xl font-medium mb-4">{`${level.toUpperCase()} - ${getLevelDescription().toUpperCase()}`}</h4>

			<Accordion className="flex flex-col justify-center" type="single" collapsible>
				{categories.map((category, i) => (
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
									className="flex items-center px-4 py-2 border-var(--border)/5 transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
								>
									<div className="flex gap-3 items-center">
										<div className="min-w-6 min-h-6 bg-blue-800 rounded-md flex justify-center items-center text-white">{lesson.priority}</div>
										<span>{lesson.name}</span>
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