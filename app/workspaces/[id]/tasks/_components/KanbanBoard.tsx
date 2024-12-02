"use client";

import { useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { Column, ColumnType, Task } from "@/types";
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns] = useState<Column[]>([
    { id: "1", title: "To Do", type: ColumnType.todo },
    { id: "2", title: "In Progress", type: ColumnType.inProgress },
    { id: "3", title: "In Review", type: ColumnType.inReview },
    { id: "4", title: "Done", type: ColumnType.done },
  ]);

  const createTask = (columnId: string, title: string) => {
    if (title.trim() !== "") {
      const newTask: Task = {
        id: Date.now().toString(),
        columnId,
        title,
      };

      setTasks([...tasks, newTask]);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (activeTask) {
      if (activeTask.columnId !== over.id) {
        // If task moved to a different column
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === active.id
              ? { ...task, columnId: over.id as string }
              : task
          )
        );
      } else {
        // If task was dropped in the same column, reorder tasks
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        const overIndex = tasks.findIndex((task) => task.id === over.id);

        // Reorder tasks in the same column based on their position
        const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);
        setTasks(reorderedTasks);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {columns.map((column) => (
          <ColumnContainer
            key={column.id}
            id={column.id}
            title={column.title}
            type={column.type as ColumnType}
            createTask={createTask}
            tasks={tasks.filter((task) => task.columnId === column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
};
