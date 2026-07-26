"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@nextjs-saas/ui";
import { Building2, Check, Settings } from "lucide-react";
import { useWorkspace } from "@/lib/workspace";

export function WorkspaceSelector() {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const router = useRouter();

  if (!currentWorkspace) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ring-offset-background focus-visible:ring-ring hover:bg-accent flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2">
          <Building2 className="h-4 w-4 shrink-0" />
          <span className="max-w-[140px] truncate">{currentWorkspace.name}</span>
          <span className="text-muted-foreground/50 text-[10px] uppercase">
            {currentWorkspace.role}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onSelect={() => setCurrentWorkspace(workspace)}
            className="cursor-pointer"
          >
            <Building2 className="mr-2 h-4 w-4" />
            <div className="flex-1 truncate">{workspace.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-[10px] uppercase">{workspace.role}</span>
              {workspace.id === currentWorkspace.id && <Check className="text-primary h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => router.push("/settings/workspace")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          Workspace settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
