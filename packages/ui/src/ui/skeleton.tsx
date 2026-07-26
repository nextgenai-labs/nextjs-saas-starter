import { cn } from "../cn";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-md", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
