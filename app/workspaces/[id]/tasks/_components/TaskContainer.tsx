"use client";
import { Divider } from "@/components/Divider";
import { useKanbanBoard } from "@/context/KanbanBoardContext";
import { Task } from "@/types";
import { EllipsisIcon } from "lucide-react";

type TaskContainerProps = {
  task: Task;
};

export const TaskContainer = ({ task }: TaskContainerProps) => {
  const { handleDragStart, handleDragEnd, handleDrag } = useKanbanBoard();
  const isDragging = false;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag events
  };

  return (
    <div
      onDrag={() => handleDrag(task.id)}
      onDragStart={() => handleDragStart(task.id)}
      onDragEnd={handleDragEnd}
      draggable
      className={`w-full flex flex-col bg-card-foreground p-5 rounded-md border border-border-light
        cursor-grab active:cursor-grabbing ${isDragging && "shadow-xl"}
        `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h5 className="font-semibold text-sm text-text-primary tracking-[-0.18px] capitalize">
          {task.title}
        </h5>
        <button onClick={handleMenuClick} className="text-text-primary">
          <EllipsisIcon className="size-4" />
        </button>
      </div>
      <Divider />
      <div className="flex-grow"></div>
    </div>
  );
};
