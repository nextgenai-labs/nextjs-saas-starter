import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          type={type}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring aria-[invalid=true]:border-destructive flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className,
          )}
          ref={ref}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-destructive text-sm" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
