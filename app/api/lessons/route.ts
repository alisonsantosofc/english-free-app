import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

import { authOptions } from '@/lib/auth';

import { lessonsSeed } from '@/prisma/seeds/lessons';

export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		if (!session) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const lessons = await prisma.lesson.findMany();

		// if (!lessons.length) {
		//   await lessonsSeed()
		//     .catch((e) => console.error(e));
		// }

		return NextResponse.json(lessons);
	} catch (error) {
		console.log('[LESSONS_ERROR]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
