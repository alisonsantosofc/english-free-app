import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

import { Resend } from 'resend';

import { generateCode } from '@/src/utils/data';

// Função para enviar o e-mail
async function sendEmail(userEmail: string, code: string) {
	const resend = new Resend('re_4ZBjFHMh_Q3GAdJxP46dLY4QzHLB6ipth');

	resend.emails.send({
		from: 'englishfree@resend.dev',
		to: userEmail,
		subject: 'Código de Verificação',
		html: `<p>Esse é seu código de verificação: <strong>${code}</strong></p>`
	});
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

		// Envia o e-mail com o código gerado
		await sendEmail(email, generatedCode);

		const code = await prisma.code.create({
			data: {
				code: generatedCode,
				userId: user.id,
				expiresAt,
			},
		});

		return NextResponse.json({
			expiresAt,
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