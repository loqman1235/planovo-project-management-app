"use client";

import { INITIAL_COLUMNS } from "@/data";
import { Column, Task } from "@/types";
import React, { createContext, useContext, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";

type KanbanBoardContext = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createTask: (title: string, collId: string) => void;
  handleDragStart: (e: DragStartEvent) => void;
  handleDragEnd: (e: DragEndEvent) => void;
  handleDragOver: (e: DragOverEvent) => void;
  activeTask?: Task | null;
};

export const KanbanBoardContext = createContext<KanbanBoardContext>({
  columns: INITIAL_COLUMNS,
  setColumns: () => {},
  createTask: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleDragOver: () => {},
  activeTask: null,
});

export const KanbanBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const task = columns
      .map((col) => col.tasks)
      .flat()
      .find((t) => t.id === active.id);

    if (task) {
      setActiveTask(task);
    }
  };
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) {
      setActiveTask(null);
      return;
    }

    if (!active.data.current || !over.data.current) return;

    const isActiveTask = active.data.current.type === "Task";
    const isOverTask = over.data.current.type === "Task";
    const isActiveColumn = active.data.current.type === "Column";
    const isOverColumn = over.data.current.type === "Column";

    // ordering tasks
    if (isActiveTask && isOverTask) {
      const activeCol = columns.find((col) =>
        col.tasks.find((t) => t.id === active.id)
      );
      const overCol = columns.find((col) =>
        col.tasks.find((t) => t.id === active.id)
      );

      if (!activeCol || !overCol) return;

      const activeColPos = columns.findIndex((col) => col.id === activeCol.id);
      const overColPos = columns.findIndex((col) => col.id === overCol.id);

      const activeTaskPos = columns[activeColPos].tasks.findIndex(
        (t) => t.id === active.id
      );
      const overTaskPos = columns[overColPos].tasks.findIndex(
        (t) => t.id === over.id
      );

      const newCols = [...columns];
      const activeTasks = [...newCols[activeColPos].tasks];
      const overTasks = [...newCols[overColPos].tasks];

      // same column
      if (activeColPos === overColPos) {
        const [removedTask] = activeTasks.splice(activeTaskPos, 1);
        activeTasks.splice(overTaskPos, 0, removedTask);
        newCols[activeColPos] = {
          ...newCols[activeColPos],
          tasks: activeTasks,
        };

        setColumns(newCols);
      } else {
        const [removedTask] = activeTasks.splice(activeTaskPos, 1);
        overTasks.splice(overTaskPos, 0, removedTask);

        newCols[activeColPos] = {
          ...newCols[activeColPos],
          tasks: activeTasks,
        };

        newCols[overColPos] = {
          ...newCols[overColPos],
          tasks: overTasks,
        };

        setColumns(newCols);
      }
    }

    // handle dropping on empty column
    if (isActiveColumn && isOverColumn) {
      const activeCol = columns.find((col) =>
        col.tasks.find((t) => t.id === active.id)
      );
      const overCol = columns.find((col) =>
        col.tasks.find((t) => t.id === over.id)
      );

      if (!activeCol || !overCol) {
        setActiveTask(null);
        return;
      }

      const activeColPos = columns.findIndex((col) => col.id === activeCol.id);
      const overColPos = columns.findIndex((col) => col.id === overCol.id);

      const activeTaskPos = columns[activeColPos].tasks.findIndex(
        (t) => t.id === active.id
      );

      const newCols = [...columns];
      const activeTasks = [...newCols[activeColPos].tasks];
      const overTasks = [...newCols[overColPos].tasks];

      if (activeColPos === overColPos) return;

      const [removedTask] = activeTasks.splice(activeTaskPos, 1);
      overTasks.splice(0, 0, removedTask);

      newCols[activeColPos] = {
        ...newCols[activeColPos],
        tasks: activeTasks,
      };

      newCols[overColPos] = {
        ...newCols[overColPos],
        tasks: overTasks,
      };

      setColumns(newCols);
    }

    setActiveTask(null);
  };
  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    if (!active.data.current || !over.data.current) return;
    const isOverColumn = over.data.current.type === "Column";
    const isActiveTask = active.data.current.type === "Task";
    const isOverTask = over.data.current.type === "Task";

    if (isActiveTask && isOverTask) {
      const activeCol = columns.find((col) =>
        col.tasks.find((t) => t.id === active.id)
      );
      const overCol = columns.find((col) =>
        col.tasks.find((t) => t.id === over.id)
      );

      if (!activeCol || !overCol) return;

      const activeColPos = columns.findIndex((col) => col.id === activeCol.id);
      const overColPos = columns.findIndex((col) => col.id === overCol.id);

      const activeTaskPos = columns[activeColPos].tasks.findIndex(
        (t) => t.id === active.id
      );
      const overTaskPos = columns[overColPos].tasks.findIndex(
        (t) => t.id === over.id
      );

      if (activeColPos === overColPos) return;

      const newCols = [...columns];
      const activeTasks = [...newCols[activeColPos].tasks];
      const overTasks = [...newCols[overColPos].tasks];

      const [removedTask] = activeTasks.splice(activeTaskPos, 1);
      overTasks.splice(overTaskPos, 0, removedTask);

      newCols[activeColPos] = {
        ...newCols[activeColPos],
        tasks: activeTasks,
      };

      newCols[overColPos] = {
        ...newCols[overColPos],
        tasks: overTasks,
      };

      setColumns(newCols);
    }

    // task over empty column
    if (isActiveTask && isOverColumn) {
      const activeCol = columns.find((col) =>
        col.tasks.find((t) => t.id === active.id)
      );

      const overCol = columns.find((col) => col.id === over.id);

      if (!activeCol || !overCol) {
        return;
      }

      const activeColPos = columns.findIndex((col) => col.id === activeCol.id);

      const overColPos = columns.findIndex((col) => col.id === overCol.id);

      const activeTaskPos = columns[activeColPos].tasks.findIndex(
        (t) => t.id === active.id
      );

      const newCols = [...columns];

      const activeTasks = [...newCols[activeColPos].tasks];
      const overTasks = [...newCols[overColPos].tasks];

      if (activeColPos === overColPos) {
        setActiveTask(null);
        return;
      }

      const [removedTask] = activeTasks.splice(activeTaskPos, 1);
      overTasks.splice(0, 0, removedTask);

      newCols[activeColPos] = {
        ...newCols[activeColPos],
        tasks: activeTasks,
      };

      newCols[overColPos] = {
        ...newCols[overColPos],
        tasks: overTasks,
      };

      setColumns(newCols);
    }
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        setColumns,
        createTask,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        activeTask,
      }}
    >
      <DndContext
        id="kabanboard"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {children}
      </DndContext>
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
