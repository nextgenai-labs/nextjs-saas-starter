import type { ReactNode } from "react";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";
import { TopNav } from "@/components/dashboard/top-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardProviders } from "./providers";

export const dynamic = "force-dynamic";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();

  let initialWorkspaces: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    role: string;
  }[] = [];

  if (session?.user?.id) {
    const memberships = await prisma.member.findMany({
      where: { userId: session.user.id },
      include: { workspace: true },
      orderBy: { joinedAt: "desc" },
    });

    initialWorkspaces = memberships.map((m) => ({
      id: m.workspace.id,
      name: m.workspace.name,
      slug: m.workspace.slug,
      image: m.workspace.image,
      role: m.role,
    }));
  }

  return (
    <DashboardProviders initialWorkspaces={initialWorkspaces}>
      <div className="min-h-screen">
        <TopNav />
        <Sidebar />
        <main className="pt-16 md:pl-60">
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
        </main>
      </div>
    </DashboardProviders>
  );
}
