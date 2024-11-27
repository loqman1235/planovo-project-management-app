import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

type WorkspacesLayoutProps = {
  children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: WorkspacesLayoutProps) => {
  return (
    <main className="w-full h-screen flex">
      <Sidebar workspaceId="1" />
      <div className="flex-grow bg-foreground p-5 min-h-screen overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </main>
  );
};
export default WorkspaceLayout;
