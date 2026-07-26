"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/auth/actions";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@nextjs-saas/ui";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Input
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Create a password"
          />

          {state?.error ? (
            <p className="text-destructive text-sm" role="alert">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" loading={pending}>
            Create account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" asChild>
            <Link href="/auth/signin/google">Google</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/signin/github">GitHub</Link>
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
