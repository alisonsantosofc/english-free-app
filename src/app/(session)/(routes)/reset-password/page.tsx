'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

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

import { useLang } from '@/src/hooks/useLang';
import { useSessions } from '@/src/hooks/useSessions';
import { useToast } from '@/src/components/ui/use-toast';

import i18n from './i18n.json';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { lang } = useLang();
	const { toast } = useToast();
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
		} catch (error: any) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	// Monitor register user request
	useEffect(() => {
		if (sendResetPasswordCodeReqStatus === 'failed') {
			toast({
				description: (i18n as any)[lang].requests[sendResetPasswordCodeReqCode].message,
				variant: (i18n as any)[lang].requests[sendResetPasswordCodeReqCode].variant,
			});
		}

		if (sendResetPasswordCodeReqStatus === 'succeeded') {
			form.reset();

			toast({
				description: 'Código gerado com sucesso, em alguns instantes você receberá um email com seu código!',
				variant: 'success',
			});
		}
	}, [sendResetPasswordCodeReqStatus]);

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
											disabled={isLoading || sendResetPasswordCodeReqStatus === 'loading'}
											placeholder="example@email.com"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full mt-4"
							disabled={isLoading || sendResetPasswordCodeReqStatus === 'loading'}
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