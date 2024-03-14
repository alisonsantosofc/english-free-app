'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserRoundPlus } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';

export function SignUpButton() {
	const session = useSession();
	const route = useRouter();
	const { lang } = useLang();

	return (
		<Button
			variant="default"
			className="flex gap-2 bg-blue-800 text-white hover:bg-blue-800/90"
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
