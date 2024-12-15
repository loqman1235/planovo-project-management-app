"use client";

import { H4 } from "@/components/H4";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ColumnType, Task } from "@/types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TaskContainer } from "./TaskContainer";
import { useKanbanBoard } from "@/context/KanbanBoardContext";

type ColumnContainerProps = {
  id: string;
  title: string;
  type: ColumnType;
  tasks: Task[];
};

export const ColumnContainer = ({
  // id,
  title,
  type,
  tasks,
}: ColumnContainerProps) => {
  const { createTask, handleDragOver } = useKanbanBoard();
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const isOver = false;

  const columnHeadingColor = {
    backlog: "text-text-primary",
    todo: "text-[var(--column-inProgress)]",
    inProgress: "text-[var(--column-inReview)]",
    done: "text-[var(--column-done)]",
  };

  return (
    <Card
      onDragOver={handleDragOver}
      className={`w-full min-h-[253px] ${
        isOver && "border-2 border-border-light"
      }`}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <H4 className={columnHeadingColor[type]}>{title}</H4>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="p-1 rounded-md bg-text-primary/5 hover:bg-text-primary/10  text-text-primary transition">
              <PlusIcon />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new task</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  onChange={(e) => setTaskTitle(e.target.value)}
                  id="title"
                  placeholder="Task title"
                  value={taskTitle}
                />
              </div>
              {/* TODO: add assignee and project selection */}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  if (taskTitle.trim().length === 0) return;

                  createTask(taskTitle);
                  setTaskTitle("");
                  setOpen(false);
                }}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <CardContent className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskContainer key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
};
