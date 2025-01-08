import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction, useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKanbanBoard } from "../_context/KanbanBoardContext";

type CreateNewTaskBtnProps = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const CreateNewTaskBtn = ({
  id,
  open,
  setOpen,
}: CreateNewTaskBtnProps) => {
  const { createTask } = useKanbanBoard();
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
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
        <div className="py-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={(e) => setTaskTitle(e.target.value)}
              id="title"
              placeholder="Task title"
              value={taskTitle}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="dueDate">Due date</Label>
            <Input
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              id="dueDate"
              placeholder="Select due date"
              value={dueDate}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="assignee">Assignee</Label>
            <Select>
              <SelectTrigger id="assignee" className="w-full">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="johndie">John Doe</SelectItem>
                <SelectItem value="dark">Jane Smith</SelectItem>
                <SelectItem value="system">Sam McLaren</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="project">Project</Label>
            <Select>
              <SelectTrigger id="project" className="w-full">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monileappdev">
                  Mobile App Development
                </SelectItem>
                <SelectItem value="webredesign">Website Redesign</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (taskTitle.trim().length === 0) return;

              createTask(taskTitle, id);
              setTaskTitle("");
              setOpen(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
