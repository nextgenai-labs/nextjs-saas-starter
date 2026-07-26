import { type Permission, type WorkspaceRole, ROLE_PERMISSIONS } from "@/lib/types/permissions";

export function can(role: WorkspaceRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}

export function canAny(role: WorkspaceRole, permissions: Permission[]): boolean {
  return permissions.some((p) => can(role, p));
}

export function canAll(role: WorkspaceRole, permissions: Permission[]): boolean {
  return permissions.every((p) => can(role, p));
}

export function isOwner(role: WorkspaceRole): boolean {
  return role === "OWNER";
}

export function isAdmin(role: WorkspaceRole): boolean {
  return role === "ADMIN" || role === "OWNER";
}

export function isMember(_role: WorkspaceRole): boolean {
  return true;
}
