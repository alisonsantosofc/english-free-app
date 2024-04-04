'use client';

import * as z from 'zod';
import { useState } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { lang } = useLang();

	if (session.data) {
		router.push('/dashboard');
	}

	const [showPassword, setShowPassword] = useState(false);

	const formSchema = z.object({
		email: z.string().email({
			message: 'Email está inválido',
		}),
		password: z.string().min(8, {
			message: 'Senha está inválida',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			signIn('credentials', {
				...values,
				callbackUrl: '/dashboard'
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
				<header className="mb-8">
					<h2 className="text-2xl sm:text-3xl font-bold">
						{i18n[lang].content.title}
					</h2>
					<p className="flex items-center gap-1">
						<span>{i18n[lang].content.or}</span>
						<Button 
							className="p-0 m-0 h-fit font-normal"
							variant="underlink"
						>
							<Link href="/register">
								{i18n[lang].content.createAccount}
							</Link>
						</Button>
					</p>
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
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">{i18n[lang].content.password}</Label>
									<FormControl className="m-0 p-0">
										<div className="relative">
											<Input
												className={`px-4 pr-10 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
													form.formState.errors.password ? 'border-red-500' : ''
												}`}
												disabled={isLoading}
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>
											<div
												className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer text-label"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <Eye /> : <EyeOff />}
											</div>
										</div>
									</FormControl>
									<Button 
										className="p-0 m-0 font-normal w-fit h-fit"
										variant="link"
										type='button'
									>
										<Link className="text-left" href="/forgout-password">
											{i18n[lang].content.recoveryPassword}
										</Link>
									</Button>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full mt-4"
							disabled={isLoading}
						>
							{i18n[lang].content.loginButton}
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;