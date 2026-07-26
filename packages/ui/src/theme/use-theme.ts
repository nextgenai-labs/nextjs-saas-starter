import { useContext } from "react";
import { ThemeContext, type ThemeProviderContext } from "./provider";

export function useTheme(): ThemeProviderContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
