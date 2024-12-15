import { Column, ColumnType } from "@/types";
import { v1 as uuid } from "uuid";

export const INITIAL_COLUMNS: Column[] = [
  {
    id: uuid(),
    title: "Backlog",
    type: ColumnType.backlog,
    tasks: [
      { id: uuid(), title: "Research User Flow" },
      { id: uuid(), title: "Write User Stories" },
    ],
  },
  {
    id: uuid(),
    title: "To Do",
    type: ColumnType.todo,
    tasks: [
      { id: uuid(), title: "Develop Payment System" },
      { id: uuid(), title: "Implement Real-Time Chat" },
    ],
  },
  {
    id: uuid(),
    title: "In Progress",
    type: ColumnType.inProgress,
    tasks: [
      { id: uuid(), title: "Develop Payment System" },
      { id: uuid(), title: "Implement Real-Time Chat" },
    ],
  },
  {
    id: uuid(),
    title: "Done",
    type: ColumnType.done,
    tasks: [
      { id: uuid(), title: "Fix Payment Gateway Bug" },
      { id: uuid(), title: "Update API Documentation" },
    ],
  },
];
