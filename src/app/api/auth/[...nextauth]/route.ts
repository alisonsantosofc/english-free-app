import NextAuth from 'next-auth';
import { authOptions } from '@/src/lib/auth';

// ROUTE 2
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
