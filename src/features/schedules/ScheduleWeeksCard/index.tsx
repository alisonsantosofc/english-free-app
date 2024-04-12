import { Card } from '@/src/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion';
import { LessonCard } from '../../lessons/LessonCard';

import { useLang } from '@/src/hooks/useLang';
import { useSchedules } from '@/src/hooks/useSchedules';
import { useMainModal } from '@/src/hooks/useMainModal';
import { cn } from '@/src/lib/utils';

import i18n from './i18n.json';
import { Button } from '@/src/components/ui/button';
import { useLessons } from '@/src/hooks/useLessons';

export function ScheduleWeeksCard() {
	const { lang } = useLang();
	const { handleSelectOtherSchedule } = useSchedules();
	const { scheduleWeeks } = useLessons();
	const { setMainModal } = useMainModal();
  
	return (
		<Card
			className="min-w-full p-6 border-var(--border)/5 flex flex-col justify-between transition"
		>
			<div className="flex justify-between">
				<h4 className="text-xl font-medium mb-4">{'Aulas'}</h4>
				<Button
					className="p-0 m-0 h-fit font-normal"
					variant="underlink"
					onClick={() => handleSelectOtherSchedule()}
				>
					{i18n[lang].content.buttons.selectOtherSchedule}
				</Button>
			</div>

			<Accordion className="flex flex-col justify-center" type="single" collapsible>
				{scheduleWeeks.map((week, i) => (
					<AccordionItem key={i} value={`item-${i + 1}`} className={cn('px-4', i === 0 ? 'border-t' : '')}>
						<AccordionTrigger>
							<div className="flex gap-1">
								{week.title}
							</div>
						</AccordionTrigger>
						<AccordionContent className="grid xl:grid-cols-2 gap-2">
							{week.lessons.map((lesson, index) => (
								<Card
									key={lesson.id} 
									className={cn('flex items-center px-4 py-2 transition cursor-pointer', lesson.checked ? 'border-blue-800/5 bg-blue-800 hover:bg-blue-900 ' : 'border-var(--border)/5 hover:bg-black/5 dark:hover:bg-white/5' )} 
									onClick={() => setMainModal(
										<LessonCard lesson={lesson} fromSchedule={true} onCloseModal={() => setMainModal(null)} />
									)}
								>
									<div className="flex gap-3 items-center">
										<div className={cn('min-w-6 min-h-6 rounded-md flex justify-center items-center', lesson.checked ? 'bg-white text-blue-800' : 'bg-blue-800 text-white')}>{index + 1}</div>
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