export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

const SENSITIVE_FIELDS = new Set([
  "password",
  "passwordHash",
  "secret",
  "token",
  "access_token",
  "refresh_token",
  "authorization",
  "cookie",
]);

export function sanitizeForLogging(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_FIELDS.has(key.toLowerCase())) {
      result[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = sanitizeForLogging(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function serializeUser(user: {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
}): { id: string; name: string | null; email: string; image: string | null; role: string } {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };
}
