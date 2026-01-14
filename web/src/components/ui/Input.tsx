"use client";

import * as React from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Base classes for a consistent look and feel
const baseInputClasses =
  "w-full rounded-md border-2 bg-background-secondary px-4 py-2.5 text-base text-text-primary ring-offset-2 ring-offset-background-dark transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-primary " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const labelClasses = "mb-2 block text-sm font-medium text-text-secondary";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, helperText, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const stateClasses = error
      ? "border-error focus:border-error focus:ring-error/50"
      : success
      ? "border-success focus:border-success focus:ring-success/50"
      : "border-border focus:border-primary";

    return (
      <div>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(baseInputClasses, stateClasses, className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        {error && <p id={errorId} className="mt-1.5 text-sm text-error">{error}</p>}
        {helperText && !error && <p id={helperId} className="mt-1.5 text-sm text-text-muted">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? `textarea-${generatedId}`;
    const errorId = `${textareaId}-error`;

    const stateClasses = error
      ? "border-error focus:border-error focus:ring-error/50"
      : "border-border focus:border-primary";

    return (
      <div>
        {label && (
          <label htmlFor={textareaId} className={labelClasses}>
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(baseInputClasses, stateClasses, "min-h-[120px] resize-y", className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {error && <p id={errorId} className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? `select-${generatedId}`;

    const stateClasses = error
      ? "border-error focus:border-error focus:ring-error/50"
      : "border-border focus:border-primary";

    return (
      <div>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(baseInputClasses, stateClasses, className)}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
