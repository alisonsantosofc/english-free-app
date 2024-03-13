import { ArrowRight, FileCheck2, FileClock, FileHeart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';
import { replaceStringWithParams } from '@/utils/strings';

import i18n from './i18n.json';
import schedulesWeeks from './schedulesWeeks.json';

export default function SchedulesSelector() {
	const { lang } = useLang();

	const studySchedules = [
		{
			id: 1,
			months: 3,
			minimumMinutesPerDay: 60,
			description: i18n[lang].content.schedules.threeMonths.description,
			tags: i18n[lang].content.schedules.threeMonths.tags,
			icon: FileClock,
			weeks: schedulesWeeks.weeks.threeMonths,
		},
		{
			id: 2,
			months: 6,
			minimumMinutesPerDay: 45,
			description: i18n[lang].content.schedules.sixMonths.description,
			tags: i18n[lang].content.schedules.sixMonths.tags,
			icon: FileHeart,
			weeks: schedulesWeeks.weeks.sixMonths,
		},
		{
			id: 3,
			months: 12,
			minimumMinutesPerDay: 30,
			description: i18n[lang].content.schedules.twelveMonths.description,
			tags: i18n[lang].content.schedules.twelveMonths.tags,
			icon: FileCheck2,
			weeks: schedulesWeeks.weeks.twelveMonths,
		}
	];

	return (
		<div className="w-full h-full grid lg:grid-cols-2 2xl:grid-cols-3 gap-8 my-4 sm:my-8 2xl:my-16 px-4 sm:px-28 md:px-8">
			{studySchedules.map((schedule) => (
				<div key={schedule.id} className={cn('flex flex-col flex-1 items-center p-6 pt-10 rounded-2xl border-4 border-blue-500 bg-blue-800 text-white')}>
					<schedule.icon className={cn('h-20 w-20 md:h-28 md:w-28', 'text-white')} />
                
					<h4 className="font-medium text-2xl mb-2 mt-8">
						{replaceStringWithParams(i18n[lang].content.scheduleTitle, {
							months: String(schedule.months),
						})}
					</h4>

					<div className="flex gap-2 items-center mb-8">
						<span>{schedule.tags[0].toUpperCase()}</span>
						<span className="inline-block min-h-4 min-w-[1px] bg-white"></span>
						<span>{schedule.tags[1].toUpperCase()}</span>
					</div>
                
					<div className="flex flex-col gap-2">
						<p>
							<strong>{i18n[lang].content.estimatedTime}</strong>
							{replaceStringWithParams(i18n[lang].content.minutesPerDay, {
								minutes: String(schedule.minimumMinutesPerDay),
							})}
						</p>

						<p>
							<strong>{i18n[lang].content.resultIn}</strong>
							{replaceStringWithParams(i18n[lang].content.resultInWeeks, {
								weeks: String(schedule.weeks.length),
							})}
						</p>

						<p>
							{schedule.description}
						</p>
					</div>

					<div className="mt-16">
						<Button 
							className="flex gap-2 bg-blue-300/80 text-blue-900 hover:bg-blue-300"
						>
							<span>{replaceStringWithParams(i18n[lang].content.scheduleButtonTitle, {
								months: String(schedule.months),
							})}</span>
							<ArrowRight className="w-5 h-5" />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
