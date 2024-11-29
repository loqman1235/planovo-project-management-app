import { H4 } from "@/components/H4";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

type ProjectProps = {
  name: string;
};

const Project = ({ name }: ProjectProps) => {
  return (
    <div className="flex items-center gap-3 bg-card-foreground p-4 rounded-md border border-border-light">
      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary-gradient text-base text-text-primary">
        {name[0]}
      </div>

      <ul className="flex flex-col">
        <li className="font-semibold text-sm text-text-primary">{name}</li>
        <li className="text-text-secondary text-sm">No Task</li>
      </ul>
    </div>
  );
};

export const ProjectsCard = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-5">
        <H4>Projects</H4>
        <button className="p-1 rounded-md bg-text-primary/5 hover:bg-text-primary/10  text-text-primary transition">
          <PlusIcon />
        </button>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Project name="Eclipse CRM" />
        <Project name="Nimbus Cloud" />
        <Project name="Pioner Mobile" />
        <Project name="Project 4" />
        <Project name="Project 5" />
        <Project name="Project 6" />
      </CardContent>
    </Card>
  );
};
