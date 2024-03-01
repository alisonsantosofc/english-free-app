'use client';

import { Nunito } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaySquare, School, CalendarCheck, Settings, GraduationCap } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';

import i18n from './i18n.json';

const nunito = Nunito({ 
	weight: '900', 
	subsets: ['latin'], 
});

export function Sidebar() {
	const pathname = usePathname();
	const { lang } = useLang();

	const routes = [
		{
			label: i18n[lang].content.routesLabels.dashboard,
			icon: School,
			href: '/dashboard',
		},
		{
			label: i18n[lang].content.routesLabels.lessons,
			icon: PlaySquare,
			href: '/lessons',
		},
		{
			label: i18n[lang].content.routesLabels.schedules,
			icon: CalendarCheck,
			href: '/schedules',
		},
		{
			label: i18n[lang].content.routesLabels.certified,
			icon: GraduationCap,
			href: '/certified',
		},
		{
			label: i18n[lang].content.routesLabels.settings,
			icon: Settings,
			href: '/settings',
		}
	];

	return (
		<div className="space-y-4 py-4 flex flex-col h-full bg-slate-200 dark:bg-slate-900 text-white">
			<div className="px-3 py-2 flex-1">
				<Link 
					href="/dashboard" 
					className="flex items-center pl-3 mb-14"
				>
					<div className="relative w-10 h-10 mr-4">
						<Image
							fill
							alt="logo"
							src="/images/icon.svg"
						/>
					</div>
					<h1 className={cn('text-3xl font-bold text-black dark:text-white', nunito.className)}>
            English Free
					</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href} 
							key={route.href}
							className={cn(
								'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition',
								pathname !== route.href && 'hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5',
								pathname === route.href ? 'hover:text-white bg-blue-800 hover:bg-blue-800' : 'text-zinc-600 dark:text-zinc-400'
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn('h-5 w-5 md:h-6 md:w-6 mr-3', pathname !== route.href && 'text-black dark:text-white')} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}