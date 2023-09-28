"use client";
import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
  };
  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="border-2 w-full sm:w-1/2 rounded-lg h-full p-4 sm:p-8 bg-opacity-50 backdrop-blur-md"
    >
      <p className="text-2xl font-semibold mb-4">Contact Us</p>
      <div className="mb-4">
        <Label htmlFor="name">Your name</Label>
        <Input
          type="text"
          id="name"
          name="user_name"
          placeholder="John Doe"
          required
          className="bg-transparent mt-2"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Type your message here..."
          className="bg-transparent mt-2"
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" className="text-white">
          Send
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
