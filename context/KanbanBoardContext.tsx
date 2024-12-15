"use client";

import { INITIAL_COLUMNS } from "@/data";
import { Column } from "@/types";
import { createContext, useContext, useState } from "react";

type KanbanBoardContext = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createTask: (title: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragStart: (taskId: string) => void;
  handleDragEnd: () => void;
  handleDrag: (taskId: string) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContext>({
  columns: INITIAL_COLUMNS,
  setColumns: () => {},
  createTask: () => {},
  handleDragOver: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleDrag: () => {},
});

export const KanbanBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const createTask = (title: string) => {
    console.log(title);

    const newTask = { id: crypto.randomUUID(), title };
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.type === "backlog") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }

        if (column.type === "todo") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }

        if (column.type === "inProgress") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }

        if (column.type === "done") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }

        return column;
      });
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log("Drag over");
  };

  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDrag = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
  };

  console.log("draggingTaskId", draggingTaskId);

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        setColumns,
        createTask,
        handleDragOver,
        handleDragStart,
        handleDragEnd,
        handleDrag,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};

export const useKanbanBoard = () => {
  const context = useContext(KanbanBoardContext);

  if (!context) {
    throw new Error("useKanbanBoard must be within KanbanBoardProvider");
  }

  return context;
};
