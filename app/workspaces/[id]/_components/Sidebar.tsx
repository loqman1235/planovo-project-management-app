"use client";

import { Brand } from "@/components/Brand";
import { Divider } from "@/components/Divider";
import {
  ChevronsUpDown,
  CircleCheckIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import Link from "next/link";

export const Sidebar = ({ workspaceId }: { workspaceId: string }) => {
  const sidebarLinks = [
    { text: "home", href: `/workspaces/${workspaceId}`, icon: HomeIcon },
    {
      text: "my tasks",
      href: `/workspaces/${workspaceId}/tasks`,
      icon: CircleCheckIcon,
    },
    {
      text: "members",
      href: `/workspaces/${workspaceId}/members`,
      icon: UsersIcon,
    },
    {
      text: "settings",
      href: `/workspaces/${workspaceId}/settings`,
      icon: SettingsIcon,
    },
  ];

  return (
    <aside className="relative h-full w-[var(--sidebar-width)] py-5 border-r border-r-border">
      <div className="absolute top-0 left-0   bg-primary w-[40px] h-[40px] rounded-full blur-[60px] -z-10"></div>

      <div className="px-5">
        <Brand />
      </div>

      <div className="px-5">
        <Divider />
      </div>

      {/* WORKSPACES SECTION */}
      <div className="flex flex-col gap-5 px-5 mb-5">
        <div className="flex items-center justify-between ">
          <span className="text-xs text-text-tertiary uppercase tracking-wide">
            Workspaces
          </span>
          <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
            <PlusIcon className="text-background size-3" />
          </button>
        </div>

        <button className="w-full p-1.5 rounded-md border border-border-light bg-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#EC4899] flex items-center justify-center text-xs font-medium">
              AC
            </div>
            <p className="text-sm">Acme Corp</p>
          </div>

          <ChevronsUpDown className="size-4" />
        </button>
      </div>

      {/* MENU SECTION */}
      <div className="flex flex-col gap-2">
        {/* <div className="px-5">
          <span className="text-xs text-text-tertiary uppercase tracking-wide">
            MENU
          </span>
        </div> */}

        {/* MENU LINKS HERE */}
        <ul className="pl-2.5 pr-5 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </ul>
      </div>

      <div className="px-5">
        <Divider />
      </div>

      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary uppercase tracking-wide">
            Projects
          </span>
          <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
            <PlusIcon className="text-background size-3" />
          </button>
        </div>

        <ul className="flex flex-col gap-5">
          <li>
            <Link
              className="flex items-center gap-2 hover:text-text-primary transition text-text-secondary"
              href="/workspaces/1/projects/1"
            >
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-xs text-text-primary">
                M
              </div>
              <span className="text-sm">Mobile App Development</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 hover:text-text-primary transition text-text-secondary"
              href="/workspaces/1/projects/1"
            >
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-xs text-text-primary">
                W
              </div>
              <span className="text-sm">Website Redesign</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
