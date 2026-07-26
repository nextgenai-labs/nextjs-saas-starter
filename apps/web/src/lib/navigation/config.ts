import {
  LayoutDashboard,
  Settings,
  User,
  Shield,
  Palette,
  Sliders,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const mainNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export const settingsNav: NavItem[] = [
  { title: "Profile", href: "/settings/profile", icon: User },
  { title: "Account", href: "/settings/account", icon: Settings },
  { title: "Appearance", href: "/settings/appearance", icon: Palette },
  { title: "Preferences", href: "/settings/preferences", icon: Sliders },
  { title: "Security", href: "/settings/security", icon: Shield },
];

export const sidebarNav: NavGroup[] = [
  {
    title: "Main",
    items: mainNav,
  },
  {
    title: "Settings",
    items: settingsNav,
  },
];

export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname.startsWith(href);
}
