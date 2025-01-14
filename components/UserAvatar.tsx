import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  username: string;
  image?: string;
};

export const UserAvatar = ({ username, image }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  );
};
