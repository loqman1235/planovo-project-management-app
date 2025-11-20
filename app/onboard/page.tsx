import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateInitialWorkspaceForm from "./_components/CreateInitialWorkspaceForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDefaultWorkspace } from "@/lib/workspace";

const OnboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const defaultWorkspace = await getDefaultWorkspace(session.user.id);

  if (defaultWorkspace) {
    redirect(`/workspaces/${defaultWorkspace.id}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create your first workspace</CardTitle>
          <CardDescription>
            Get started by setting up your first workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CreateInitialWorkspaceForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default OnboardPage;
