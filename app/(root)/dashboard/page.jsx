import DashboardCards from "@/components/DashboardCards";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full lg:w-8/12 my-12">
          <p className="text-4xl font-semibold my-4 text-center">
            Welcome,{" "}
            <span className="text-blue-500">
              {session?.user?.name || session?.user?.email}
            </span>
          </p>
          <DashboardCards />
        </div>
      </div>
    </div>
  );
}
