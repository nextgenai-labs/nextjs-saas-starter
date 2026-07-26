import Link from "next/link";
import { Button } from "@nextjs-saas/ui";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Next.js SaaS Starter</h1>
      <p className="text-muted-foreground mt-4 max-w-md">
        A production-ready foundation for your next SaaS product.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Create account</Link>
        </Button>
      </div>
    </div>
  );
}
