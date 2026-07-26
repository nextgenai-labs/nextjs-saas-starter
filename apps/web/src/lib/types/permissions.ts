export type Permission =
  | "workspace:read"
  | "workspace:update"
  | "workspace:delete"
  | "member:read"
  | "member:invite"
  | "member:remove"
  | "member:role:update"
  | "billing:read"
  | "billing:manage"
  | "settings:read"
  | "settings:update"
  | "audit:read";

export const WorkspaceRole = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type WorkspaceRole = (typeof WorkspaceRole)[keyof typeof WorkspaceRole];

export const ROLE_PERMISSIONS: Record<WorkspaceRole, Permission[]> = {
  OWNER: [
    "workspace:read",
    "workspace:update",
    "workspace:delete",
    "member:read",
    "member:invite",
    "member:remove",
    "member:role:update",
    "billing:read",
    "billing:manage",
    "settings:read",
    "settings:update",
    "audit:read",
  ],
  ADMIN: [
    "workspace:read",
    "workspace:update",
    "member:read",
    "member:invite",
    "member:remove",
    "billing:read",
    "settings:read",
    "settings:update",
  ],
  MEMBER: ["workspace:read", "member:read", "billing:read", "settings:read"],
};
