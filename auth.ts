import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {} & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github,
    Google,
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(
            credentials.password as string,
            user.password as string
          ))
        ) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await PrismaAdapter(prisma).createSession!({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        console.log("SESSIION", sessionToken);

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
