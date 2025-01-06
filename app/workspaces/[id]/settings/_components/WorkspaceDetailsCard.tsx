import { H4 } from "@/components/H4";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WorkspaceDetailsForm } from "./WorkspaceDetailsForm";

export const WorkspaceDetailsCard = () => {
  return (
    <Card>
      <CardHeader className="gap-1">
        <H4>Workspace Details</H4>
        <span className="capitalize text-sm text-text-secondary !m-0">
          Manage workspace details
        </span>
      </CardHeader>
      <CardContent>
        <WorkspaceDetailsForm />
      </CardContent>
    </Card>
  );
};
