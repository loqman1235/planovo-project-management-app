"use client";

import { useKanbanBoard } from "../_context/KanbanBoardContext";
import { ColumnContainer } from "./ColumnContainer";

export const KanbanBoard = () => {
  const { columns } = useKanbanBoard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {columns.map((column) => (
        <ColumnContainer
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
          type={column.type}
        />
      ))}
    </div>
  );
};
