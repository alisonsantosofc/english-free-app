'use client';

import { useEffect, useState } from 'react';
import { PlaySquare } from 'lucide-react';

import { Heading } from '@/src/components/custom/Heading';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { EnglishLevelCard } from '@/src/features/lessons/EnglishLevelCard';
import { toast } from '@/src/components/ui/use-toast';

import { useLang } from '@/src/hooks/useLang';
import { useLessons } from '@/src/hooks/useLessons';

import i18n from './i18n.json';

const LessonsPage = () => {
	const { lang } = useLang();
	const { lessons, levels, getLessons, getLessonsReqStatus, getLessonsReqCode } = useLessons();

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
				title={i18n[lang].content.title}
				description={i18n[lang].content.description}
				icon={PlaySquare}
				bgColor="bg-red-500"
			/>
			<ScrollArea className="w-full h-scroll border-t-2">
				<div className="my-4 sm:my-8 px-4 sm:px-8 min-w-full">
					<div className="space-y-4">
						{
							getLessonsReqStatus === 'loading' ? 'Carregando...' : (
								levels.map((level, i) => (
									<EnglishLevelCard 
										key={i}
										level={level}
									/>
								))
							)
						} 
					</div>
				</div>
			</ScrollArea>
		</section>
	);
};

export default LessonsPage;