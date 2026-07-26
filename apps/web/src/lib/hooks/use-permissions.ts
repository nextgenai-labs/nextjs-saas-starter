import { useMemo } from "react";
import { can, canAny, canAll, isOwner, isAdmin, isMember } from "@/lib/permissions/ability";
import { useWorkspace } from "@/lib/workspace";
import type { Permission, WorkspaceRole } from "@/lib/types/permissions";

export function usePermissions() {
  const { currentWorkspace } = useWorkspace();

  const role = (currentWorkspace?.role ?? "MEMBER") as WorkspaceRole;

  return useMemo(() => {
    function hasPermission(permission: Permission): boolean {
      return can(role, permission);
    }

    return {
      role,
      can: hasPermission,
      canAny: (permissions: Permission[]) => canAny(role, permissions),
      canAll: (permissions: Permission[]) => canAll(role, permissions),
      isOwner: isOwner(role),
      isAdmin: isAdmin(role),
      isMember: isMember(role),
    };
  }, [role]);
}
