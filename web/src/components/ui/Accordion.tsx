"use client";

import * as React from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

export function AccordionItem({
  id,
  title,
  children,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(
    isOpen ? undefined : 0
  );

  React.useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <button
        onClick={() => onToggle?.(id)}
        className="w-full flex items-center justify-between py-lg px-md"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--transition-normal)",
            color: "var(--color-text-secondary)",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        id={`accordion-content-${id}`}
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height var(--transition-slow)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="px-md pb-lg text-secondary">{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = "" }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={handleToggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
