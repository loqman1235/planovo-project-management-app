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
  const [workspaces, setWorkspaces] = useState<WorkspaceWithProjects[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const result = await getWorkspaces();

        if ("error" in result) {
          console.error("Failed to fetch workspaces:", result.error);
          setWorkspaces([]);
        } else {
          // Result is an array of workspaces
          setWorkspaces(result);
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
        setWorkspaces([]);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <workspaceContext.Provider value={{ workspaces }}>
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
