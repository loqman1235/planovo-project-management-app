import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;
      if (!user) return false;

      if (account.provider === "google") {
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
  },
});
