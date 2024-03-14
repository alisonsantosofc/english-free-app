import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		if (!session) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		return NextResponse.json(true);
	} catch (error) {
		console.log('[SCHEDULES_SELECT_ERROR]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
