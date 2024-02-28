import { Navbar } from "@/components/custom/Navbar";
import { Sidebar } from "@/components/custom/Sidebar";
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
      <main className="h-full md:pl-72 md:pt-20">
        <Navbar />
        {session && children}
      </main>
    </div>
  );
}

export default DashboardLayout;
