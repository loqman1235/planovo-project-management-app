import prisma from "./prisma";

export async function getDefaultWorkspace(userId: string) {
  return await prisma.workspace.findFirst({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
    },
  });
}
