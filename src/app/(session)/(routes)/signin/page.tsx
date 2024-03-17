'use client';

import * as z from 'zod';
import axios from 'axios';
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

const Page = () => {
	const router = useRouter();
	const session = useSession();

	if (!session) {
		router.push('/dashboard');
	}

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
			// TODO: Open Pro Modal
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
					<h2 className="text-3xl font-bold">
						Entrar
					</h2>
					<p className="flex items-center gap-1 pl-1">
						<span>ou</span>
						<Button 
							className="p-0 m-0 pt-[1px] font-normal"
							variant="underlink"
						>
							<Link href="/register">
							  Criar uma conta
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
									<Label className="text-label">
										senha
									</Label>
									<FormControl className="m-0 p-0">
										<Input 
											className="px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											type="password"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full"
							disabled={isLoading}
						>
              Entrar na plataforma
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;