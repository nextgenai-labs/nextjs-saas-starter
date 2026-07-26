import { prisma } from "@/lib/db";
import { NotFoundError } from "@/lib/errors";
import { randomBytes } from "node:crypto";

export const invitationRepository = {
  async create(data: { email: string; role: string; invitedById: string; workspaceId: string }) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return prisma.invitation.create({
      data: {
        email: data.email.toLowerCase(),
        role: data.role as "OWNER" | "ADMIN" | "MEMBER",
        token,
        expiresAt,
        invitedById: data.invitedById,
        workspaceId: data.workspaceId,
      },
    });
  },

  async findByToken(token: string) {
    return prisma.invitation.findUnique({ where: { token } });
  },

  async findPendingByWorkspace(workspaceId: string) {
    return prisma.invitation.findMany({
      where: {
        workspaceId,
        status: "PENDING",
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findPendingByEmail(email: string) {
    return prisma.invitation.findMany({
      where: {
        email: email.toLowerCase(),
        status: "PENDING",
        expiresAt: { gt: new Date() },
      },
      include: { workspace: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async accept(id: string) {
    const invitation = await prisma.invitation.findUnique({ where: { id } });
    if (!invitation) {
      throw new NotFoundError("Invitation", id);
    }

    return prisma.invitation.update({
      where: { id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });
  },

  async cancel(id: string) {
    const invitation = await prisma.invitation.findUnique({ where: { id } });
    if (!invitation) {
      throw new NotFoundError("Invitation", id);
    }

    return prisma.invitation.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
  },

  async expireOld() {
    return prisma.invitation.updateMany({
      where: {
        status: "PENDING",
        expiresAt: { lt: new Date() },
      },
      data: { status: "EXPIRED" },
    });
  },
};
