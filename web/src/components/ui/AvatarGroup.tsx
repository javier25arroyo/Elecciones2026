"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
  items: {
    name: string;
    image?: string;
    fallback?: string;
  }[];
  limit?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarGroup({ items, limit = 4, size = "md", className }: AvatarGroupProps) {
  const displayItems = items.slice(0, limit);
  const remaining = items.length - limit;

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {displayItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800 text-slate-300 ring-2 ring-transparent transition-transform hover:z-10 hover:scale-110",
            sizeClasses[size]
          )}
          title={item.name}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="font-semibold uppercase">
              {item.fallback || item.name.substring(0, 2)}
            </span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800 text-white ring-2 ring-transparent hover:z-10",
            sizeClasses[size]
          )}
        >
          <span className="font-semibold">+{remaining}</span>
        </div>
      )}
    </div>
  );
}
