"use client";

import { WorkspaceWithProjects } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { getWorkspaces } from "../workspaces/actions";

type WorkspaceContextType = {
  workspaces: WorkspaceWithProjects[];
};

export const workspaceContext = createContext<WorkspaceContextType>({
  workspaces: [],
});

export const WorkspaceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceWithProjects[] | []>(
    []
  );

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const workspaces = await getWorkspaces();
        setWorkspaces(workspaces);
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
        setWorkspaces([]);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <workspaceContext.Provider value={{ workspaces: [] }}>
      {children}
    </workspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(workspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspaceContext must be within WorkspaceContextProvider"
    );
  }

  return context;
};
