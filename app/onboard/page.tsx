import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateInitialWorkspaceForm from "./_components/CreateInitialWorkspaceForm";

const OnboardPage = () => {
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
