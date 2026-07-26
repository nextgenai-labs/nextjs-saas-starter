export const Role = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

const roleHierarchy: Record<Role, number> = {
  OWNER: 3,
  ADMIN: 2,
  MEMBER: 1,
};

export function hasRole(userRole: string, requiredRole: Role): boolean {
  const userLevel = roleHierarchy[userRole as Role] ?? 0;
  const requiredLevel = roleHierarchy[requiredRole];
  return userLevel >= requiredLevel;
}

export function canManageUsers(userRole: string): boolean {
  return hasRole(userRole, Role.ADMIN);
}

export function canManageBilling(userRole: string): boolean {
  return hasRole(userRole, Role.ADMIN);
}

export function canDeleteOrganization(userRole: string): boolean {
  return hasRole(userRole, Role.OWNER);
}
