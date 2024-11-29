import { Divider } from "@/components/Divider";
import { Task } from "@/types";
import { EllipsisIcon } from "lucide-react";

type TaskContainerProps = {
  task: Task;
};

export const TaskContainer = ({ task }: TaskContainerProps) => {
  return (
    <div className="w-full flex flex-col bg-card-foreground p-5 rounded-md border border-border-light">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h5 className="font-semibold text-sm text-text-primary tracking-[-0.18px]">
          {task.title}
        </h5>
        <button className="text-text-primary">
          <EllipsisIcon className="size-4" />
        </button>
      </div>
      <Divider />
      <div className="flex-grow"></div>
    </div>
  );
};
