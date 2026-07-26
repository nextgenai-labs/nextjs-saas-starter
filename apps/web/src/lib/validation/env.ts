import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_URL: z.string().url("AUTH_URL must be a valid URL").optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).optional().default("info"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  REDIS_URL: z.string().optional(),
  DATABASE_URL_READ_REPLICA: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (!_env) {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      const missing = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("\n  ");

      throw new Error(
        `Environment validation failed:\n  ${missing}\n\n` +
          "Check your .env.local file and ensure all required variables are set.",
      );
    }

    _env = result.data;
  }

  return _env;
}

export function requireEnv(key: keyof Env): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return val;
}

export { envSchema };
export type { Env };
