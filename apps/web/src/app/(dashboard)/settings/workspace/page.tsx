"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@nextjs-saas/ui";
import { useWorkspace } from "@/lib/workspace";

export default function WorkspaceSettingsPage() {
  const { currentWorkspace } = useWorkspace();

  if (!currentWorkspace) {
    return (
      <div className="space-y-8">
        <Breadcrumbs items={[{ label: "Workspace" }]} />
        <PageHeader title="Workspace" description="Workspace settings are not available." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Workspace" }]}
      />
      <PageHeader title="Workspace" description="Manage your workspace settings." />

      <Card>
        <CardHeader>
          <CardTitle>Workspace Details</CardTitle>
          <CardDescription>View your workspace information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <p className="text-muted-foreground mt-1 text-sm">{currentWorkspace.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <p className="text-muted-foreground mt-1 text-sm">{currentWorkspace.slug}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Your Role</label>
            <p className="text-muted-foreground mt-1 text-sm">{currentWorkspace.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
