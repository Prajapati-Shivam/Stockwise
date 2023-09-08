"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button className="w-full" onClick={signInWithGoogle}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Image
          src="/assets/google.svg"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      Continue with Google
    </Button>
  );
};

export default SignInButton;
