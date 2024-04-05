import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';
import { IUserSession } from '@/src/@types/IUserSession';

// ROUTE 2
export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		const { lessonId, checked } = await req.json();

		if (!session) {
			return new NextResponse(
				JSON.stringify({ code: '2.2.1', message: 'You are not logged in.' }),
				{ status: 401 }
			);
		}

		if (typeof checked !== 'boolean') {
			return new NextResponse(
				JSON.stringify({ code: '2.2.2', message: 'Invalid checked value.' }),
				{ status: 400 }
			);
		}

		const { id: userId } = session.user as IUserSession;

		const userLesson = await prisma.user_lessons.findFirst({
			where: {
				lessonId,
				userId,
			}
		});

		if (userLesson) {
			await prisma.user_lessons.update({
				where: {
					id: userLesson.id,
				},
				data: {
					checked,
				}
			});
		} else {
			await prisma.user_lessons.create({
				data: {
					lessonId,
					userId: String(userId),
					checked,
				}
			});
		}

		return NextResponse.json(true);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '2.2.3',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
