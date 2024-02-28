import { MobileSidebar } from "@/components/custom/MobileSidebar";
import { UserMenu } from "@/components/custom/UserMenu";

export function Navbar() {
  return (
    <div className="fixed top-0 right-0 bg-background md:pl-72 w-full flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserMenu />
      </div>
    </div>
  );
}