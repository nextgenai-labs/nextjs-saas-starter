"use client";

import type { ReactNode } from "react";
import { WorkspaceProvider } from "@/lib/workspace";
import { SearchProvider } from "@/lib/search";
import { NotificationProvider } from "@/components/ui/notifications";

type DashboardProvidersProps = {
  children: ReactNode;
  initialWorkspaces: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    role: string;
  }[];
};

export function DashboardProviders({ children, initialWorkspaces }: DashboardProvidersProps) {
  const workspaces = initialWorkspaces.map((w) => ({
    ...w,
    role: w.role as "OWNER" | "ADMIN" | "MEMBER",
  }));

  return (
    <WorkspaceProvider initialWorkspaces={workspaces}>
      <SearchProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </SearchProvider>
    </WorkspaceProvider>
  );
}
