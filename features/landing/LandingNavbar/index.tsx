import { Nunito } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { ToggleDarkMode } from '@/components/custom/ToggleDarkMode';
import { ToggleLang } from '@/components/custom/ToggleLang';
import { cn } from '@/lib/utils';

const nunito = Nunito({ 
	weight: '900', 
	subsets: ['latin'], 
});

export function LandingNavbar() {
	return (
		<div className="fixed top-0 right-0 bg-background w-full flex items-center justify-center pt-2 px-4 xl:px-0">
			<div className="w-full md:w-[1244px] flex items-center justify-between gap-8">
				<Link 
					href="/dashboard" 
					className="flex items-center"
				>
					<div className="relative w-14 h-14 mr-4">
						<Image
							fill
							alt="logo"
							src="/images/icon.svg"
						/>
					</div>
					<h1 className={cn('hidden sm:block text-3xl lg:text-4xl font-bold', nunito.className)}>
            English Free
					</h1>
				</Link>
				<div className="flex gap-4">
					<ToggleDarkMode />
					<ToggleLang />
				</div>
			</div>
		</div>
	);
}