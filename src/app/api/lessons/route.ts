import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';

// ROUTE 3
export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		if (!session) {
			return new NextResponse(
				JSON.stringify({ code: '3.1', message: 'You are not logged in' }),
				{ status: 401 }
			);
		}

		const lessons = await prisma.lesson.findMany();

		return NextResponse.json(lessons);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '3.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
