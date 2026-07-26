"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@nextjs-saas/ui";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Reset password</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-center text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form action={formAction} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
          />

          {state?.error ? (
            <p className="text-destructive text-sm" role="alert">
              {state.error}
            </p>
          ) : null}

          {state?.message ? (
            <p className="text-success text-sm" role="status">
              {state.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" loading={pending}>
            Send reset link
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
