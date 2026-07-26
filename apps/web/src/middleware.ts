import { auth } from "@/lib/auth/auth";
import { logger } from "@/lib/logger";
import { getSecurityHeaders } from "@/lib/security/headers";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password|reset-password|verify-email|auth/error|$).*)",
  ],
};

export default auth((req) => {
  const start = performance.now();
  const { pathname } = req.nextUrl;

  if (!req.auth && !pathname.startsWith("/auth")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    const redirect = Response.redirect(loginUrl);
    const headers = getSecurityHeaders();
    for (const [key, value] of Object.entries(headers)) {
      redirect.headers.set(key, value);
    }
    return redirect;
  }

  const duration = performance.now() - start;
  logger.info("Request processed", {
    path: pathname,
    method: req.method,
    durationMs: Math.round(duration),
    authenticated: !!req.auth,
  });
});
