import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

// ROUTE 3
export async function GET(request: Request) {
	const session = await getServerSession(authOptions);

	return NextResponse.json({
		authenticated: !!session,
		session,
	});
}