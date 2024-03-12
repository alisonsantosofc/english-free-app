import { ReactNode, useState } from 'react';
import { ArrowLeft, VideoOff } from 'lucide-react';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { ILesson } from '../@types/ILesson';
import { CustomIframe } from '@/components/custom/CustomIframe';
import CustomCheckbox from '@/components/custom/CustomCheckbox';

import i18n from './i18n.json';
import { useLang } from '@/hooks/useLang';
import { Separator } from '@/components/ui/separator';
interface LessonDrawerProps {
  triggerComponent: ReactNode;
  lesson: ILesson;
}

export function LessonDrawer({ triggerComponent, lesson }: LessonDrawerProps) {
	const { lang } = useLang();

	const [checkedLesson, setCheckedLesson] = useState(false);

	return (
		<Drawer>
			<DrawerTrigger>
				{triggerComponent}
			</DrawerTrigger>
			<DrawerContent className="w-full md:w-full-72">
				<DrawerHeader>
					<DrawerTitle className="text-2xl">{lesson.name}</DrawerTitle>
				</DrawerHeader>
				
				<div className="w-full p-4 flex justify-center">
					<div className="flex flex-col gap-4 w-full h-[315px] xl:w-[898px] xl:h-[506px]">
						<CustomIframe className="rounded-md" width="100%" height="100%" src={lesson.src} />
						<div className="flex justify-between">
							<DrawerDescription className="flex items-center gap-2">
								<div className="bg-blue-800 text-white px-2 py-1 mr-2 rounded font-medium">{lesson.level.toUpperCase()}</div>
								<span>
									{i18n[lang].content.levelsDescriptions[lesson.level]}
								</span>
								<Separator orientation="vertical" />
								<span>
									{i18n[lang].content.categoriesTitles[lesson.category]}
								</span>
							</DrawerDescription>
							<CustomCheckbox 
								checked={checkedLesson} 
								labelText={i18n[lang].content.checklesson} 
								checkedLabelText={i18n[lang].content.checkedLabelText}
								onClick={() => setCheckedLesson(!checkedLesson)}
							/>
						</div>
					</div>
				</div>

				<DrawerFooter className="flex flex-row justify-between">
					<DrawerClose>
						<Button variant="outline">
							<ArrowLeft className="w-4 h-4" />
							{i18n[lang].content.goBack}
						</Button>
					</DrawerClose>
					<Button variant="outline">
						<VideoOff className="w-4 h-4" />
						{i18n[lang].content.reportVideoError}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
