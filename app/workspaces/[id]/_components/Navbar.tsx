import { UserAvatar } from "@/components/UserAvatar";
import { SearchForm } from "./SearchForm";
import { BellIcon, LogOutIcon, UserCircle } from "lucide-react";
import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = async () => {
  const session = await auth();

  if (!session?.user) return null;

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar
                image={session.user.image || ""}
                username={session.user?.username || ""}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-[200px]"
              align="end"
              sideOffset={5}
            >
              <DropdownMenuItem>
                <UserCircle className="size-4 mr-1" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/sign-in" });
                  }}
                >
                  <button className="flex items-center">
                    <LogOutIcon className="size-4 mr-1" /> Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </header>
  );
};
