"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@nextjs-saas/ui";
import { useWorkspace } from "@/lib/workspace";

export default function WorkspaceInvitationsPage() {
  const { currentWorkspace } = useWorkspace();

  if (!currentWorkspace) {
    return (
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Settings", href: "/settings/account" },
            { label: "Workspace", href: "/settings/workspace" },
            { label: "Invitations" },
          ]}
        />
        <PageHeader title="Invitations" description="Workspace not found." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Settings", href: "/settings/account" },
          { label: "Workspace", href: "/settings/workspace" },
          { label: "Invitations" },
        ]}
      />
      <PageHeader title="Invitations" description="Manage pending invitations." />

      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground py-8 text-center text-sm">
            Invitations require backend integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
