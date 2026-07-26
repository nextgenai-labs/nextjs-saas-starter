"use client";

import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@nextjs-saas/ui";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "Settings", href: "/settings/account" }, { label: "Profile" }]}
      />
      <PageHeader title="Profile" description="Your personal information." />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {user?.image ? <AvatarImage src={user.image} alt={user?.name ?? ""} /> : null}
              <AvatarFallback className="text-lg">{getInitials(user?.name ?? "")}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change avatar
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-muted-foreground mt-1 text-sm">{user?.name ?? "—"}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground mt-1 text-sm">{user?.email ?? "—"}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <p className="text-muted-foreground mt-1 text-sm">{user?.role ?? "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
