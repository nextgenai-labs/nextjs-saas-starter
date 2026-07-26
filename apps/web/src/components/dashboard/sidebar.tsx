"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@nextjs-saas/ui";
import { sidebarNav, isActivePath } from "@/lib/navigation/config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-r md:block">
      <nav className="flex h-full flex-col gap-6 overflow-y-auto p-4">
        {sidebarNav.map((group) => (
          <div key={group.title}>
            <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold uppercase tracking-wider">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors",
                      isActivePath(item.href, pathname)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge ? (
                      <span className="bg-primary text-primary-foreground ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
