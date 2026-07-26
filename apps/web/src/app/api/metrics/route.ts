import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [userCount, workspaceCount, sessionCount] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.workspace.count(),
      prisma.session.count(),
    ]);

    const metrics = {
      application: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
      },
      database: {
        users: userCount,
        workspaces: workspaceCount,
        sessions: sessionCount,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(metrics);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to collect metrics", timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
