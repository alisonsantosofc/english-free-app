import { MobileSidebar } from '@/components/custom/MobileSidebar';
import { UserMenu } from '@/components/custom/UserMenu';

export function Navbar() {
	return (
		<div className="bg-background w-full h-20 flex items-center p-4">
			<MobileSidebar />
			<div className="flex w-full justify-end">
				<UserMenu />
			</div>
		</div>
	);
}