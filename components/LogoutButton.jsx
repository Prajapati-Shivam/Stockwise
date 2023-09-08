"use client";

import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

const LogoutButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/sign-in" });
      toast({
        title: "Sucess",
        description: "You have been logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button className="w-full" size="sm" onClick={logout}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Logout
    </Button>
  );
};

export default LogoutButton;
