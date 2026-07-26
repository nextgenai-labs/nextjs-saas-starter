export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export type WorkspaceInfo = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  role: WorkspaceRole;
};

export type MemberInfo = {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  image: string | null;
  role: WorkspaceRole;
  joinedAt: Date;
};

export type InvitationInfo = {
  id: string;
  email: string;
  role: WorkspaceRole;
  status: "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELLED";
  expiresAt: Date;
  createdAt: Date;
};
