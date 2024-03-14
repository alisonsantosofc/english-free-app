'use client';

import { CalendarCheck } from 'lucide-react';

import { Heading } from '@/src/components/custom/Heading';
import { ScrollArea } from '@/src/components/ui/scroll-area';

import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';
import SchedulesSelector from '@/src/features/schedules/SchedulesSelector';
import { useSchedules } from '@/src/hooks/useSchedules';

const SchedulesPage = () => {
	const { lang } = useLang();
	const { schedule } = useSchedules();

	return (
		<section className="w-full h-section">
			<Heading 
				title={i18n[lang].content.title}
				description={i18n[lang].content.textHighlight}
				icon={CalendarCheck}
				bgColor="bg-blue-800"
			/>
			<ScrollArea className="w-full h-scroll border-t-2">
				{
					schedule ? (
						<div>{schedule.months}</div>
					) : (
						<SchedulesSelector />	
					)
				}
			</ScrollArea>
		</section>
	);
};

export default SchedulesPage;