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
			minimumMinutesPerDay: 60,
			description: i18n[lang].content.schedules.threeMonths.description,
			tags: i18n[lang].content.schedules.threeMonths.tags,
			icon: FileClock,
			weeks: [
				[1,2,3,4,5,22,7,23,24,25,26,27,28,29,43,44,45,46,47,48,49],
				[8,9,10,11,12,13,14,30,31,32,33,34,35,36,50,51,52,53,54,55,277],
				[15,16,17,18,19,20,21,37,38,39,40,41,42,71,89,90,91,92,93,94,95],
				[56,57,58,59,60,61,62,72,73,74,75,76,77,78,96,97,98,99,100,101,102],
				[63,64,65,66,67,68,69,79,80,81,82,83,84,85,103,104,105,106,107,108,109],
				[111,112,113,114,115,116,86,127,128,129,130,131,132,144,145,146,147,148],
				[117,118,119,120,121,122,123,133,134,135,136,137,138,139,149,150,151,152,153,154,155],
				[124,125,157,158,159,160,161,140,141,142,181,182,183,184,156,197,198,199,200,201,202],
				[162,163,164,165,166,167,168,185,186,187,188,189,190,191,203,236,237,238,239,240,241],
				[169,170,171,172,173,174,175,192,193,194,195,196,222,223,242,243,244,245,246,247,275],
				[204,205,206,207,208,209,210,224,225,226,227,228,229,230,276,277,278,279,280,281,282],
				[211,212,213,214,215,216,217,231,232,233,234,235,257,258,283,284,285,286,287,259,260],
				[218,205,220,248,249,250,251,261,262,263,264,265]
			],
		},
		{
			id: 2,
			months: 6,
			minimumMinutesPerDay: 45,
			description: i18n[lang].content.schedules.sixMonths.description,
			tags: i18n[lang].content.schedules.sixMonths.tags,
			icon: FileHeart,
			weeks: [
				[1,2,3,23,24,25,43,44,45,46],
				[4,5,22,26,27,28,47,48,49,50],
				[7,8,9,29,30,31,32,51,52,53],
				[10,11,12,13,33,34,35,36,54],
				[14,15,16,17,37,38,39,40,89,90],
				[18,19,20,41,42,71,72,73,91,92],
				[21,56,57,58,74,75,76,93,94,95],
				[59,60,61,62,77,78,79,96,97,98],
				[63,64,65,80,81,82,99,100,101,102],
				[66,67,68,69,83,84,85,103,104,105],
				[70,111,112,86,127,128,129,106,107,108],
				[113,114,115,130,131,132,109,110,143,144],
				[116,117,118,133,134,135,136,145,146,147],
				[119,120,121,137,138,139,140,148,149,150],
				[122,123,124,141,142,181,151,152,153,154],
				[125,157,158,159,182,183,184,185,155,156],
				[160,161,162,186,187,188,197,198,199,200],
				[163,164,165,189,190,191,201,202,203,236],
				[166,167,168,169,192,193,194,237,238,239],
				[170,171,172,195,196,222,223,240,241,242],
				[173,174,175,224,225,226,227,275,276,277],
				[204,205,206,207,208,228,229,230,278,279],
				[209,210,211,212,231,232,233,234,280,281],
				[213,214,215,216,235,257,258,259,282,283],
				[217,218,220,248,260,261,262,284,285],
				[249,250,251,252,253,263,264,265,286,287],
			],
		},
		{
			id: 3,
			months: 12,
			minimumMinutesPerDay: 30,
			description: i18n[lang].content.schedules.twelveMonths.description,
			tags: i18n[lang].content.schedules.twelveMonths.tags,
			icon: FileCheck2,
			weeks: [
				[]
			],
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
			<div className="h-full px-4 lg:px-8">
				<div className="h-full space-y-4 mt-16">
					<div className="w-full h-full pb-16 grid lg:grid-cols-2 2xl:grid-cols-3 gap-8 sm:px-28 md:px-8 lg:px-0 ">
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