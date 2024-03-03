'use client';

import { ArrowRight, CalendarCheck, FileHeart, FileClock, FileCheck2 } from 'lucide-react';

import { Heading } from '@/components/custom/Heading';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';

import i18n from './i18n.json';
import { replaceStringWithParams } from '@/utils/strings';

const SchedulesPage = () => {
	const { lang } = useLang();
	
	const studySchedules = [
		{
			id: 1,
			months: 3,
			weeks: 13,
			minimumMinutesPerDay: 60,
			description: i18n[lang].content.schedules.threeMonths.description,
			tags: i18n[lang].content.schedules.threeMonths.tags,
			icon: FileClock,
		},
		{
			id: 2,
			months: 6,
			weeks: 26,
			minimumMinutesPerDay: 45,
			description: i18n[lang].content.schedules.sixMonths.description,
			tags: i18n[lang].content.schedules.sixMonths.tags,
			icon: FileHeart,
		},
		{
			id: 3,
			months: 12,
			weeks: 52,
			minimumMinutesPerDay: 30,
			description: i18n[lang].content.schedules.twelveMonths.description,
			tags: i18n[lang].content.schedules.twelveMonths.tags,
			icon: FileCheck2,
		}
	];

	return (
		<section className="h-full">
			<Heading 
				title={i18n[lang].content.title}
				description={i18n[lang].content.textHighlight}
				icon={CalendarCheck}
				bgColor="bg-blue-800"
			/>
			<div className="px-4 lg:px-8">
				<div className="space-y-4 mt-16">
					<div className="w-full h-[600px] flex gap-8 lg:gap-16">
						{studySchedules.map((schedule) => (
							<div key={schedule.id} className={cn('flex flex-col flex-1 items-center p-6 pt-10 rounded-2xl border-4 border-blue-500 bg-blue-800 text-white')}>
								<schedule.icon className={cn('h-10 w-10 md:h-28 md:w-28', 'text-white')} />
                
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
											weeks: String(schedule.weeks),
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
				</div>
			</div>
		</section>
	);
};

export default SchedulesPage;