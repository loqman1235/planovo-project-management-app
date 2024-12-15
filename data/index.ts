import { Column, ColumnType } from "@/types";

export const INITIAL_COLUMNS: Column[] = [
  {
    id: "col-1",
    title: "Backlog",
    type: ColumnType.backlog,
    tasks: [
      { id: "task-1", title: "Research User Flow" },
      { id: "task-2", title: "Write User Stories" },
    ],
  },
  {
    id: "col-2",
    title: "To Do",
    type: ColumnType.todo,
    tasks: [
      { id: "task-3", title: "Develop Payment System" },
      { id: "task-4", title: "Implement Real-Time Chat" },
    ],
  },
  {
    id: "col-3",
    title: "In Progress",
    type: ColumnType.inProgress,
    tasks: [
      { id: "task-5", title: "Develop Payment System" },
      { id: "task-6", title: "Implement Real-Time Chat" },
    ],
  },
  {
    id: "col-4",
    title: "Done",
    type: ColumnType.done,
    tasks: [
      { id: "task-7", title: "Fix Payment Gateway Bug" },
      { id: "task-8", title: "Update API Documentation" },
    ],
  },
];
