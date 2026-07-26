"use server";

import { redirect } from "next/navigation";
import { hashPassword, validatePasswordStrength } from "./password";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./validation";
import { checkRateLimit, recordAttempt, resetAttempts } from "./rate-limit";
import { signIn } from "./auth";
import { getDb } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";
import { randomBytes } from "node:crypto";

async function getIp(): Promise<string> {
  const { headers } = await import("next/headers");
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

export async function loginAction(_prev: unknown, formData: FormData) {
  const ip = await getIp();
  const rateKey = `login:${ip}`;
  const { allowed, retryAfter } = checkRateLimit(rateKey);

  if (!allowed) {
    return {
      error: `Too many attempts. Please try again in ${retryAfter} seconds.`,
      success: false,
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { error: firstError?.message ?? "Invalid input", success: false };
  }

  const result = await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  if (result?.error) {
    recordAttempt(rateKey);
    return { error: "Invalid email or password", success: false };
  }

  resetAttempts(rateKey);
  redirect("/dashboard");
}

export async function registerAction(_prev: unknown, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { error: firstError?.message ?? "Invalid input", success: false };
  }

  const { name, email, password } = parsed.data;

  const strength = validatePasswordStrength(password);
  if (!strength.valid) {
    return { error: strength.errors[0] ?? "Password does not meet requirements", success: false };
  }

  const db = getDb();
  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email.toLowerCase()),
  });

  if (existing) {
    return { error: "An account with this email already exists", success: false };
  }

  const hashedPassword = await hashPassword(password);

  await db.insert(users).values({
    id: randomBytes(16).toString("hex"),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  const verifyToken = randomBytes(32).toString("hex");

  await db.insert(verificationTokens).values({
    identifier: email.toLowerCase(),
    token: verifyToken,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await sendVerificationEmail(email.toLowerCase(), verifyToken);

  redirect("/login?verified=registered");
}

export async function forgotPasswordAction(_prev: unknown, formData: FormData) {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { error: firstError?.message ?? "Invalid input", success: false };
  }

  const email = parsed.data.email.toLowerCase();

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (user) {
    const token = randomBytes(32).toString("hex");

    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    await sendPasswordResetEmail(email, token);
  }

  return {
    success: true,
    message: "If an account exists with that email, we have sent a password reset link.",
  };
}

export async function resetPasswordAction(_prev: unknown, formData: FormData) {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { error: firstError?.message ?? "Invalid input", success: false };
  }

  const { token, password } = parsed.data;

  const strength = validatePasswordStrength(password);
  if (!strength.valid) {
    return { error: strength.errors[0] ?? "Password does not meet requirements", success: false };
  }

  const db = getDb();
  const storedToken = await db.query.verificationTokens.findFirst({
    where: (vt, { eq }) => eq(vt.token, token),
  });

  if (!storedToken || storedToken.expires < new Date()) {
    return { error: "Invalid or expired reset token", success: false };
  }

  const hashedPassword = await hashPassword(password);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, storedToken.identifier));

  await db.delete(verificationTokens).where(eq(verificationTokens.token, token));

  redirect("/login?reseted=success");
}

export async function resendVerificationAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email")?.toString();

  if (!email) {
    return { error: "Email is required", success: false };
  }

  const token = randomBytes(32).toString("hex");

  const db = getDb();
  await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email.toLowerCase()));

  await db.insert(verificationTokens).values({
    identifier: email.toLowerCase(),
    token,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await sendVerificationEmail(email.toLowerCase(), token);

  return { success: true, message: "Verification email sent." };
}
