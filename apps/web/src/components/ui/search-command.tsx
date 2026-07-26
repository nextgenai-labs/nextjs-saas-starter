"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Search, Command } from "lucide-react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@nextjs-saas/ui";

export type SearchResult = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  onSelect?: () => void;
};

type SearchCommandProps = {
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  results: SearchResult[];
  onSearch: (query: string) => void;
  loading?: boolean;
  emptyMessage?: string;
};

export function SearchCommand({
  open,
  onClose,
  placeholder = "Search...",
  results,
  onSearch,
  loading = false,
  emptyMessage = "No results found",
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        results[selectedIndex].onSelect?.();
        onClose();
      }
    },
    [results, selectedIndex, onClose],
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="top-[15%] translate-y-0 p-0 sm:max-w-lg">
          <div className="flex items-center border-b px-3">
            <Search className="text-muted-foreground mr-2 h-4 w-4 shrink-0" />
            <input
              className="placeholder:text-muted-foreground flex h-12 w-full bg-transparent text-sm outline-none"
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <kbd className="text-muted-foreground/50 bg-muted pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px] font-medium">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-1">
            {loading ? (
              <div className="text-muted-foreground px-2 py-6 text-center text-sm">
                Searching...
              </div>
            ) : results.length === 0 && query ? (
              <div className="text-muted-foreground px-2 py-6 text-center text-sm">
                {emptyMessage}
              </div>
            ) : (
              results.map((result, index) => (
                <button
                  key={result.id}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                    index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                  }`}
                  onClick={() => {
                    result.onSelect?.();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {result.icon && (
                    <span className="text-muted-foreground shrink-0">{result.icon}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{result.label}</div>
                    {result.description && (
                      <div className="text-muted-foreground text-xs">{result.description}</div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
