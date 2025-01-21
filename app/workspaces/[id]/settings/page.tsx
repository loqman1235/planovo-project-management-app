import prisma from "@/lib/prisma";
import { DangerZoneCard } from "./_components/DangerZoneCard";
import { InviteMembersCard } from "./_components/InviteMembersCard";
import { WorkspaceDetailsCard } from "./_components/WorkspaceDetailsCard";

type SettingsPageProps = {
  params: Promise<{ id: string }>;
};

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { id } = await params;
  const workspace = await prisma.workspace.findUnique({
    where: {
      id,
    },
    include: {
      projects: true,
    },
  });

  if (!workspace) {
    return <div>Workspace not found </div>;
  }

  return (
    <div className="space-y-5">
      <WorkspaceDetailsCard workspace={workspace} />
      <InviteMembersCard />
      <DangerZoneCard />
    </div>
  );
};
export default SettingsPage;
