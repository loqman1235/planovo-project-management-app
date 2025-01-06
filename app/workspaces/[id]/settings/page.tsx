import { DangerZoneCard } from "./_components/DangerZoneCard";
import { InviteMembersCard } from "./_components/InviteMembersCard";
import { WorkspaceDetailsCard } from "./_components/WorkspaceDetailsCard";

const SettingsPage = () => {
  return (
    <div className="space-y-5">
      <WorkspaceDetailsCard />
      <InviteMembersCard />
      <DangerZoneCard />
    </div>
  );
};
export default SettingsPage;
