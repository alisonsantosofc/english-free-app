import { ReactNode } from 'react';
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

interface LessonDrawerProps {
  triggerComponent: ReactNode;
  lesson: ILesson;
}

export function LessonDrawer({ triggerComponent, lesson }: LessonDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger>
				{triggerComponent}
			</DrawerTrigger>
			<DrawerContent className="w-full md:w-full-72">
				<DrawerHeader>
					<DrawerTitle className="text-2xl">{lesson.name}</DrawerTitle>
					<DrawerDescription>{lesson.title}</DrawerDescription>
				</DrawerHeader>
				<div className="w-full p-4 flex justify-center">
					<div className="w-full h-[380px] xl:w-[898px] xl:h-[506px]">
						<CustomIframe className="rounded-md" width="100%" height="100%" src={lesson.src} />
					</div>
				</div>
				<DrawerFooter>
					<DrawerClose className="flex justify-between">
						<Button variant="outline">
							<ArrowLeft className="w-4 h-4" />
							{'Voltar'}
						</Button>
						<Button variant="outline">
							<VideoOff className="w-4 h-4" />
							{'Esse vídeo tem algum problema?'}
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
