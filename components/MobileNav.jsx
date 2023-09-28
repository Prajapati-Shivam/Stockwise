import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const MobileNav = ({ session }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <div className="flex flex-col px-4 mt-4">
          {session && session.user ? (
            <>
              <SheetHeader>
                <SheetTitle className="flex justify-between">
                  {/* <div className="whitespace-nowrap mr-4 text-left text-2xl items-center">
                    {session.user.name}
                  </div> */}
                  <Badge className={"text-base"}>{session.user.name}</Badge>
                  <ThemeToggle />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-8 mt-4">
                <Link
                  href={"/dashboard/add-stock"}
                  className="hover:text-blue-500"
                >
                  Add
                </Link>
                <Link
                  href={"/dashboard/all-stock"}
                  className="hover:text-blue-500"
                >
                  View
                </Link>
                <Link
                  href={"/dashboard/search-stock"}
                  className="hover:text-blue-500"
                >
                  Search
                </Link>
                <LogoutButton />
              </div>
            </>
          ) : (
            <Button size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
