"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@nextjs-saas/ui";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";
import { WorkspaceSelector } from "./workspace-selector";
import { useSearch } from "@/lib/search";

export function TopNav() {
  const { data: session } = useSession();
  const { toggle } = useSearch();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-40 h-16 border-b backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">SaaS</span>
          </Link>
          <div className="hidden md:block">
            <WorkspaceSelector />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu
            user={{
              name: session?.user?.name ?? "",
              email: session?.user?.email ?? "",
              image: session?.user?.image ?? undefined,
            }}
          />
        </div>
      </div>
    </header>
  );
}
