'use client';

import { ArrowRight, CalendarCheck, GraduationCap, PlaySquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';

import i18n from './i18n.json';

const DashboardPage = () => {
	const router = useRouter();
	const { lang } = useLang();

	const tools = [
		{
			label: i18n[lang].content.routesLabels.lessons,
			icon: PlaySquare,
			href: '/lessons',
			bgColor: 'bg-red-500',
		},
		{
			label: i18n[lang].content.routesLabels.schedules,
			icon: CalendarCheck,
			href: '/schedules',
			bgColor: 'bg-blue-800',
		},
		{
			label: i18n[lang].content.routesLabels.certified,
			icon: GraduationCap,
			href: '/certified',
			bgColor: 'bg-gray-600',
		},
	];

	return (
		<section>
			<header className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center">
					{i18n[lang].content.title}
				</h2>
				<p className="text-muted-foreground font-light text-sm px-6 md:text-lg text-center">
					{i18n[lang].content.textHighlight}
				</p>
			</header>
			<nav className="px-4 md:px-20 lg:px-32 space-y-4">
				{tools.map((tool) => (
					<Card 
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className="p-4 border-var(--border)/5 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
					>
						<div className="flex items-center gap-x-4">
							<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
								<tool.icon className={cn('w-6 h-6 md:w-8 md:h-8 text-white')} />
							</div>
							<div className="font-semibold">
								{tool.label}
							</div>
						</div>
						<ArrowRight className="w-5 h-5 text-zinc-500" />
					</Card>
				))}
			</nav>
		</section>
	);
};

export default DashboardPage;