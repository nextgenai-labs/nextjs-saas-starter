import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import { can } from "./ability";
import type { Permission, WorkspaceRole } from "@/lib/types/permissions";

export async function requireAuth(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return session.user.id;
}

export async function requireWorkspaceAccess(
  workspaceId: string,
  permission?: Permission,
): Promise<{ userId: string; role: WorkspaceRole }> {
  const userId = await requireAuth();

  const member = await prisma.member.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
  });

  if (!member) {
    throw new ForbiddenError("You are not a member of this workspace");
  }

  const role = member.role as WorkspaceRole;

  if (permission && !can(role, permission)) {
    throw new ForbiddenError("Insufficient permissions");
  }

  return { userId, role };
}

export function requireRole(allowedRoles: WorkspaceRole[]) {
  return (role: WorkspaceRole): void => {
    if (!allowedRoles.includes(role)) {
      throw new ForbiddenError("Insufficient permissions");
    }
  };
}
