"use client";

import { useSession } from "next-auth/react";
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

export default function AccountSettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Account" }]}
      />
      <PageHeader title="Account Settings" description="Manage your account details." />

      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Update your email address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Email" type="email" defaultValue={session?.user?.email ?? ""} disabled />
          <p className="text-muted-foreground text-xs">Email change is not yet implemented.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            Delete account
          </Button>
          <p className="text-muted-foreground mt-2 text-xs">
            Account deletion is not yet implemented.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
