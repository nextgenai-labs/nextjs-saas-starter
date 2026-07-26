"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@nextjs-saas/ui";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

export default function PreferencesSettingsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Preferences" }]}
      />
      <PageHeader title="Preferences" description="Configure your preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Notification preferences are not yet implemented.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
