"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  createWorkspaceSchema,
  CreateWorkspaceSchemaType,
} from "@/lib/validations";

export async function getCurrentUser() {
  const session = await auth();
  return session;
}

export const createWorkspaceAction = async (
  prevState: unknown,
  data: CreateWorkspaceSchemaType
) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    throw Error("Unauthorized");
  }

  const parsedData = createWorkspaceSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      error: parsedData.error.flatten().fieldErrors.workspaceName,
    };
  }

  const { workspaceName } = parsedData.data;

  try {
    const createdWorkspace = await prisma.workspace.create({
      data: {
        ownerId: session.user.id,
        name: workspaceName,
      },
    });

    if (createdWorkspace) {
      return {
        success: true,
        redirectUrl: `/workspaces/${createdWorkspace.id}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
