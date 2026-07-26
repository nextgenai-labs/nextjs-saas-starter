import { prisma } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/errors";
import type { WorkspaceInfo, MemberInfo } from "@/lib/types/workspace";

export const workspaceRepository = {
  async findById(id: string) {
    return prisma.workspace.findUnique({ where: { id } });
  },

  async findBySlug(slug: string) {
    return prisma.workspace.findUnique({ where: { slug } });
  },

  async findUserWorkspaces(userId: string): Promise<WorkspaceInfo[]> {
    const memberships = await prisma.member.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { joinedAt: "desc" },
    });

    return memberships.map((m) => ({
      id: m.workspace.id,
      name: m.workspace.name,
      slug: m.workspace.slug,
      image: m.workspace.image,
      role: m.role as WorkspaceInfo["role"],
    }));
  },

  async create(data: { name: string; slug: string; image?: string }) {
    const existing = await prisma.workspace.findUnique({ where: { slug: data.slug } });
    if (existing) {
      throw new ConflictError("A workspace with this slug already exists");
    }

    return prisma.workspace.create({ data });
  },

  async update(id: string, data: { name?: string; slug?: string; image?: string | null }) {
    const workspace = await prisma.workspace.findUnique({ where: { id } });
    if (!workspace) {
      throw new NotFoundError("Workspace", id);
    }

    if (data.slug && data.slug !== workspace.slug) {
      const existing = await prisma.workspace.findUnique({ where: { slug: data.slug } });
      if (existing) {
        throw new ConflictError("A workspace with this slug already exists");
      }
    }

    return prisma.workspace.update({ where: { id }, data });
  },

  async delete(id: string) {
    const workspace = await prisma.workspace.findUnique({ where: { id } });
    if (!workspace) {
      throw new NotFoundError("Workspace", id);
    }
    return prisma.workspace.delete({ where: { id } });
  },

  async getMembers(workspaceId: string): Promise<MemberInfo[]> {
    const members = await prisma.member.findMany({
      where: { workspaceId },
      include: { user: true },
      orderBy: { joinedAt: "asc" },
    });

    return members.map((m) => ({
      id: m.id,
      userId: m.userId,
      name: m.user.name,
      email: m.user.email,
      image: m.user.image,
      role: m.role as MemberInfo["role"],
      joinedAt: m.joinedAt,
    }));
  },

  async getMember(workspaceId: string, userId: string) {
    return prisma.member.findUnique({
      where: { userId_workspaceId: { userId, workspaceId } },
    });
  },
};
