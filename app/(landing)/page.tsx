'use client';

import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SignUpButton } from '@/components/custom/SignUpButton';

import { cn } from '@/lib/utils';

import i18n from './i18n.json';
import { useLang } from '@/hooks/useLang';
import { LandingNavbar } from '@/features/landing/LandingNavbar';

const LandingPage = () => {
	const route = useRouter();
	const { lang } = useLang();

	return (
		<div className="w-screen md:w-[1244px] mx-auto h-full p-4 xl:p-0">
			<div className="flex flex-col gap-4 pt-20 md:pt-44">
				<LandingNavbar />
				
				<p className={cn('w-full text-2xl sm:text-4xl md:max-w-2xl font-bold ')}>
					{i18n[lang].content.title}
				</p>
				<p className={cn('w-full md:max-w-xl')}>
					{i18n[lang].content.textHighlight}
				</p>
				<div className="flex gap-4 flex-col sm:flex-row md:flex-row mt-8">
					<SignUpButton />
					<Button 
						className="flex gap-2"
						onClick={() => route.push('/dashboard')}
					>
						<span>{i18n[lang].content.signInButton}</span>
						<LogIn className="w-5 h-5" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;