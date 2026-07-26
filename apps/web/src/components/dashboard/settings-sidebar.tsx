"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@nextjs-saas/ui";
import { settingsNav, workspaceNav, isActivePath } from "@/lib/navigation/config";

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
          User Settings
        </p>
        <ul className="space-y-1">
          {settingsNav.map((item) => (
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
          Workspace
        </p>
        <ul className="space-y-1">
          {workspaceNav.map((item) => (
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
