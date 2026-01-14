"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

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

  return (
    <div className={cn("w-full", className)}>
      {/* Tab buttons */}
      <div role="tablist" className="relative flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative w-full py-4 px-2 text-center font-semibold transition-colors duration-200 md:w-auto md:px-6",
              activeTab === tab.id
                ? "text-primary"
                : "text-text-secondary hover:text-primary hover:bg-primary/5"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="py-6"
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
