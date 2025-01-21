import { createContext, useContext } from "react";

type WorkspaceContextType = {
  workspaceId: string;
};

export const workspaceContext = createContext<WorkspaceContextType>({
  workspaceId: "",
});

export const workspaceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <workspaceContext.Provider value={{ workspaceId: "" }}>
      {children}
    </workspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(workspaceContext);

  if (!context) {
    throw new Error("useWorkspaceContext must be within WorkspaceProvider");
  }

  return context;
};
