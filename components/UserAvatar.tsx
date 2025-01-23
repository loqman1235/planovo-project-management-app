import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  username: string;
  image?: string;
};

export const UserAvatar = ({ username, image }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback className="bg-primary">{username[0]}</AvatarFallback>
    </Avatar>
  );
};
