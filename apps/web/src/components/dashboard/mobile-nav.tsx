"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button, cn } from "@nextjs-saas/ui";
import { sidebarNav, isActivePath } from "@/lib/navigation/config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div className="bg-background fixed inset-0 top-16 z-50">
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
                        onClick={() => setOpen(false)}
                        className={cn(
                          "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
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
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
