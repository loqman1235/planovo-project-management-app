"use client";

import { H4 } from "@/components/H4";
import { Card, CardContent } from "@/components/ui/card";
import { ColumnType, Task } from "@/types";
import { useState } from "react";
import { TaskContainer } from "./TaskContainer";
import { useKanbanBoard } from "../_context/KanbanBoardContext";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { CreateNewTaskBtn } from "./CreateTaskForm";

type ColumnContainerProps = {
  id: string;
  title: string;
  type: ColumnType;
  tasks: Task[];
};

export const ColumnContainer = ({
  id,
  title,
  type,
  tasks,
}: ColumnContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "Column",
    },
  });
  const { activeTask } = useKanbanBoard();
  const [open, setOpen] = useState(false);

  const columnHeadingColor = {
    backlog: "text-text-primary",
    todo: "text-[var(--column-inProgress)]",
    inProgress: "text-[var(--column-inReview)]",
    done: "text-[var(--column-done)]",
  };

  return (
    <Card ref={setNodeRef} className={`w-full min-h-[253px] `}>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <H4 className={columnHeadingColor[type]}>{title}</H4>
        </div>
        <CreateNewTaskBtn id={id} open={open} setOpen={setOpen} />
      </div>

      <CardContent className="flex flex-col gap-2">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={rectSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskContainer key={task.id} task={task} />
          ))}

          {activeTask &&
            createPortal(
              <DragOverlay>
                <TaskContainer task={activeTask} />
              </DragOverlay>,
              document.body
            )}
        </SortableContext>
      </CardContent>
    </Card>
  );
};
