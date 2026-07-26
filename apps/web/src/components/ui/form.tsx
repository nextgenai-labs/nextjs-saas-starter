"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@nextjs-saas/ui";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  onSubmit: () => Promise<{ error?: string; success?: boolean } | undefined>;
  submitLabel?: string;
  submitLoadingLabel?: string;
  disabled?: boolean;
  className?: string;
};

export function Form({
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Save",
  submitLoadingLabel = "Saving...",
  disabled = false,
  className = "",
}: FormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const result = await onSubmit();
      if (result && "error" in result && result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Saved successfully</span>
        </div>
      )}

      <Button type="submit" disabled={disabled || loading} loading={loading}>
        {loading ? submitLoadingLabel : submitLabel}
      </Button>
    </form>
  );

  if (title || description) {
    return (
      <Card>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
}

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
