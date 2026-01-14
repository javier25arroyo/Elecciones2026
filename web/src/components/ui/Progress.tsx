"use client";

import * as React from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  className?: string;
  barClassName?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  color,
  className = "",
  barClassName = "",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-2 flex justify-between">
          {label && <span className="text-sm text-text-secondary">{label}</span>}
          {showValue && <span className="text-sm font-medium text-text-primary">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-cta transition-[width] duration-500 ease-in-out",
            barClassName,
          )}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

// Circular progress (spinner alternative with percentage)
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 6,
  color = "var(--color-primary)",
  className = "",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-in-out"
        />
      </svg>
      <span
        className="absolute text-center font-semibold text-text-primary"
        style={{ fontSize: size * 0.2 }}
      >
        {Math.round(value)}%
      </span>
    </div>
  );
}
