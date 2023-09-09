import { connectMongoDB } from "@/lib/db";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const { data } = await axios.post(
            "https://stockwise.vercel.app/api/sign-in",
            { email: credentials.email, password: credentials.password }
          );
          if (data.success) {
            return data.result;
          } else {
            console.log(data.error);
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
