"use client";

import { INITIAL_COLUMNS } from "@/data";
import { Column } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";

type KanbanBoardContext = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createTask: (title: string, collId: string) => void;
  handleDragStart: (e: DragStartEvent) => void;
  handleDragEnd: (e: DragEndEvent) => void;
  handleDragOver: (e: DragOverEvent) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContext>({
  columns: INITIAL_COLUMNS,
  setColumns: () => {},
  createTask: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleDragOver: () => {},
});

export const KanbanBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);

  console.log("columns", columns);

  const createTask = (title: string, collId: string) => {
    console.log(title);

    const newTask = { id: crypto.randomUUID(), title };
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === collId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }

        return column;
      });
    });
  };

  const handleDragStart = (e: DragStartEvent) => {};
  const handleDragEnd = (e: DragEndEvent) => {};
  const handleDragOver = (e: DragOverEvent) => {};

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        setColumns,
        createTask,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
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
