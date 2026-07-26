"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPasswordAction } from "@/lib/auth/actions";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@nextjs-saas/ui";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction, pending] = useActionState(resetPasswordAction, null);

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Invalid link</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm">
            This password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="text-primary mt-4 inline-block text-sm hover:underline"
          >
            Request a new reset link
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Set new password</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          <Input
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter new password"
          />

          {state?.error ? (
            <p className="text-destructive text-sm" role="alert">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" loading={pending}>
            Reset password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
