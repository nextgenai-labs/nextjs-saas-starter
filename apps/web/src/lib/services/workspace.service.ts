import { workspaceRepository } from "@/lib/repositories/workspace.repository";
import { memberRepository } from "@/lib/repositories/member.repository";
import { invitationRepository } from "@/lib/repositories/invitation.repository";
import { NotFoundError, ForbiddenError, ConflictError } from "@/lib/errors";
import { prisma } from "@/lib/db";
import type { WorkspaceInfo, MemberInfo, InvitationInfo } from "@/lib/types/workspace";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 63);
}

export const workspaceService = {
  async getWorkspace(id: string) {
    const workspace = await workspaceRepository.findById(id);
    if (!workspace) {
      throw new NotFoundError("Workspace", id);
    }
    return workspace;
  },

  async getUserWorkspaces(userId: string): Promise<WorkspaceInfo[]> {
    return workspaceRepository.findUserWorkspaces(userId);
  },

  async createWorkspace(
    userId: string,
    data: { name: string; slug?: string },
  ): Promise<WorkspaceInfo> {
    const slug = data.slug ?? slugify(data.name);

    const existing = await workspaceRepository.findBySlug(slug);
    if (existing) {
      throw new ConflictError("A workspace with this name already exists");
    }

    const workspace = await prisma.$transaction(async () => {
      const ws = await workspaceRepository.create({ name: data.name, slug });

      await memberRepository.addMember(ws.id, userId, "OWNER");

      return ws;
    });

    return {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      image: workspace.image,
      role: "OWNER",
    };
  },

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    data: { name?: string; slug?: string },
  ) {
    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    const role = member.role as WorkspaceInfo["role"];
    if (role !== "OWNER" && role !== "ADMIN") {
      throw new ForbiddenError("Only owners and admins can update workspace settings");
    }

    return workspaceRepository.update(workspaceId, data);
  },

  async deleteWorkspace(workspaceId: string, userId: string) {
    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    if (member.role !== "OWNER") {
      throw new ForbiddenError("Only owners can delete a workspace");
    }

    return workspaceRepository.delete(workspaceId);
  },

  async getMembers(workspaceId: string, userId: string): Promise<MemberInfo[]> {
    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    return workspaceRepository.getMembers(workspaceId);
  },

  async inviteMember(
    workspaceId: string,
    invitedByUserId: string,
    data: { email: string; role: string },
  ) {
    const inviter = await workspaceRepository.getMember(workspaceId, invitedByUserId);
    if (!inviter) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    const inviterRole = inviter.role as WorkspaceInfo["role"];
    if (inviterRole !== "OWNER" && inviterRole !== "ADMIN") {
      throw new ForbiddenError("Only owners and admins can invite members");
    }

    const normalizedEmail = data.email.toLowerCase();

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      const alreadyMember = await workspaceRepository.getMember(workspaceId, existingUser.id);
      if (alreadyMember) {
        throw new ConflictError("User is already a member of this workspace");
      }
    }

    const invitation = await invitationRepository.create({
      email: normalizedEmail,
      role: data.role,
      invitedById: invitedByUserId,
      workspaceId,
    });

    return invitation;
  },

  async removeMember(workspaceId: string, requesterId: string, memberId: string) {
    const requester = await workspaceRepository.getMember(workspaceId, requesterId);
    if (!requester) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    const requesterRole = requester.role as WorkspaceInfo["role"];
    if (requesterRole !== "OWNER" && requesterRole !== "ADMIN") {
      throw new ForbiddenError("Only owners and admins can remove members");
    }

    const targetMember = await prisma.member.findUnique({ where: { id: memberId } });
    if (!targetMember) {
      throw new NotFoundError("Member", memberId);
    }

    if (targetMember.role === "OWNER" && requesterRole !== "OWNER") {
      throw new ForbiddenError("Only an owner can remove another owner");
    }

    const ownerCount = await memberRepository.countOwners(workspaceId);
    if (targetMember.role === "OWNER" && ownerCount <= 1) {
      throw new ConflictError("Cannot remove the last owner of the workspace");
    }

    return memberRepository.removeMember(memberId);
  },

  async updateMemberRole(
    workspaceId: string,
    requesterId: string,
    memberId: string,
    newRole: string,
  ) {
    const requester = await workspaceRepository.getMember(workspaceId, requesterId);
    if (!requester) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    if (requester.role !== "OWNER") {
      throw new ForbiddenError("Only owners can change member roles");
    }

    const targetMember = await prisma.member.findUnique({ where: { id: memberId } });
    if (!targetMember) {
      throw new NotFoundError("Member", memberId);
    }

    const ownerCount = await memberRepository.countOwners(workspaceId);
    if (targetMember.role === "OWNER" && newRole !== "OWNER" && ownerCount <= 1) {
      throw new ConflictError("Cannot demote the last owner of the workspace");
    }

    return memberRepository.updateRole(memberId, newRole);
  },

  async getPendingInvitations(workspaceId: string, userId: string): Promise<InvitationInfo[]> {
    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    const invitations = await invitationRepository.findPendingByWorkspace(workspaceId);
    return invitations.map((inv) => ({
      id: inv.id,
      email: inv.email,
      role: inv.role as InvitationInfo["role"],
      status: inv.status as InvitationInfo["status"],
      expiresAt: inv.expiresAt,
      createdAt: inv.createdAt,
    }));
  },

  async cancelInvitation(workspaceId: string, userId: string, invitationId: string) {
    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    const memberRole = member.role as WorkspaceInfo["role"];
    if (memberRole !== "OWNER" && memberRole !== "ADMIN") {
      throw new ForbiddenError("Only owners and admins can cancel invitations");
    }

    return invitationRepository.cancel(invitationId);
  },

  async acceptInvitation(token: string, userId: string) {
    const invitation = await invitationRepository.findByToken(token);
    if (!invitation) {
      throw new NotFoundError("Invitation");
    }

    if (invitation.status !== "PENDING") {
      throw new ConflictError("This invitation is no longer valid");
    }

    if (invitation.expiresAt < new Date()) {
      await invitationRepository.expireOld();
      throw new ConflictError("This invitation has expired");
    }

    if (invitation.email.toLowerCase() !== (await getEmailForUser(userId))) {
      throw new ForbiddenError("This invitation was sent to a different email address");
    }

    await prisma.$transaction(async () => {
      await memberRepository.addMember(invitation.workspaceId, userId, invitation.role);
      await invitationRepository.accept(invitation.id);
    });

    return invitation.workspaceId;
  },
};

async function getEmailForUser(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError("User", userId);
  return user.email;
}
