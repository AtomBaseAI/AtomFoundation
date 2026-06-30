"use client";

import * as React from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  separator?: boolean;
};

export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  separator = true,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const startedRef = React.useRef(false);
  const [display, setDisplay] = React.useState(`${prefix}0${suffix}`);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const controls = animate(0, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(latest) {
          const formatted = separator
            ? Math.round(latest).toLocaleString("en-IN")
            : latest.toFixed(decimals);
          setDisplay(`${prefix}${formatted}${suffix}`);
        },
      });
    };

    let rafId = 0;
    const check = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (startedRef.current) return;
        const rect = el.getBoundingClientRect();
        // Trigger when the element's top is at or above the viewport bottom,
        // i.e. it has entered (or been scrolled past) the viewport.
        if (rect.top < window.innerHeight - 40) {
          run();
        }
      });
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [value, duration, prefix, suffix, decimals, separator]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
}
