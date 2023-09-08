"use client";
import { Button } from "@/components/ui/button";
import homeimg from "@/public/assets/homepage.svg";
import mail from "@/public/assets/mail.svg";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import "animate.css";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: status } = useSession();
  if (status === "loading") return null;
  return (
    <div className="p-4 lg:px-20 lg:py-10">
      <Header />
      <main className="h-screen">
        <div className="flex flex-col-reverse md:flex-row rounded-lg mt-8 gap-4 items-center p-4 sm:p-8 justify-around">
          <div className="flex flex-col gap-4 sm:gap-6 sm:mb-0 md:max-w-[300px] animate__animated animate__fadeInLeft">
            <h2 className="text-lg sm:text-2xl font-semibold">
              Inventory Management System
            </h2>
            <p className="text-base sm:text-lg underline-left-to-right">
              A simple inventory management system for small businesses to keep
              track of their inventory.
            </p>

            <Button className="mb-8 text-white cursor-pointer">
              <Link href="/sign-up">Get started for free →</Link>
            </Button>
          </div>
          <Image
            src={homeimg}
            alt="main image"
            className="sm:w-1/2 animate__animated animate__fadeInRight"
            priority={true}
          />
        </div>
      </main>
      <footer>
        <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-8">
          Reach out
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <ContactForm />
          <div className="flex justify-center w-1/2">
            <Image src={mail} alt="mail" className="w-3/4" priority={true} />
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center sm:justify-between items-center flex-col sm:flex-row text-center sm:text-start">
          <p className="">© 2023 Stockwise. All rights reserved.</p>

          <div className="flex gap-2">
            <a
              href="https://github.com/Prajapati-Shivam"
              target="_blank"
              className="rounded-full flex items-center justify-center w-12 h-12 hover:border-2"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/shivam-prajapati-78590b225/"
              target="_blank"
              className="rounded-full flex items-center justify-center w-12 h-12 hover:border-2"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
