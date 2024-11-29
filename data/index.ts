import { KanbanData } from "@/types";

export const kanbanData: KanbanData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Optimize Images",
      date: "November 11th, 2024",
      project: "Pioneer Mobile App",
    },
    "task-2": {
      id: "task-2",
      content: "Design Navbar",
      date: "November 11th, 2024",
      project: "Pioneer Mobile App",
    },
    "task-3": {
      id: "task-3",
      content: "Develop Sidebar",
      date: "November 11th, 2024",
      project: "Pioneer Mobile App",
    },
    "task-4": {
      id: "task-4",
      content: "Deploy",
      date: "November 11th, 2024",
      project: "Pioneer Mobile App",
    },
  },
  columns: {
    "column-1": { id: "column-1", title: "To Do", taskIds: ["task-1"] },
    "column-2": { id: "column-2", title: "In Progress", taskIds: ["task-2"] },
    "column-3": { id: "column-3", title: "In Review", taskIds: ["task-3"] },
    "column-4": { id: "column-4", title: "Done", taskIds: ["task-4"] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};
