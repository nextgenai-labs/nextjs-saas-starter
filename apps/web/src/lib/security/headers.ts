import type { NextResponse } from "next/server";

type SecurityHeaders = Record<string, string>;

export function getSecurityHeaders(): SecurityHeaders {
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-eval' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: avatar.githubusercontent.com *.googleusercontent.com`,
    `font-src 'self'`,
    `connect-src 'self'${isProduction ? "" : " ws://localhost:*"} ${baseUrl}`,
    `frame-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ];

  return {
    "X-DNS-Prefetch-Control": "on",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "0",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    "Content-Security-Policy": cspDirectives.join("; "),
  };
}

export function applySecurityHeaders(response: NextResponse): void {
  const headers = getSecurityHeaders();
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
}
