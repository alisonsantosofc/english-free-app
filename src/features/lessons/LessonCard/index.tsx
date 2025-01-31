'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, VideoOff } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { CustomIframe } from '@/src/components/custom/CustomIframe';
import CustomCheckbox from '@/src/components/custom/CustomCheckbox';

import { ILesson } from '../@types/ILesson';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';
import { useLessons } from '@/src/hooks/useLessons';
import { toast } from '@/src/components/ui/use-toast';
import { useMainModal } from '@/src/hooks/useMainModal';

interface LessonCardProps {
  lesson: ILesson;
	fromSchedule?: boolean;
	onCloseModal: () => void;
}

export function LessonCard({ lesson, fromSchedule, onCloseModal }: LessonCardProps) {
	const { lang } = useLang();
	const { setMainModal } = useMainModal();
	const { getLessonByLevelCategory, getLessonByScheduleWeek, checkUserLesson, checkUserLessonReqStatus, checkUserLessonReqCode } = useLessons();

	const [checkedLesson, setCheckedLesson] = useState(lesson.checked);

	function handleCheckLesson() {
		checkUserLesson({
			lessonId: lesson.id,
			checked: !checkedLesson,
		});
	}

	function handlePreviousLesson() {
		if (lesson.previousLessonId) {
			const previousLesson = fromSchedule ? getLessonByScheduleWeek(lesson.previousLessonId) : getLessonByLevelCategory(lesson.previousLessonId);

			setMainModal(
				<LessonCard lesson={previousLesson} fromSchedule={fromSchedule} onCloseModal={() => setMainModal(null)} />
			);
		}
	}

	function handleNextLesson() {
		if (lesson.nextLessonId) {
			const nextLesson = fromSchedule ? getLessonByScheduleWeek(lesson.nextLessonId) : getLessonByLevelCategory(lesson.nextLessonId);

			setMainModal(
				<LessonCard lesson={nextLesson} fromSchedule={fromSchedule} onCloseModal={() => setMainModal(null)} />
			);
		}
	}

	useEffect(() => {
		setCheckedLesson(lesson.checked);
	}, [lesson]);
	
	// Monitor check user lesson request
	useEffect(() => {
		if (checkUserLessonReqStatus === 'failed') {
			toast({
				description: (i18n as any)[lang].requests[checkUserLessonReqCode].message,
				variant: (i18n as any)[lang].requests[checkUserLessonReqCode].variant,
			});
		}

		if (checkUserLessonReqStatus === 'succeeded') {
			setCheckedLesson(!checkedLesson);
		}
	}, [checkUserLessonReqStatus]);

	return (
		<div className="min-w-full">
			<header>
				<h3 className="text-2xl">{lesson.name}</h3>
			</header>
				
			<section className="w-full py-4 flex flex-col gap-4 justify-center">
				<div className="flex flex-col gap-4 w-full h-[315px] md:w-[598px] md:h-[306px] lg:w-[898px] lg:h-[506px]">
					<CustomIframe className="rounded-md" width="100%" height="100%" src={lesson.src} />
				</div>
				<div className="flex flex-col gap-4 justify-start sm:flex-row sm:justify-between">
					<div className="min-h-fit flex flex-row items-center gap-1">
						<div className="border-2 border-blue-800 px-3 py-1 mr-2 rounded-xl font-semibold">{lesson.level.toUpperCase()}</div>
						<div className="border-2 border-blue-800 bg-blue-800 text-white px-4 py-1 mr-2 rounded-xl">
							{i18n[lang].content.levelsDescriptions[lesson.level]}
						</div>
						<div className="border-2 border-blue-800 bg-blue-800 text-white px-4 py-1 mr-2 rounded-xl">
							{i18n[lang].content.categoriesTitles[lesson.category]}
						</div>
					</div>
					<CustomCheckbox 
						checked={checkedLesson} 
						labelText={i18n[lang].content.checklesson} 
						checkedLabelText={i18n[lang].content.checkedLabelText}
						labelTextClassName="block text-sm font-medium mt-[-1px]"
						onClick={handleCheckLesson}
						disabled={checkUserLessonReqStatus === 'loading'}
					/>
				</div>
			</section>

			<footer className="flex flex-col gap-2 sm:flex-row justify-between">
				<Button disabled={!lesson.previousLessonId} variant="outline" onClick={handlePreviousLesson}>
					<ArrowLeft className="w-4 h-4" />
					{i18n[lang].content.buttons.previousLesson}
				</Button>
				<Button disabled={!lesson.nextLessonId} variant="outline" onClick={handleNextLesson}>
					{i18n[lang].content.buttons.nextLesson}
					<ArrowRight className="w-4 h-4" />
				</Button>
			</footer>
		</div>
	);
}
