"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { SearchResult } from "@/components/ui/search-command";

type SearchContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  results: SearchResult[];
  loading: boolean;
  search: (query: string) => void;
  registerSource: (id: string, source: SearchSource) => void;
};

export type SearchSource = {
  label: string;
  search: (query: string) => SearchResult[] | Promise<SearchResult[]>;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [sources] = useState<Map<string, SearchSource>>(new Map());

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      const allResults: SearchResult[] = [];
      for (const [, source] of sources) {
        try {
          const sourceResults = await source.search(query);
          allResults.push(...sourceResults);
        } catch {
          // Ignore source errors
        }
      }

      setResults(allResults);
      setLoading(false);
    },
    [sources],
  );

  const registerSource = useCallback(
    (id: string, source: SearchSource) => {
      sources.set(id, source);
    },
    [sources],
  );

  return (
    <SearchContext.Provider
      value={{ open, setOpen, toggle, results, loading, search, registerSource }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
