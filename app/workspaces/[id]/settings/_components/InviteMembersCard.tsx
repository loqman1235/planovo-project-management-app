import { Divider } from "@/components/Divider";
import { H4 } from "@/components/H4";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";

export const InviteMembersCard = () => {
  return (
    <Card>
      <CardHeader className="gap-1">
        <H4>Invite Members</H4>
        <span className="capitalize text-sm text-text-secondary !m-0">
          Use the invite links to add members to your workspace
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            className="flex-1 p-5 text-text-primary"
            placeholder="http://localhost/workspaces/xGhui89Dfuy67dfrjmo"
          />
          <button className="text-text-primary flex items-center justify-center  bg-text-primary/5 hover:bg-text-primary/10 p-3 rounded-md">
            <CopyIcon className="size-4" />
          </button>
        </div>
        <Divider />
        <Button>Invite</Button>
      </CardContent>
    </Card>
  );
};
