"use client";

import { Brand } from "@/components/Brand";
import { Divider } from "@/components/Divider";
import {
  ChevronsUpDown,
  CircleCheckIcon,
  HomeIcon,
  InboxIcon,
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
      text: "inbox",
      href: `/workspaces/${workspaceId}/inbox`,
      icon: InboxIcon,
    },
    {
      text: "settings",
      href: `/workspaces/${workspaceId}/settings`,
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-[var(--sidebar-width)] border-r border-r-border">
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2  bg-primary w-[100px] h-[100px] rounded-full blur-[150px] -z-10"></div>

      <div className="mb-10 p-5 pb-0">
        <Brand />
      </div>

      {/* WORKSPACES SECTION */}
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between ">
          <span className="text-sm text-text-tertiary uppercase tracking-wide">
            Workspaces
          </span>
          <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
            <PlusIcon className="text-background size-3" />
          </button>
        </div>

        <button className="w-full p-2 rounded-md border border-border-light bg-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#EC4899] flex items-center justify-center text-xs font-medium">
              AC
            </div>
            <p className="text-sm">Acme Corp</p>
          </div>

          <ChevronsUpDown className="size-4" />
        </button>
      </div>
      <div className="px-5">
        <Divider />
      </div>
      {/* MENU SECTION */}
      <div className="flex flex-col gap-5">
        <div className="px-5">
          <span className="text-sm text-text-tertiary uppercase tracking-wide">
            MENU
          </span>
        </div>

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

      {/* TODO: Seperate section in its own component */}
      {/* PROJECTS SECTION */}
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between ">
          <span className="text-sm text-text-tertiary uppercase tracking-wide">
            Projects
          </span>
          <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
            <PlusIcon className="text-background size-3" />
          </button>
        </div>

        <ul className="flex flex-col gap-5 max-h-[80px] overflow-y-auto">
          <li>
            <Link href="/workspaces/1" className="flex items-center gap-5">
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-sm">
                E
              </div>
              <span className="text-text-secondary hover:text-text-primary transition">
                Eclipse CRM
              </span>
            </Link>
          </li>
          <li>
            <Link href="/workspaces/1" className="flex items-center gap-5">
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-sm">
                E
              </div>
              <span className="text-text-secondary hover:text-text-primary transition">
                Eclipse CRM
              </span>
            </Link>
          </li>
          <li>
            <Link href="/workspaces/1" className="flex items-center gap-5">
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-sm">
                E
              </div>
              <span className="text-text-secondary hover:text-text-primary transition">
                Eclipse CRM
              </span>
            </Link>
          </li>
          <li>
            <Link href="/workspaces/1" className="flex items-center gap-5">
              <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-primary-gradient text-sm">
                E
              </div>
              <span className="text-text-secondary hover:text-text-primary transition">
                Eclipse CRM
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
