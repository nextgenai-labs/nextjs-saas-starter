"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  ThemeToggle,
} from "@nextjs-saas/ui";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Appearance" }]}
      />
      <PageHeader title="Appearance" description="Customize how the dashboard looks." />

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Switch between light, dark, and system theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  );
}
