"use client";

import { INITIAL_COLUMNS } from "@/data";
import { Column, Task } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type KanbanBoardContext = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createTask: (title: string, collId: string) => void;
  handleDragOver: (e: React.DragEvent, collId: string, tasks: Task[]) => void;
  handleDragStart: (taskId: string) => void;
  handleDragEnd: () => void;
  handleDrag: (taskId: string) => void;
  handleDrop: (e: React.DragEvent, collId: string) => void;
  draggingTaskId: string | null;
  dropTargetColumn: string | null;
  dropIndex: number | null;
};

export const KanbanBoardContext = createContext<KanbanBoardContext>({
  columns: INITIAL_COLUMNS,
  setColumns: () => {},
  createTask: () => {},
  handleDragOver: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleDrag: () => {},
  handleDrop: () => {},
  draggingTaskId: null,
  dropTargetColumn: null,
  dropIndex: null,
});

export const KanbanBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [dropTargetColumn, setDropTargetColumn] = useState<string | null>(null);

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

  const handleDragOver = (
    e: React.DragEvent,
    collId: string,
    tasks: Task[]
  ) => {
    e.preventDefault();
    setDropTargetColumn(collId);

    let newDropIndex = tasks.length;

    for (let i = 0; i < tasks.length; i++) {
      const taskElement = document.getElementById(tasks[i].id);
      if (taskElement) {
        const taskElementBounding = taskElement.getBoundingClientRect();
        const taskElementMiddle =
          taskElementBounding.top + taskElementBounding.height / 2;

        if (e.clientY < taskElementMiddle) {
          newDropIndex = i;
          break;
        }
      }
    }

    setDropIndex(newDropIndex);
  };

  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDrag = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDropIndex(null);
    setDropTargetColumn(null);
  };

  const handleDrop = (e: React.DragEvent, collId: string) => {
    e.preventDefault();

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      const sourceColumnIndex = updatedColumns.findIndex((col) =>
        col.tasks.some((t) => t.id === draggingTaskId)
      );

      const targetColumnIndex = updatedColumns.findIndex(
        (col) => col.id === collId
      );

      if (sourceColumnIndex === -1 || targetColumnIndex === -1)
        return prevColumns;

      const sourceTasks = [...updatedColumns[sourceColumnIndex].tasks];
      const targetTasks = [...updatedColumns[targetColumnIndex].tasks];

      const taskIndex = sourceTasks.findIndex((t) => t.id === draggingTaskId);
      if (taskIndex === -1) return prevColumns;
      const [task] = sourceTasks.splice(taskIndex, 1);

      if (sourceColumnIndex === targetColumnIndex) {
        sourceTasks.splice(dropIndex ?? sourceTasks.length, 0, task);
        updatedColumns[sourceColumnIndex].tasks = sourceTasks;
      } else {
        targetTasks.splice(dropIndex ?? sourceTasks.length, 0, task);
        updatedColumns[sourceColumnIndex].tasks = sourceTasks;
        updatedColumns[targetColumnIndex].tasks = targetTasks;
      }

      return updatedColumns;
    });

    setDraggingTaskId(null);
    setDropIndex(null);
    setDropTargetColumn(null);
  };

  useEffect(() => {
    console.log(columns);
  }, [columns]);

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
        handleDrop,
        draggingTaskId,
        dropTargetColumn,
        dropIndex,
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
