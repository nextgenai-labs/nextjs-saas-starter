"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Button,
} from "@nextjs-saas/ui";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Security" }]}
      />
      <PageHeader title="Security" description="Manage your password and security preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
          <Input label="Confirm new password" type="password" />
          <Button>Change password</Button>
          <p className="text-muted-foreground text-xs">
            Password change requires backend integration.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Manage your active sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Session management is not yet implemented.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
