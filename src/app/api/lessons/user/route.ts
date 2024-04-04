import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';
import { IUserSession } from '@/src/@types/IUserSession';

// ROUTE 2
export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		if (!session) {
			return new NextResponse(
				JSON.stringify({ code: '2.3.1', message: 'You are not logged in' }),
				{ status: 401 }
			);
		}

		const { id: userId } = session.user as IUserSession;

		const userLessons = await prisma.user_lessons.findMany({
			where: {
				userId,
			}
		});

		return NextResponse.json(userLessons);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '2.3.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
