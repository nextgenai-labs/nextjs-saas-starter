"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resendVerificationAction } from "@/lib/auth/actions";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@nextjs-saas/ui";

type VerifyEmailContentProps = {
  status: "verified" | "invalid-token" | "missing-token";
  email: string;
};

export function VerifyEmailContent({ status, email }: VerifyEmailContentProps) {
  const [state, formAction, pending] = useActionState(resendVerificationAction, null);

  if (status === "verified") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Email verified</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm">
            Your email has been verified successfully.
          </p>
          <Link href="/login" className="text-primary mt-4 inline-block text-sm hover:underline">
            Sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Invalid link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm">
          This verification link is invalid or has expired.
        </p>
        <form action={formAction}>
          <input type="hidden" name="email" value={email} />
          <Button type="submit" variant="outline" loading={pending}>
            Resend verification email
          </Button>
        </form>
        {state?.message ? (
          <p className="text-success text-sm" role="status">
            {state.message}
          </p>
        ) : null}
        {state?.error ? (
          <p className="text-destructive text-sm" role="alert">
            {state.error}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
