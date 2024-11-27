import { H4 } from "@/components/H4";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, PlusIcon } from "lucide-react";

type AssignedTaskProps = {
  title: string;
  projectName: string;
};

export const AssignedTask = ({ title, projectName }: AssignedTaskProps) => {
  return (
    <div className="flex flex-col gap-2 bg-card-foreground p-5 rounded-md border border-border-light">
      <h5 className="font-bold tracking-[-0.18px] text-text-primary">
        {title}
      </h5>
      <ul className="text-text-secondary flex items-center gap-2 text-sm">
        <li>{projectName}</li>
        <li className="text-xs">&#x2022;</li>
        <li className="flex items-center gap-2">
          <span>
            <CalendarIcon className="size-4" />
          </span>
          <p>Due in 3 days</p>
        </li>
      </ul>
    </div>
  );
};

export const AssignedTasksCard = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-5">
        <H4>Assigned Tasks</H4>
        <button className="p-1 rounded-md bg-text-primary/5 hover:bg-text-primary/10  text-text-primary transition">
          <PlusIcon />
        </button>
      </div>

      <CardContent className="flex flex-col gap-2">
        <AssignedTask title="Web Mockup" projectName="Eclipse CRM" />
        <AssignedTask title="Web Mockup" projectName="Eclipse CRM" />
        <AssignedTask title="Web Mockup" projectName="Eclipse CRM" />
      </CardContent>
    </Card>
  );
};
