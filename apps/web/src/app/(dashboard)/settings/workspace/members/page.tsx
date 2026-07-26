"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { useWorkspace } from "@/lib/workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@nextjs-saas/ui";

export default function WorkspaceMembersPage() {
  const { currentWorkspace } = useWorkspace();

  if (!currentWorkspace) {
    return (
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Settings", href: "/settings/account" },
            { label: "Workspace", href: "/settings/workspace" },
            { label: "Members" },
          ]}
        />
        <PageHeader title="Members" description="Workspace not found." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Settings", href: "/settings/account" },
          { label: "Workspace", href: "/settings/workspace" },
          { label: "Members" },
        ]}
      />
      <PageHeader title="Members" description="Manage workspace members." />

      <Card>
        <CardHeader>
          <CardTitle>Workspace Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground py-8 text-center text-sm">
            Member management requires backend integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
