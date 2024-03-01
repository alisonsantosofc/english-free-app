import { Navbar } from "@/components/custom/Navbar";
import { Sidebar } from "@/components/custom/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main>
        <ScrollArea className="h-full w-full pt-20 md:pl-72 md:pt-20">
          <Navbar />
          {session && children}
        </ScrollArea>
      </main>
    </div>
  );
}

export default DashboardLayout;
