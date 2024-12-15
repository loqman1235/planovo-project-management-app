"use client";

import { ColumnContainer } from "./ColumnContainer";
import {
  KanbanBoardProvider,
  useKanbanBoard,
} from "@/context/KanbanBoardContext";

export const KanbanBoard = () => {
  const { columns } = useKanbanBoard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <KanbanBoardProvider>
        {columns.map((column) => (
          <ColumnContainer
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            type={column.type}
          />
        ))}
      </KanbanBoardProvider>
    </div>
  );
};
