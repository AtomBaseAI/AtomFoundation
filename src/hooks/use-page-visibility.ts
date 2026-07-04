"use client";

import { useMemo } from "react";
import { useContent, type ContentData } from "@/hooks/use-content";
import { isPageVisible, buildVisibilityMap } from "@/lib/page-registry";
import type { NavItem, NavChild } from "@/lib/nav";

/**
 * Fetches the page-config from the DB and provides helpers to filter
 * navbar / footer items by visibility, and check form visibility.
 * Shared by SiteNavbar, SiteFooter, PageVisibilityGuard, and individual
 * page form sections.
 */
export function usePageVisibility() {
  const { data } = useContent<Pick<ContentData, "page-config">>(["page-config"]);
  const pageConfig = data?.["page-config"];

  const visibilityMap = useMemo(
    () => buildVisibilityMap(pageConfig ?? []),
    [pageConfig]
  );

  /** Map of pageKey → formsVisible flag (defaults to true if not found). */
  const formsMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const c of pageConfig ?? []) {
      map[c.key] = c.formsVisible;
    }
    return map;
  }, [pageConfig]);

  /** True if the page is effectively visible (own flag + parent group). */
  const isVisible = (pageKey?: string) => isPageVisible(pageKey, visibilityMap);

  /** True if forms on the given page should be shown. Defaults to true. */
  const isFormVisible = (pageKey?: string) => {
    if (!pageKey) return true;
    return formsMap[pageKey] !== false;
  };

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

  return { isVisible, isFormVisible, filterNav, visibilityMap };
}
