import { H3 } from "@/components/H3";

// type Props = {
//   workspaceStats: {
//     totalProjects: number;
//     totalTasks: number;
//     assignedTasks: number;
//     completedTasks: number;
//   };
// };

export const WorkspaceStats = () => {
  return (
    <div className="w-full p-5 bg-card shadow-md rounded-md border border-border grid grid-cols-1 md:grid-cols-5 items-center justify-center gap-5 mb-5">
      <div className="flex flex-col gap-1 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-border-light">
        <span className="capitalize text-[15px] text-text-secondary">
          total projects
        </span>
        <H3>8</H3>
      </div>

      <div className="flex flex-col gap-1 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-border-light">
        <span className="capitalize text-[15px] text-text-secondary">
          total tasks
        </span>
        <H3>40</H3>
      </div>

      <div className="flex flex-col gap-1 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-border-light">
        <span className="capitalize text-[15px] text-text-secondary">
          assigned tasks
        </span>
        <H3>12</H3>
      </div>

      <div className="flex flex-col gap-1 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-border-light">
        <span className="capitalize text-[15px] text-text-secondary">
          completed tasks
        </span>
        <H3>8</H3>
      </div>

      <div className="flex flex-col gap-1">
        <span className="capitalize text-[15px] text-text-secondary">
          overdue tasks
        </span>
        <H3>3</H3>
      </div>
    </div>
  );
};
