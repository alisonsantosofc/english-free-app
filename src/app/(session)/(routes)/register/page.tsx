'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem 
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';

import CustomCheckbox from '@/src/components/custom/CustomCheckbox';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';
import { useToast } from '@/src/components/ui/use-toast';
import axios from 'axios';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { toast } = useToast();

	if (!session) {
		router.push('/dashboard');
	}

	const [checkTermsAccepted, setCheckTermsAccepted] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
	}).refine((data) => data.password === data.confirmPassword, {
		message: 'Confirmação de senha está inválida',
		path: ['confirmPassword'],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema, { async: true }),
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
			if (!checkTermsAccepted) {
				toast({
					title: 'Você deve aceitar os termos de uso e política de privacidade para continuar.',
				});
				return;
			}

			const response = await axios.post('/api/register', {
				name: values.name,
				email: values.email,
				password: values.password,
			});

			signIn('credentials', { callbackUrl: '/' });

			toast({
				title: 'Conta criada com sucesso, entre agora mesmo na plataforma!',
			});

			setCheckTermsAccepted(false);
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
									<Label className="text-label">nome</Label>
									<FormControl className="m-0 p-0">
										<Input
											className={`px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
												form.formState.errors.name ? 'border-red-500' : ''
											}`}
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
									<Label className="text-label">email</Label>
									<FormControl className="m-0 p-0">
										<Input
											className={`px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
												form.formState.errors.email ? 'border-red-500' : ''
											}`}
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
									<Label className="text-label">senha</Label>
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
												{showPassword ? <EyeOff /> : <Eye />}
											</div>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">confirmar senha</Label>
									<FormControl className="m-0 p-0">
										<div className="relative">
											<Input
												className={`px-4 pr-10 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
													form.formState.errors.confirmPassword ? 'border-red-500' : ''
												}`}
												disabled={isLoading}
												type={showConfirmPassword ? 'text' : 'password'}
												{...field}
											/>
											<div
												className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer text-label"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											>
												{showConfirmPassword ? <EyeOff /> : <Eye />}
											</div>
										</div>
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
										labelText="Estou de acordo com os termos de uso e política de privacidade."
										onClick={() => setCheckTermsAccepted(!checkTermsAccepted)}
									/>
								</FormItem>
							)}
						/>

						<Button
							className="w-full mt-8"
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