import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LandingLayout = async ({
	children,
}: {
  children: React.ReactNode;
}) => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/dashboard');
	}

	return (
		<div className="w-full h-full bg-background text-letter">
			{children}
		</div>
	);
};

export default LandingLayout;
