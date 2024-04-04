'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, VideoOff } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { CustomIframe } from '@/src/components/custom/CustomIframe';
import CustomCheckbox from '@/src/components/custom/CustomCheckbox';
import { Separator } from '@/src/components/ui/separator';

import { ILesson } from '../@types/ILesson';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';
import { useLessons } from '@/src/hooks/useLessons';
import { toast } from '@/src/components/ui/use-toast';

interface LessonCardProps {
  lesson: ILesson;
	onCloseModal: () => void;
}

export function LessonCard({ lesson, onCloseModal }: LessonCardProps) {
	const { lang } = useLang();
	const { checkUserLesson, checkUserLessonReqStatus, checkUserLessonReqCode } = useLessons();

	const [checkedLesson, setCheckedLesson] = useState(false);

	function handleCheckLesson() {
		setCheckedLesson(!checkedLesson);

		checkUserLesson({
			lessonId: lesson.id,
			checked: !checkedLesson,
		});
	}

	// Monitor check user lesson request
	useEffect(() => {
		if (checkUserLessonReqStatus === 'failed') {
			toast({
				description: (i18n as any)[lang].requests[checkUserLessonReqCode].message,
				variant: (i18n as any)[lang].requests[checkUserLessonReqCode].variant,
			});
		}
	}, [checkUserLessonReqStatus]);

	return (
		<div className="min-w-full">
			<header>
				<h3 className="text-2xl">{lesson.name}</h3>
			</header>
				
			<section className="w-full py-4 flex flex-col gap-2 justify-center">
				<div className="flex flex-col gap-4 w-full h-[315px] md:w-[598px] md:h-[306px] lg:w-[898px] lg:h-[506px]">
					<CustomIframe className="rounded-md" width="100%" height="100%" src={lesson.src} />
				</div>
				<div className="flex flex-col gap-4 justify-start sm:flex-row sm:justify-between">
					<div className="min-h-fit flex flex-row items-center gap-2">
						<div className="bg-blue-800 text-white px-2 py-1 mr-2 rounded font-medium">{lesson.level.toUpperCase()}</div>
						<span>
							{i18n[lang].content.levelsDescriptions[lesson.level]}
						</span>
						<Separator className="min-h-[1.5rem]" orientation="vertical" />
						<span>
							{i18n[lang].content.categoriesTitles[lesson.category]}
						</span>
					</div>
					<CustomCheckbox 
						checked={checkedLesson} 
						labelText={i18n[lang].content.checklesson} 
						checkedLabelText={i18n[lang].content.checkedLabelText}
						onClick={handleCheckLesson}
					/>
				</div>
			</section>

			<footer className="flex flex-col gap-2 sm:flex-row justify-between">
				<Button variant="outline" onClick={onCloseModal}>
					<ArrowLeft className="w-4 h-4" />
					{i18n[lang].content.goBack}
				</Button>
				<Button variant="outline">
					<VideoOff className="w-4 h-4" />
					{i18n[lang].content.reportVideoError}
				</Button>
			</footer>
		</div>
	);
}
