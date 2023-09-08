import Header from "@/components/Header";
export const metadata = {
  title: "Dashboard | Stockwise",
  description:
    "A simple application to maange stock of products in a store built using Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
