import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { Adapter } from "next-auth/adapters";
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

// Lazy load adapter only at runtime
async function getPrismaAdapter(): Promise<Adapter | undefined> {
  if (!process.env.DATABASE_URL) {
    return undefined;
  }

  const { PrismaAdapter } = await import("@auth/prisma-adapter");
  const prisma = (await import("./lib/prisma")).default;
  return PrismaAdapter(prisma) as Adapter;
}

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const adapter = await getPrismaAdapter();

  return {
    adapter,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Github({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
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
            const prisma = (await import("./lib/prisma")).default;
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
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    session: {
      strategy: "jwt",
    },
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
  };
});
