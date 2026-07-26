import type { ReactNode } from "react";
import { cn } from "../cn";

type GridProps = {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  as?: "div" | "section" | "article" | "main";
};

const colsClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  12: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12",
};

const gapClasses: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export function Grid({ children, className, cols = 1, gap = 4, as: Tag = "div" }: GridProps) {
  return (
    <Tag className={cn("grid", colsClasses[cols], gapClasses[gap], className)}>{children}</Tag>
  );
}
