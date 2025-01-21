import { H4 } from "@/components/H4";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WorkspaceDetailsForm } from "./WorkspaceDetailsForm";
import { Workspace } from "@prisma/client";

type Props = {
  workspace: Workspace;
};

export const WorkspaceDetailsCard = async ({ workspace }: Props) => {
  return (
    <Card>
      <CardHeader className="gap-1">
        <H4>Workspace Details</H4>
        <span className="capitalize text-sm text-text-secondary !m-0">
          Manage workspace details
        </span>
      </CardHeader>
      <CardContent>
        <WorkspaceDetailsForm
          workspaceId={workspace.id}
          workspaceName={workspace.name}
        />
      </CardContent>
    </Card>
  );
};
