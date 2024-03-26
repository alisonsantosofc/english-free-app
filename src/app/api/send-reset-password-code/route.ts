import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

import { Resend } from 'resend';

import { generateCode } from '@/src/utils/data';
import { resetPasswordCodeEmailTemplateString } from '../(emails)/ResetPasswordCodeEmailTemplate';

// Função para enviar o e-mail
async function sendEmail(userEmail: string, userName: string, code: string) {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const emailContent = resetPasswordCodeEmailTemplateString({ code, userName });

	resend.emails.send({
		from: 'englishfree@resend.dev',
		to: userEmail,
		subject: 'Resetar senha',
		html: emailContent,
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

		const userId = user.id;

		const code = await prisma.code.findUnique({
			where: {
				userId,
			}
		});

		if (code) {
			const codeCreatedAt = dayjs(code?.createdAt);

			console.log(dayjs(code?.createdAt).toDate());
			console.log(dayjs(code?.createdAt).add(1, 'day').toDate());

			const codeCreatedBefore14Hours = codeCreatedAt.isBefore(dayjs(code?.createdAt).add(14, 'hours'));

			if (codeCreatedBefore14Hours) {
				return new NextResponse(
					JSON.stringify({ code: '2.2', message: 'Users can request codes every 14 hours.' }),
					{ status: 400 }
				);
			}

			await prisma.code.delete({
				where: {
					id: code?.id,
				}
			});
		}

		const generatedCode = generateCode();

		const expiresAt = new Date(new Date().setHours(new Date().getHours() + 3));

		// Envia o e-mail com o código gerado
		await sendEmail(email, user.name, generatedCode);

		await prisma.code.create({
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
				code: '2.3',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}