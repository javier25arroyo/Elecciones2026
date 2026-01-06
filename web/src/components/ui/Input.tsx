"use client";

import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export function Input({
  label,
  error,
  success,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? `input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const inputClasses = [
    "input",
    error ? "input-error" : "",
    success ? "input-success" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-muted mt-sm" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-muted mt-sm">
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? `textarea-${generatedId}`;
  const errorId = `${textareaId}-error`;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={textareaId} className="label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`input ${error ? "input-error" : ""} ${className}`}
        style={{ minHeight: 120, resize: "vertical" }}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-muted mt-sm" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export function Select({ label, options, error, id, className = "", ...props }: SelectProps) {
  const generatedId = React.useId();
  const selectId = id ?? `select-${generatedId}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={selectId} className="label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`input ${error ? "input-error" : ""} ${className}`}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-muted mt-sm" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
