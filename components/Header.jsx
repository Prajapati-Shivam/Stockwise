"use client";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return (
    <nav className="container bg-transparent mx-auto flex flex-wrap px-10 py-6 flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center mb-4 md:mb-0">
        <Link href={"/dashboard"} className="ml-3 text-2xl">
          Stockwise
        </Link>
      </a>
      <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <div className="flex gap-4 items-center">
          {session && session.user ? (
            <>
              {
                <div className="whitespace-nowrap mr-4">
                  {session.user.name}
                </div>
              }
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
              <ThemeToggle />
              <LogoutButton />
            </>
          ) : (
            <Button size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
