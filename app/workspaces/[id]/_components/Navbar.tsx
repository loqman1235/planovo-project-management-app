import { UserAvatar } from "@/components/UserAvatar";
import { SearchForm } from "./SearchForm";
import { BellIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between mb-5">
      <SearchForm />

      <ul className="flex items-center gap-5">
        <li>
          <button className="relative">
            <BellIcon className="size-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-foreground"></span>
          </button>
        </li>
        <li>
          <UserAvatar />
        </li>
      </ul>
    </header>
  );
};
