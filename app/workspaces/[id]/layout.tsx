import prisma from "@/lib/prisma";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type WorkspacesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

const WorkspaceLayout = async ({ children, params }: WorkspacesLayoutProps) => {
  const { id } = await params;

  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const currentWorkspace = await prisma.workspace.findUnique({
    where: {
      id,
    },
    include: {
      projects: true,
    },
  });

  if (!currentWorkspace) {
    return <div>Workspace not found</div>;
  }

  const userWorkspaces = await prisma.workspace.findMany({
    where: {
      ownerId: session.user.id,
    },
  });

  return (
    <main className="w-full h-screen flex">
      <Sidebar
        currentWorkspace={currentWorkspace}
        userWorkspaces={userWorkspaces}
      />
      <div className="flex-grow bg-foreground p-5 min-h-screen overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </main>
  );
};
export default WorkspaceLayout;
