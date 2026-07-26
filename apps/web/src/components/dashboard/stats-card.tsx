import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@nextjs-saas/ui";

type StatsCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
};

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          {trend ? (
            <span
              className={`text-xs font-medium ${
                trend.positive ? "text-emerald-500" : "text-destructive"
              }`}
            >
              {trend.positive ? "+" : "-"}
              {trend.value}
            </span>
          ) : null}
        </div>
        {description ? <p className="text-muted-foreground mt-1 text-xs">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
