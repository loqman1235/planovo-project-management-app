import { Divider } from "@/components/Divider";
import { H4 } from "@/components/H4";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DangerZoneCard = () => {
  return (
    <Card>
      <CardHeader className="gap-1 !pb-0">
        <H4>Danger Zone</H4>
        <span className="capitalize text-sm text-text-secondary !m-0">
          Deleting a workspace is irreversible and will remove all associated
          data
        </span>
      </CardHeader>
      <CardContent>
        <Divider />
        <Button variant="destructive" className="py-5">
          Delete workspace
        </Button>
      </CardContent>
    </Card>
  );
};
