"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { WorkspaceInfo } from "@/lib/types/workspace";

type WorkspaceContextType = {
  workspaces: WorkspaceInfo[];
  currentWorkspace: WorkspaceInfo | null;
  setWorkspaces: (workspaces: WorkspaceInfo[]) => void;
  setCurrentWorkspace: (workspace: WorkspaceInfo) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

type WorkspaceProviderProps = {
  children: ReactNode;
  initialWorkspaces: WorkspaceInfo[];
};

export function WorkspaceProvider({ children, initialWorkspaces }: WorkspaceProviderProps) {
  const [workspaces, setWorkspaces] = useState<WorkspaceInfo[]>(initialWorkspaces);
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceInfo | null>(
    initialWorkspaces[0] ?? null,
  );

  const handleSetWorkspaces = useCallback((newWorkspaces: WorkspaceInfo[]) => {
    setWorkspaces(newWorkspaces);
  }, []);

  const handleSetCurrentWorkspace = useCallback((workspace: WorkspaceInfo) => {
    setCurrentWorkspace(workspace);
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        setWorkspaces: handleSetWorkspaces,
        setCurrentWorkspace: handleSetCurrentWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
