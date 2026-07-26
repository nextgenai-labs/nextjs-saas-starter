const attemptStore = new Map<string, { count: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
const WINDOW_MS = 60 * 1000;

export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const entry = attemptStore.get(key);

  if (entry && entry.lockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.lockedUntil - now) / 1000),
    };
  }

  if (entry && now - WINDOW_MS > entry.lockedUntil) {
    attemptStore.delete(key);
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - (entry?.count ?? 0) };
}

export function recordAttempt(key: string): void {
  const now = Date.now();
  const entry = attemptStore.get(key);

  if (!entry || now - WINDOW_MS > entry.lockedUntil) {
    attemptStore.set(key, { count: 1, lockedUntil: now });
    return;
  }

  entry.count += 1;

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
}

export function resetAttempts(key: string): void {
  attemptStore.delete(key);
}
