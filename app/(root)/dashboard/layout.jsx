import Header from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export const metadata = {
  title: "Dashboard | Stockwise",
  description:
    "A simple application to maange stock of products in a store built using Next.js and MongoDB",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <Header session={session} />
      {children}
    </section>
  );
}
