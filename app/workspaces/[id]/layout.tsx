import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

type WorkspacesLayoutProps = {
  children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: WorkspacesLayoutProps) => {
  return (
    <main className="w-full h-screen flex">
      <Sidebar workspaceId="1" />
      <div className="flex-grow p-2 pl-0">
        <div className="rounded-md bg-foreground border border-border p-5">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};
export default WorkspaceLayout;
