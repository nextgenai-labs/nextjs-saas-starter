import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@nextjs-saas/ui";
import { Users, Activity, Shield, UserCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userCount = await prisma.user.count({
    where: { deletedAt: null },
  });

  const recentUsers = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here is an overview of your platform."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={userCount.toString()}
          icon={Users}
          description="Active platform users"
        />
        <StatsCard title="Active Today" value="—" icon={Activity} description="Coming soon" />
        <StatsCard title="Admins" value="—" icon={Shield} description="Coming soon" />
        <StatsCard title="Verified Users" value="—" icon={UserCheck} description="Coming soon" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          {recentUsers.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">No users yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="text-muted-foreground pb-3 font-medium">Name</th>
                    <th className="text-muted-foreground pb-3 font-medium">Email</th>
                    <th className="text-muted-foreground pb-3 font-medium">Role</th>
                    <th className="text-muted-foreground pb-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-3">{user.name ?? "—"}</td>
                      <td className="text-muted-foreground py-3">{user.email}</td>
                      <td className="py-3">
                        <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="text-muted-foreground py-3">
                        {user.createdAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
