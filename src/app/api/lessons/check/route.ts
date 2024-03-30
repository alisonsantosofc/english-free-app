import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';
import { IUserSession } from '@/src/@types/IUserSession';

// ROUTE 2
export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		const { lessonId } = await req.json();

		if (!session) {
			return new NextResponse(
				JSON.stringify({ code: '2.2.1', message: 'You are not logged in' }),
				{ status: 401 }
			);
		}

		const { id: userId } = session.user as IUserSession;

		await prisma.userLesson.create({
			data: {
				lessonId,
				userId: String(userId),
			}
		});

		return NextResponse.json(true);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '2.2.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
