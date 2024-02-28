import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full bg-background text-letter">
      {children}
    </div>
  );
}

export default DashboardLayout;
