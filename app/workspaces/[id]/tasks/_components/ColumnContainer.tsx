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

import { Task } from "@/types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TaskContainer } from "./TaskContainer";
import { useDroppable } from "@dnd-kit/core";

type ColumnContainerProps = {
  id: string;
  title: string;
  type: "todo" | "inProgress" | "inReview" | "done";
  createTask: (id: string, title: string) => void;
  tasks: Task[];
};

export const ColumnContainer = ({
  id,
  title,
  type,
  createTask,
  tasks,
}: ColumnContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const columnType = {
    todo: "bg-[var(--column-todo)]",
    inProgress: "bg-[var(--column-inProgress)]",
    inReview: "bg-[var(--column-inReview)]",
    done: "bg-[var(--column-done)]",
  };

  return (
    <Card
      ref={setNodeRef}
      className={`w-full min-h-[253px] ${
        isOver && "border border-border-light"
      }`}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${columnType[type]}`} />
          <H4>{title}</H4>
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
                  createTask(id, taskTitle);
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
          <TaskContainer key={task.id} task={task} columnId={id} />
        ))}
      </CardContent>
    </Card>
  );
};
