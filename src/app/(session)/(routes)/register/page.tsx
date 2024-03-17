'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
import CustomCheckbox from '@/src/components/custom/CustomCheckbox';
import { useState } from 'react';

const Page = () => {
	const router = useRouter();
	const session = useSession();

	if (!session) {
		router.push('/dashboard');
	}

	const [checkTermsAccepted, setCheckTermsAccepted] = useState(false);

	const formSchema = z.object({
		name: z.string().min(1, {
			message: 'Nome está inválido',
		}),
		email: z.string().email({
			message: 'Email está inválido',
		}),
		password: z.string().min(8, {
			message: 'Senha está inválida',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Confirmação de senha está inválida',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			console.log({ values });
			
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
						Criar uma conta
					</h2>
					<p className="flex items-center gap-1 pl-1">
						<span>ou</span>
						<Button 
							className="p-0 m-0 pt-[1px] font-normal"
							variant="underlink"
						>
							<Link href="/signin">
							Entrar na plataforma
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
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">
										nome
									</Label>
									<FormControl className="m-0 p-0">
										<Input 
											className="px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											type="text"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
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
						<FormField 
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">
										confirmar senha
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
						<FormField 
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<CustomCheckbox 
										checked={checkTermsAccepted} 
										onClick={() => setCheckTermsAccepted(!checkTermsAccepted)} 
									/>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full"
							disabled={isLoading}
						>
              Começar grátis
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;