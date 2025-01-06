"use client";
import { Divider } from "@/components/Divider";
import { Task } from "@/types";
import { EllipsisIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";

type TaskContainerProps = {
  task: Task;
};

export const TaskContainer = ({ task }: TaskContainerProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag events
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={`w-full flex flex-col bg-card-foreground p-5 rounded-md border border-border-light h-[120px] opacity-50
        `}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      id={task.id}
      className={`w-full flex flex-col bg-card-foreground p-5 rounded-md border border-border-light min-h-[120px]
        `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button {...listeners}>
            <RiDraggable className="size-5 text-text-primary" />
          </button>
          <h5 className="font-semibold text-sm text-text-primary tracking-[-0.18px] capitalize">
            {task.title}
          </h5>
        </div>
        <button onClick={handleMenuClick} className="text-text-primary">
          <EllipsisIcon className="size-4" />
        </button>
      </div>
      <Divider />
      <div className="flex-grow"></div>
    </div>
  );
};
