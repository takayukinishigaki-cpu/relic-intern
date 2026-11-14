import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ id, label, required, error, hint, children }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-[15px] font-bold">
        {label}
        {required ? (
          <span className="rounded bg-accent px-1.5 py-0.5 text-[11px] leading-none text-accent-foreground">必須</span>
        ) : (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] leading-none text-muted-foreground">任意</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
