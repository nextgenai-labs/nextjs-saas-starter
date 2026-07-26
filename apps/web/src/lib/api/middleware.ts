import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { logger } from "@/lib/logger";

type RouteHandler<T = unknown> = (
  req: NextRequest,
  ctx: { params: Promise<Record<string, string | string[]>>; userId: string | undefined },
) => Promise<NextResponse<T>>;

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: "Authentication required", code: "UNAUTHORIZED" } },
        { status: 401 },
      );
    }

    logger.debug("Authenticated request", {
      userId: session.user.id,
      path: req.nextUrl.pathname,
      method: req.method,
    });

    return handler(req, { ...ctx, userId: session.user.id });
  };
}

export function withRole(allowedRoles: string[]): (handler: RouteHandler) => RouteHandler {
  return (handler) => async (req, ctx) => {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: "Authentication required", code: "UNAUTHORIZED" } },
        { status: 401 },
      );
    }

    const userRole = session.user.role;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { success: false, error: { message: "Insufficient permissions", code: "FORBIDDEN" } },
        { status: 403 },
      );
    }

    return handler(req, { ...ctx, userId: session.user.id });
  };
}
