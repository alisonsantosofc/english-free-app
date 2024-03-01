'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserRoundPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';

import i18n from './i18n.json';

export function SignInButton() {
	const session = useSession();
	const route = useRouter();
	const { lang } = useLang();

	return (
		<Button
			variant="default"
			className="flex gap-2 bg-mainColor-500 text-white hover:bg-mainColor-400"
			onClick={() => {
				if (!session) {
					signIn('google', {
						callbackUrl: '/dashboard'
					});
				} else {
					route.push('/dashboard');
				}
			}}
		>
			<span>{i18n[lang].content.buttonTitle}</span>
			<UserRoundPlus className="w-5 h-5" />
		</Button>
	);
}
