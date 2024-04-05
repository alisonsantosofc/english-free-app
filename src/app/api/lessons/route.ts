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
				JSON.stringify({ code: '2.1.1', message: 'You are not logged in' }),
				{ status: 401 }
			);
		}

		const { id: userId } = session.user as IUserSession;

		const lessons = await prisma.lessons.findMany({
			include: {
				userLessons: {
					select: {
						checked: true,
					},
					where: {
						userId,
					}
				}
			}
		});
		
		const lessonsResponse = lessons.map(lesson => {
			return {
				id: lesson.id,
				name: lesson.name,
				src: lesson.src,
				level: lesson.level,
				category: lesson.category,
				priority: lesson.priority,
				checked: lesson.userLessons[0] ? lesson.userLessons[0].checked : false,
			};
		});

		return NextResponse.json(lessonsResponse);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '2.1.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
