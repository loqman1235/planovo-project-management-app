import { AssignedTasksCard } from "./_components/AssignedTasksCard";
import { WorkspaceStats } from "./_components/WorkspaceStats";

const WorkspacePage = () => {
  return (
    <div>
      <WorkspaceStats />
      <div className="grid grid-cols-2 items-center gap-5 mb-5">
        <AssignedTasksCard />
        <AssignedTasksCard />
      </div>
    </div>
  );
};
export default WorkspacePage;
