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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SidebarProjectLink } from "./SidebarProjectLink";
import { WorkspaceWithProjects } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workspace } from "@prisma/client";
import Link from "next/link";

type SidebarProps = {
  currentWorkspace: WorkspaceWithProjects;
  userWorkspaces: Workspace[];
};

export const Sidebar = ({ currentWorkspace, userWorkspaces }: SidebarProps) => {
  const sidebarLinks = [
    {
      text: "home",
      href: `/workspaces/${currentWorkspace.id}`,
      icon: HomeIcon,
    },
    {
      text: "my tasks",
      href: `/workspaces/${currentWorkspace.id}/tasks`,
      icon: CircleCheckIcon,
    },
    {
      text: "members",
      href: `/workspaces/${currentWorkspace.id}/members`,
      icon: UsersIcon,
    },
    {
      text: "settings",
      href: `/workspaces/${currentWorkspace.id}/settings`,
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
          {/* ADD NEW WORKSPACE BUTTON */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
                <PlusIcon className="text-background size-3" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new workspace</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-5">
                <div className="space-y-1">
                  <Label htmlFor="title">Name</Label>
                  <Input
                    onChange={() => {}}
                    id="title"
                    placeholder="Workspace name"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="isPublic" />
                  <Label htmlFor="isPublic">Public</Label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {}}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* WORKSPACES DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full p-1.5 rounded-md border border-border-light bg-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[6px] bg-[#EC4899] flex items-center justify-center text-xs font-medium">
                  {currentWorkspace.name[0]}
                </div>
                <p className="text-sm">{currentWorkspace.name}</p>
              </div>

              <ChevronsUpDown className="size-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="dropdown-content-width-full border border-border-light bg-foreground"
            align="end"
            sideOffset={5}
          >
            {userWorkspaces.length > 0 &&
              userWorkspaces.map((workspace) => {
                if (workspace.id !== currentWorkspace.id) {
                  return (
                    <Link
                      key={workspace.id}
                      href={`/workspaces/${workspace.id}`}
                      className="w-full p-1.5 flex items-center justify-between hover:bg-card rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[6px] bg-[#EC4899] flex items-center justify-center text-xs font-medium">
                          {workspace.name[0]}
                        </div>
                        <p className="text-sm">{workspace.name}</p>
                      </div>
                    </Link>
                  );
                }
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
          {/* ADD NEW WORKSPACE BUTTON */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
                <PlusIcon className="text-background size-3" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new project</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-5">
                <div className="space-y-1">
                  <Label htmlFor="title">Name</Label>
                  <Input
                    onChange={() => {}}
                    id="title"
                    placeholder="Project name"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="isPublic" />
                  <Label htmlFor="isPublic">Public</Label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {}}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <ul className="flex flex-col gap-5">
          {currentWorkspace.projects.length > 0 ? (
            currentWorkspace.projects.map((project) => (
              <SidebarProjectLink
                key={project.id}
                workspaceId={currentWorkspace.id}
                project={project}
              />
            ))
          ) : (
            <p className="text-sm text-text-tertiary">
              Create Your First Project
            </p>
          )}
        </ul>
      </div>
    </aside>
  );
};
