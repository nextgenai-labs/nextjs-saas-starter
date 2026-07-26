import { prisma } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/errors";

export const memberRepository = {
  async addMember(workspaceId: string, userId: string, role: string) {
    const existing = await prisma.member.findUnique({
      where: { userId_workspaceId: { userId, workspaceId } },
    });

    if (existing) {
      throw new ConflictError("User is already a member of this workspace");
    }

    return prisma.member.create({
      data: {
        userId,
        workspaceId,
        role: role as "OWNER" | "ADMIN" | "MEMBER",
      },
    });
  },

  async updateRole(memberId: string, role: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) {
      throw new NotFoundError("Member", memberId);
    }

    return prisma.member.update({
      where: { id: memberId },
      data: { role: role as "OWNER" | "ADMIN" | "MEMBER" },
    });
  },

  async removeMember(memberId: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) {
      throw new NotFoundError("Member", memberId);
    }
    return prisma.member.delete({ where: { id: memberId } });
  },

  async removeMemberByUser(workspaceId: string, userId: string) {
    const member = await prisma.member.findUnique({
      where: { userId_workspaceId: { userId, workspaceId } },
    });
    if (!member) {
      throw new NotFoundError("Member");
    }
    return prisma.member.delete({ where: { id: member.id } });
  },

  async countOwners(workspaceId: string) {
    return prisma.member.count({
      where: { workspaceId, role: "OWNER" },
    });
  },
};
