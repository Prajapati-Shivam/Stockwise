import ThemeToggle from "./ThemeToggle";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { Badge } from "@/components/ui/badge";

const Header = ({ session }) => {
  return (
    <nav className="container flex lg:px-20 py-6 items-center justify-between">
      <Link href={"/dashboard"} className="ml-3 text-3xl font-bold">
        Stockwise
      </Link>

      <div className="flex sm:hidden">
        <MobileNav session={session} />
      </div>
      <div className="hidden sm:flex gap-4 items-center ">
        {session && session.user ? (
          <>
            {/* <div className="whitespace-nowrap mr-4">{session.user.name}</div> */}
            <Badge className={"text-base"}>{session.user.name}</Badge>

            <Link href={"/dashboard/add-stock"} className="hover:text-blue-500">
              Add
            </Link>
            <Link href={"/dashboard/all-stock"} className="hover:text-blue-500">
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
    </nav>
  );
};

export default Header;
