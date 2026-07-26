"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@nextjs-saas/ui";
import { settingsNav, isActivePath } from "@/lib/navigation/config";

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-muted/30 flex gap-1 overflow-x-auto rounded-lg border p-1 md:flex-col md:border-0 md:bg-transparent md:p-0">
      {settingsNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:px-2",
            isActivePath(item.href, pathname)
              ? "bg-background text-foreground md:bg-accent shadow-sm md:shadow-none"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
