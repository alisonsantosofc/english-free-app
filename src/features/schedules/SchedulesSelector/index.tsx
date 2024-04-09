import { ArrowRight } from 'lucide-react';
import { Card } from '@/src/components/ui/card';

import { useLang } from '@/src/hooks/useLang';
import { useSchedules } from '@/src/hooks/useSchedules';
import { cn } from '@/src/lib/utils';
import { replaceStringWithParams } from '@/src/utils/strings';

import i18n from './i18n.json';

export default function SchedulesSelector() {
	const { lang } = useLang();
	const { studySchedules, handleSelectSchedule } = useSchedules();

	return (
		<div className="w-full h-full flex flex-col gap-4 my-4 sm:my-8 px-4 sm:px-28 md:px-32 md:pt-4">
			{studySchedules.map((schedule) => (
				<Card 
					key={schedule.id}
					onClick={() => handleSelectSchedule(schedule)}
					className="p-4 border-var(--border)/5 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
				>
					<div className="flex items-center gap-x-4">
						<div className={cn('p-2 w-fit rounded-xl bg-blue-800')}>
							<schedule.icon className={cn('w-6 h-6 md:w-8 md:h-8 text-white')} />
						</div>
						<div className="font-semibold">
							{replaceStringWithParams(i18n[lang].content.scheduleTitle, {
								months: String(schedule.months),
							})}
						</div>
					</div>
					<ArrowRight className="w-5 h-5 text-zinc-500" />
				</Card>
			))}
		</div>
	);
}
