"use client";

import { useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { Task } from "@/types";

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (columnId: string, title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      columnId,
      title,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <ColumnContainer
        id="1"
        title="To Do"
        type="todo"
        createTask={createTask}
        tasks={tasks.filter((task) => task.columnId === "1")}
      />
      <ColumnContainer
        id="2"
        title="In Progress"
        type="inProgress"
        createTask={createTask}
        tasks={tasks.filter((task) => task.columnId === "2")}
      />
      <ColumnContainer
        id="3"
        title="In Review"
        type="inReview"
        createTask={createTask}
        tasks={tasks.filter((task) => task.columnId === "3")}
      />
      <ColumnContainer
        id="4"
        title="Done"
        type="done"
        createTask={createTask}
        tasks={tasks.filter((task) => task.columnId === "4")}
      />
    </div>
  );
};
