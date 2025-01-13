import prisma from "@/lib/prisma";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

type WorkspacesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

const WorkspaceLayout = async ({ children, params }: WorkspacesLayoutProps) => {
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
    return <div>Workspace not found</div>;
  }

  return (
    <main className="w-full h-screen flex">
      <Sidebar workspace={workspace} />
      <div className="flex-grow bg-foreground p-5 min-h-screen overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </main>
  );
};
export default WorkspaceLayout;
