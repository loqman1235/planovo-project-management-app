"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  createWorkspaceSchema,
  CreateWorkspaceSchemaType,
  editWorkspaceSchema,
  EditWorkspaceSchemaType,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";

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

export const updateWorkspaceAction = async (
  prevState: unknown,
  data: EditWorkspaceSchemaType
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw Error("Unauthorized");
    }

    const validatedData = editWorkspaceSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { workspaceName, workspaceId } = validatedData.data;

    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        name: workspaceName,
      },
    });

    revalidatePath(`/workspaces/${workspaceId}`);

    if (updatedWorkspace) {
      return {
        success: true,
        updatedWorkspace,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getWorkspaces = async () => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw Error("Unauthorized");
    }

    const workspaces = await prisma.workspace.findMany({
      where: {
        ownerId: session.user.id,
      },
      include: {
        projects: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (workspaces.length === 0) {
      return {
        error: "No workspaces found",
      };
    }

    return workspaces;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getWorkspaceStats = async (workspaceId: string) => {
//   try {
//     const session = await auth();

//     if (!session || !session.user) {
//       throw Error("Unauthorized");
//     }

//     const [projects, tasks] = await prisma.$transaction([
//       prisma.project.count({
//         where: {
//           workspaceId,
//         },
//       }),
//       prisma.task.findMany({
//         where: {
//           column: {
//             project: {
//               workspaceId,
//             },
//           },
//         },
//       }),
//     ]);

//     const totalProjects = projects;
//     const totalTasks = tasks.length;

//     const assignedTasks = tasks.filter(
//       (task) => task.status === "assigned"
//     ).length;

//     const completedTasks = tasks.filter(
//       (task) => task.status === "completed"
//     ).length;

//     return {
//       totalProjects,
//       totalTasks,
//       assignedTasks,
//       completedTasks,
//     };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
