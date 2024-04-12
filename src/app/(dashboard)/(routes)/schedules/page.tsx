'use client';

import { useEffect } from 'react';
import { CalendarCheck } from 'lucide-react';

import { Heading } from '@/src/components/custom/Heading';
import { ScrollArea } from '@/src/components/ui/scroll-area';

import { useLang } from '@/src/hooks/useLang';
import { useLessons } from '@/src/hooks/useLessons';
import { useSchedules } from '@/src/hooks/useSchedules';

import i18n from './i18n.json';
import SchedulesSelector from '@/src/features/schedules/SchedulesSelector';
import { toast } from '@/src/components/ui/use-toast';
import { ScheduleWeeksCard } from '@/src/features/schedules/ScheduleWeeksCard';

const SchedulesPage = () => {
	const { lang } = useLang();
	const { lessons, getLessons, getLessonsReqStatus, getLessonsReqCode } = useLessons();
	const { userSchedule } = useSchedules();

	useEffect(() => {
		if (!lessons.length) {
			getLessons();
		}
	}, []);

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
				title={userSchedule ? `Cronograma de ${userSchedule.months} meses` : i18n[lang].content.title}
				description={userSchedule ? userSchedule.description : i18n[lang].content.textHighlight}
				icon={CalendarCheck}
				bgColor="bg-blue-800"
			/>
			<ScrollArea className="w-full h-scroll border-t-2">
				{
					userSchedule ? (
						<div className="p-8">
							{
								getLessonsReqStatus === 'loading' ? 'Carregando...' : (
									<ScheduleWeeksCard />
								)
							} 
						</div>
					) : (
						<SchedulesSelector />	
					)
				}
			</ScrollArea>
		</section>
	);
};

export default SchedulesPage;