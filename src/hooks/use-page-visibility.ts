"use client";

import { useMemo } from "react";
import { useContent, type ContentData } from "@/hooks/use-content";
import { isPageVisible, buildVisibilityMap } from "@/lib/page-registry";
import type { NavItem, NavChild } from "@/lib/nav";

/**
 * Fetches the page-config from the DB and provides helpers to filter
 * navbar / footer items by visibility. Shared by SiteNavbar, SiteFooter,
 * and the PageVisibilityGuard.
 */
export function usePageVisibility() {
  const { data } = useContent<Pick<ContentData, "page-config">>(["page-config"]);
  const pageConfig = data?.["page-config"];

  const visibilityMap = useMemo(
    () => buildVisibilityMap(pageConfig ?? []),
    [pageConfig]
  );

  /** True if the page is effectively visible (own flag + parent group). */
  const isVisible = (pageKey?: string) => isPageVisible(pageKey, visibilityMap);

  /** Filter navbar items: hide items whose pageKey is hidden, and filter children. */
  const filterNav = (items: NavItem[]): NavItem[] =>
    items
      .filter((item) => isVisible(item.pageKey))
      .map((item) => ({
        ...item,
        children: item.children?.filter((child: NavChild) =>
          isVisible(child.pageKey)
        ),
      }))
      // Hide dropdown if all children were filtered out
      .filter((item) => !item.children || item.children.length > 0);

  return { isVisible, filterNav, visibilityMap };
}
