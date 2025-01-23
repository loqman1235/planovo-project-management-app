import { Prisma } from "@prisma/client";

export interface Task {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  type: ColumnType;
  tasks: Task[];
}

export enum ColumnType {
  backlog = "backlog",
  todo = "todo",
  inProgress = "inProgress",
  done = "done",
}

export type WorkspaceWithProjects = Prisma.WorkspaceGetPayload<{
  include: { projects: true };
}>;
