import { AssignedTasksCard } from "./_components/AssignedTasksCard";
import { PeopleCard } from "./_components/PeopleCard";
import { ProjectsCard } from "./_components/ProjectsCard";
import { WorkspaceStats } from "./_components/WorkspaceStats";

const WorkspacePage = () => {
  return (
    <div>
      <WorkspaceStats />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 mb-5">
        <AssignedTasksCard />
        <ProjectsCard />
      </div>
      <PeopleCard />
    </div>
  );
};
export default WorkspacePage;
