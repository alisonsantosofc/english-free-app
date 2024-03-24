import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { generateCode } from '@/src/utils/data';

// Função para enviar o e-mail
async function sendEmail(userEmail: string, code: string) {
	// Configuração do transporte de e-mail
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'seuemail@gmail.com', // Seu e-mail
			pass: 'sua_senha' // Sua senha
		}
	});

	// Definição dos detalhes do e-mail
	let mailOptions = {
		from: 'seuemail@gmail.com',
		to: userEmail,
		subject: 'Seu Código de Verificação',
		text: `Seu código de verificação é: ${code}`
	};

	// Envio do e-mail
	await transporter.sendMail(mailOptions);
}

// ROUTE 2
export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return new NextResponse(
				JSON.stringify({ code: '2.1', message: 'User does not exists.' }),
				{ status: 400 }
			);
		}

		const generatedCode = generateCode();

		const expiresAt = new Date(new Date().setHours(new Date().getHours() + 3));

		const code = await prisma.code.create({
			data: {
				code: generatedCode,
				userId: user.id,
				expiresAt,
			},
		});

		// Envia o e-mail com o código gerado
		await sendEmail(email, generatedCode);

		return NextResponse.json({
			code,
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '2.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}