"use client";

import * as React from "react";

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  color,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between mb-sm">
          {label && <span className="text-muted">{label}</span>}
          {showValue && <span className="text-muted">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div 
        className="progress" 
        role="progressbar" 
        aria-valuenow={value} 
        aria-valuemin={0} 
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: color || undefined,
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
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
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
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span 
        className="absolute text-center font-semibold" 
        style={{ fontSize: size * 0.2, color: "var(--color-text-primary)" }}
      >
        {Math.round(value)}%
      </span>
    </div>
  );
}
