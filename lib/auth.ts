import prisma from "@/prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      return {
        ...session,
      };
    },
    async signIn({ user, account, profile }) {
      try {
        const { name, email, image } = user;
        
        // Verify if user exists on database
        const existingUser = await prisma.user.findUnique({
          where: { email: String(email) },
        });

        if (existingUser) {
          // Update user data on database
          await prisma.user.update({
            where: { email: String(email) },
            data: { name: String(name), email: String(email), avatar: String(image) },
          });
        } else {
          // Register new user on database
          await prisma.user.create({
            data: { name: String(name), email: String(email), avatar: String(image) },
          });
        }

        return true;
      } catch {
        return false;
      }
    },
  },
};