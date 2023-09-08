"use client";
import SignInPage from "@/components/SignInPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Signin = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) redirect("/dashboard");
  }, [session]);
  return (
    <div className="flex justify-center items-center h-screen">
      <SignInPage />
    </div>
  );
};

export default Signin;
