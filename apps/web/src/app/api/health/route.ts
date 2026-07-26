import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getEnv } from "@/lib/validation/env";

type DbCheck = { status: string; error?: string };

export async function GET() {
  const start = performance.now();

  const dbCheck: DbCheck = await checkDatabase();
  const duration = performance.now() - start;

  const checks = {
    status: dbCheck.status === "ok" ? "ok" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: { ...dbCheck, latencyMs: Math.round(duration) },
    },
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0",
    environment: getEnv().NODE_ENV,
  };

  const isHealthy = checks.status === "ok";

  if (!isHealthy) {
    logger.error("Health check failed", checks);
    return NextResponse.json(checks, { status: 503 });
  }

  return NextResponse.json(checks);
}

export async function POST() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}

async function checkDatabase(): Promise<DbCheck> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "ok" };
  } catch (error) {
    logger.error("Database health check failed", { error: String(error) });
    return { status: "error", error: "Database connection failed" };
  }
}
