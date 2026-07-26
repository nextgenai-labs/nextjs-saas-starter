"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Button, Input } from "@nextjs-saas/ui";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type Column<T> = {
  id: string;
  header: string;
  accessor: ((item: T) => ReactNode) | keyof T;
  sortable?: boolean;
  className?: string;
  hideable?: boolean;
};

export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  options: { label: string; value: string }[];
};

export type RowAction<T> = {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  disabled?: boolean | ((item: T) => boolean);
  variant?: "default" | "destructive";
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  pageSize?: number;
  searchable?: boolean;
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  sortable?: boolean;
  emptyState?: ReactNode;
  loading?: boolean;
  loadingState?: ReactNode;
  rowActions?: RowAction<T>[];
  bulkActions?: {
    label: string;
    onClick: (items: T[]) => void;
    variant?: "default" | "destructive";
  }[];
  onRowClick?: (item: T) => void;
};

function getValue<T>(item: T, accessor: Column<T>["accessor"]): ReactNode {
  if (typeof accessor === "function") {
    return accessor(item);
  }
  return String(item[accessor] ?? "");
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  pageSize = 20,
  searchable = false,
  searchFields,
  searchPlaceholder = "Search...",
  sortable = true,
  emptyState,
  loading = false,
  loadingState,
  rowActions,
  bulkActions,
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortConfig>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!search || !searchFields) return data;

    const query = search.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      }),
    );
  }, [data, search, searchFields]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = String(getValue(a, sort.key as Column<T>["accessor"]) ?? "");
      const bVal = String(getValue(b, sort.key as Column<T>["accessor"]) ?? "");
      const cmp = aVal.localeCompare(bVal);
      return sort.direction === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    if (!sortable) return;
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map(keyExtractor)));
    }
  };

  if (loading) {
    return (
      loadingState ?? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-muted h-10 animate-pulse rounded" />
          ))}
        </div>
      )
    );
  }

  if (data.length === 0) {
    return (
      emptyState ?? (
        <div className="text-muted-foreground flex items-center justify-center py-12 text-sm">
          No data available
        </div>
      )
    );
  }

  return (
    <div className="space-y-4">
      {(searchable || bulkActions) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative max-w-sm">
              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                className="pl-9"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          )}
          {bulkActions && selected.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">{selected.size} selected</span>
              {bulkActions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant === "destructive" ? "destructive" : "default"}
                  size="sm"
                  onClick={() => {
                    const items = data.filter((item) => selected.has(keyExtractor(item)));
                    action.onClick(items);
                    setSelected(new Set());
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              {(bulkActions || rowActions) && (
                <th className="w-10 px-4 py-3">
                  {bulkActions && (
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selected.size === paged.length && paged.length > 0}
                      onChange={toggleSelectAll}
                    />
                  )}
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`text-muted-foreground px-4 py-3 text-left font-medium ${col.className ?? ""} ${col.sortable !== false && sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => col.sortable !== false && toggleSort(col.id)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable !== false && sortable && (
                      <span className="text-muted-foreground/50">
                        {sort?.key === col.id ? (
                          sort.direction === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {rowActions && <th className="w-20 px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (bulkActions || rowActions ? 1 : 0) + (rowActions ? 1 : 0)
                  }
                  className="text-muted-foreground px-4 py-12 text-center"
                >
                  {search ? "No results found" : "No data available"}
                </td>
              </tr>
            ) : (
              paged.map((item) => {
                const id = keyExtractor(item);
                return (
                  <tr
                    key={id}
                    className={`hover:bg-muted/30 border-b last:border-0 ${onRowClick ? "cursor-pointer" : ""}`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {(bulkActions || rowActions) && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={selected.has(id)}
                          onChange={() => toggleSelect(id)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.id} className={`px-4 py-3 ${col.className ?? ""}`}>
                        {getValue(item, col.accessor)}
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {rowActions.map((action) => {
                            const isDisabled =
                              typeof action.disabled === "function"
                                ? action.disabled(item)
                                : action.disabled;
                            return (
                              <Button
                                key={action.label}
                                variant="ghost"
                                size="sm"
                                disabled={isDisabled}
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  action.onClick(item);
                                }}
                              >
                                {action.icon}
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Page {page} of {totalPages} ({sorted.length} items)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
