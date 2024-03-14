import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';

export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		// if (!session) {
		// 	return new NextResponse(
		// 		JSON.stringify({ code: '0.1.1', message: 'You are not logged in' }),
		// 		{ status: 401 }
		// 	);
		// }

		const lessons = await prisma.lesson.findMany();

		return NextResponse.json(lessons);
	} catch (error) {
		console.log('[LESSONS_ERROR]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
