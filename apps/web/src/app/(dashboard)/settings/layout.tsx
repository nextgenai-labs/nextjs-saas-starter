import type { ReactNode } from "react";
import { SettingsSidebar } from "@/components/dashboard/settings-sidebar";

type SettingsLayoutProps = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-12">
      <div className="shrink-0 md:w-48">
        <SettingsSidebar />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
