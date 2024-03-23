import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { authOptions } from '@/src/lib/auth';

// ROUTE 5
export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	try {
		if (!session) {
			return new NextResponse(
				JSON.stringify({ code: '5.1', message: 'You are not logged in' }),
				{ status: 401 }
			);
		}

		return NextResponse.json(true);
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '5.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
