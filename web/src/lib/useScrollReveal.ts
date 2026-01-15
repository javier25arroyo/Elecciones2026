"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Map to store shared observers and their subscriber counts
// Key is a serialization of the options
const observers = new Map<
  string,
  { observer: IntersectionObserver; count: number }
>();

function getObserverKey(options: Required<ScrollRevealOptions>): string {
  return `${options.threshold}|${options.rootMargin}|${options.triggerOnce}`;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  
  // Normalize options with defaults to ensure consistent keys
  const threshold = options.threshold ?? 0.1;
  const rootMargin = options.rootMargin ?? "0px 0px -100px 0px";
  const triggerOnce = options.triggerOnce ?? true;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      element.classList.add("is-visible");
      return;
    }

    const normalizedOptions = { threshold, rootMargin, triggerOnce };
    const key = getObserverKey(normalizedOptions);
    
    // Get or create observer
    if (!observers.has(key)) {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (triggerOnce) {
              const obsData = observers.get(key);
              if (obsData) {
                  obsData.observer.unobserve(entry.target);
                  // Note: We don't decrement count here as the component is still mounted.
                  // The cleanup in the return of useEffect handles the logical detachment.
              }
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove("is-visible");
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold,
        rootMargin,
      });
      observers.set(key, { observer, count: 0 });
    }

    const observerData = observers.get(key)!;
    observerData.observer.observe(element);
    observerData.count++;

    return () => {
      const obsData = observers.get(key);
      if (obsData) {
        obsData.observer.unobserve(element);
        obsData.count--;
        
        // Clean up observer if no one is using it anymore
        if (obsData.count === 0) {
          obsData.observer.disconnect();
          observers.delete(key);
        }
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
}
