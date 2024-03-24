'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem 
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';

import i18n from './i18n.json';
import { useLang } from '@/src/hooks/useLang';
import { useSessions } from '@/src/hooks/useSessions';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { lang } = useLang();
	const { 
		sendResetPasswordCode, 
		sendResetPasswordCodeReqStatus, 
		sendResetPasswordCodeReqCode, 
	} = useSessions();

	if (session.data) {
		router.push('/dashboard');
	}

	const formSchema = z.object({
		email: z.string().email({
			message: 'Email está inválido',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			sendResetPasswordCode({
				email: values.email,
			});

			form.reset();
		} catch (error: any) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<section className="h-full flex justify-center items-start pt-20 sm:items-center">
			<LandingNavbar />
			<div className="w-full sm:w-96 p-4 lg:p-8">
				<header className="mb-4">
					<h2 className="text-2xl sm:text-3xl font-bold">
						{i18n[lang].content.title}
					</h2>
				</header>

				<Form {...form}>
					<form 
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<FormField 
							name="email"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">
										email
									</Label>
									<FormControl className="m-0 p-0">
										<Input 
											className="px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="example@email.com"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full mt-4"
							disabled={isLoading}
						>
							{i18n[lang].content.sendCode}
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;