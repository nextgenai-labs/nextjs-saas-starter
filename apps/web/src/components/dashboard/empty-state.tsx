import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@nextjs-saas/ui";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Icon className="text-muted-foreground/50 mb-4 h-12 w-12" />
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4 max-w-sm text-center text-sm">{description}</p>
        {action ? (
          <button
            onClick={action.onClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {action.label}
          </button>
        ) : null}
      </CardContent>
    </Card>
  );
}
