import { createInitialWorkspace } from "@/actions/workspaceActions";
import { auth } from "@/auth";
import { SignOutBtn } from "@/components/SignOutBtn";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Create or get workspace after successful authentication
  const workspace = await createInitialWorkspace(session.user.id);

  // Redirect to workspace if it exists
  if (workspace) {
    redirect(`/workspaces/${workspace.id}`);
  }

  return (
    <div>
      <h1>Homepage</h1>
      <div>Hello {session.user.username}</div>
      <SignOutBtn />
    </div>
  );
};
export default Home;
