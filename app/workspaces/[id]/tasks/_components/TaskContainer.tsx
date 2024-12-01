"use client";
import { Divider } from "@/components/Divider";
import { Task } from "@/types";
import { EllipsisIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

type TaskContainerProps = {
  task: Task;
  columnId: string;
};

export const TaskContainer = ({ task }: TaskContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag events
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
