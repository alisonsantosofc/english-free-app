'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { LandingNavbar } from '@/src/features/landing/LandingNavbar';

import i18n from './i18n.json';
import { useLang } from '@/src/hooks/useLang';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { lang } = useLang();

	if (session.data) {
		router.push('/dashboard');
	}

	return (
		<section className="h-full flex justify-center items-start pt-20 sm:items-center">
			<LandingNavbar />
			<div className="w-full sm:w-[598px] p-4 lg:p-8">
				<header className="mb-4">
					<h2 className="text-2xl sm:text-3xl font-bold">
						{i18n[lang].content.title}
					</h2>
				</header>
			</div>
		</section>
	);
};

export default Page;