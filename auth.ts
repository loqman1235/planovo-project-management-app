import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      image?: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
    picture?: string;
  }
}
declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    username: string;
    image?: string;
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Github,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          if (
            !user ||
            !user.password ||
            !(await bcrypt.compare(
              credentials.password as string,
              user.password
            ))
          ) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username || "",
            name: user.name || null,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user) return false;
      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.image = token.picture as string | undefined;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
