'use client';

import { signOut, useSession } from 'next-auth/react';
import { Award, LogOut, MoonStar, SunMedium, UserRound } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleDarkMode } from './ToggleDarkMode';
import { ToggleLang } from './ToggleLang';

import { useDarkMode } from '@/hooks/useDarkMode';


export function UserMenu() {
	const session = useSession();
	const { darkMode } = useDarkMode();

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar className="w-12 h-12 flex items-center justify-center bg-shape-600">
					<AvatarImage src={session.data?.user?.image || ''} />
					<AvatarFallback>
						<UserRound  className="w-7 h-7 text-foreground bg-shape-600" />
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="mr-4 rounded-xl">
				<div className="flex flex-col gap-4 mb-4 px-3">
					<div className="flex justify-end">
						<span>{session.data?.user?.name}</span>
					</div>
					<div className="flex justify-between">
						<ToggleDarkMode />
						<ToggleLang />
					</div>
				</div>

				<div className="min-w-full min-h-[1px] bg-shape-600 my-1"></div>
				<div
					className="group flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm"
				>
					<div className="flex items-center flex-1">
						<Award className="h-5 w-5 mr-3 text-letter" />
            Assinatura
					</div>
				</div>

				<div className="min-w-full min-h-[1px] bg-shape-600 my-1"></div>
				<div
					className="group flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm"
				>
					<div 
						className="flex items-center flex-1"
						onClick={() => {
							signOut({
								callbackUrl: '/'
							});
						}}
					>
						<LogOut className="h-5 w-5 mr-3 text-letter" />
            Sair
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}