"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "../theme/use-theme";

type ToasterProps = {
  position?:
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
};

function Toaster({ position = "bottom-right" }: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      position={position}
      theme={resolvedTheme}
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans)",
        },
      }}
    />
  );
}

export { Toaster };
export type { ToasterProps };
