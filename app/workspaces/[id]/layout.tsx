import { Sidebar } from "./_components/Sidebar";

type WorkspacesLayoutProps = {
  children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: WorkspacesLayoutProps) => {
  return (
    <main className="w-full h-screen flex">
      <Sidebar workspaceId="1" />
      <div className="flex-grow p-5 bg-foreground">{children}</div>
    </main>
  );
};
export default WorkspaceLayout;
