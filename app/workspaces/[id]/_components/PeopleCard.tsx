import { H4 } from "@/components/H4";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

type MemberCardProps = {
  username: string;
  email: string;
  //   avatar: string;
};

const MemberCard = ({ username, email }: MemberCardProps) => {
  return (
    <div className="flex items-center gap-3 bg-card-foreground p-4 rounded-md border border-border-light">
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-md overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={`https://avatar.iran.liara.run/username?username=${username[0]}+${username[1]}`}
          alt="avatar"
          fill
        />
      </div>

      <ul>
        <li className="font-semibold text-sm text-text-primary">{username}</li>
        <li className="text-text-secondary text-sm">{email}</li>
      </ul>
    </div>
  );
};

export const PeopleCard = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-5">
        <H4>People</H4>
        <button className="p-1 rounded-md bg-text-primary/5 hover:bg-text-primary/10  text-text-primary transition">
          <PlusIcon />
        </button>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
        <MemberCard username="Hanna Aminoff" email="hanna@gmail.com" />
      </CardContent>
    </Card>
  );
};
