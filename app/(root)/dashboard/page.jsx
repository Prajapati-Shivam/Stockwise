"use client";
import DashboardCards from "@/components/DashboardCards";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
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
