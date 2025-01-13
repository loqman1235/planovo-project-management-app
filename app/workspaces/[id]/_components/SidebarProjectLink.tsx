import { Project } from "@prisma/client";
import Link from "next/link";

type SidebarProjectLinkProps = {
  workspaceId: string;
  project: Project;
};

export const SidebarProjectLink = ({
  workspaceId,
  project,
}: SidebarProjectLinkProps) => {
  return (
    <li>
      <Link
        className="flex items-center gap-2 hover:text-text-primary transition text-text-secondary"
        href={`/workspaces/${workspaceId}/projects/${project.id}`}
      >
        <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-xs text-text-primary">
          {project.name[0]}
        </div>
        <span className="text-sm">{project.name}</span>
      </Link>
    </li>
  );
};
