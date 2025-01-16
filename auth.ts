import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
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
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;
      if (!user) return false;

      if (account.provider === "google" || account.provider === "credentials") {
        if (user.id !== undefined) {
          try {
            const existingWorkspace = await prisma.workspace.findFirst({
              where: {
                ownerId: user.id,
              },
            });

            if (!existingWorkspace) {
              await prisma.workspace.create({
                data: {
                  ownerId: user.id,
                  name: "New workspace",
                  projects: {
                    create: {
                      name: "First project",
                      description: "Welcome to your first project!",
                      columns: {
                        create: [
                          { name: "Backlog", type: "BACKLOG" },
                          { name: "To do", type: "TODO" },
                          { name: "In progress", type: "IN_PROGRESS" },
                          { name: "Done", type: "DONE" },
                        ],
                      },
                    },
                  },
                },
              });
            }
          } catch (error) {
            console.error("Error creating workspace for Google user:", error);
          }
        }
      }

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
