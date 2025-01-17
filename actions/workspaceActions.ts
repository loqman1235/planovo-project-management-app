"user server";

import prisma from "@/lib/prisma";

export async function createInitialWorkspace(userId: string) {
  try {
    const existingWorkspace = await prisma.workspace.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!existingWorkspace) {
      const workspace = await prisma.workspace.create({
        data: {
          ownerId: userId,
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
      return workspace;
    }
    return existingWorkspace;
  } catch (error) {
    console.error("Error creating workspace:", error);
    return null;
  }
}
