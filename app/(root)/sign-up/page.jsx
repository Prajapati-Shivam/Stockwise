"use client";
import SignupPage from "@/components/SignupPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Signup = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) redirect("/sign-in");
  }, [session]);
  return (
    <div className="flex justify-center items-center h-screen">
      <SignupPage />
    </div>
  );
};

export default Signup;
