"use client";

import * as React from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div
        role="tablist"
        className="flex"
        style={{
          borderBottom: "1px solid var(--color-border)",
          gap: "var(--spacing-xs)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              background: activeTab === tab.id 
                ? "rgba(25, 115, 175, 0.05)" 
                : "transparent",
              border: "none",
              borderBottom: activeTab === tab.id 
                ? "3px solid var(--color-primary)" 
                : "3px solid transparent",
              color: activeTab === tab.id 
                ? "var(--color-primary)" 
                : "var(--color-text-secondary)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--transition-normal)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="animate-fade-in py-lg"
      >
        {activeContent}
      </div>
    </div>
  );
}
