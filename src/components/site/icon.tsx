"use client";

import * as React from "react";
import { getIcon } from "@/lib/icon-map";
import type { LucideProps } from "lucide-react";

/**
 * Renders a lucide icon by its string name (as stored in the database).
 *
 * Usage:
 *   <Icon name={program.icon} className="h-5 w-5" />
 *
 * This is the dynamic counterpart to the static `<program.icon />` pattern
 * used when icons were imported directly. It lets pages render icons that come
 * from database content.
 */
export function Icon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Cmp = getIcon(name);
  return React.createElement(Cmp, props);
}
