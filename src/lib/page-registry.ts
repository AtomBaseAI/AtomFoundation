/**
 * Page Registry
 *
 * Static definition of every page/page-group that can be toggled visible/hidden
 * from the CMS "Page Config" panel. The DB `PageConfig` table stores the
 * visibility state; this registry provides the structural metadata (labels,
 * routes, group relationships) that doesn't change.
 *
 * Visibility rules:
 *  - A page is "effectively visible" if its own `visible` flag is true AND
 *    (if it belongs to a group) its parent group's `visible` flag is also true.
 *  - Hidden pages are removed from the navbar, footer, and redirect to home
 *    if accessed directly.
 */

export type PageRegistryEntry = {
  key: string;
  label: string;
  route: string;
  /** Parent group key. If set, this page is only visible when the group is visible. */
  group?: string;
  /** Whether this entry is a group parent (has child pages). */
  isGroupParent?: boolean;
  /** Whether this page can be hidden from the CMS (home is always visible). */
  manageable: boolean;
  /** Sort order for CMS display. */
  order: number;
};

export const pageRegistry: PageRegistryEntry[] = [
  { key: "home", label: "Home", route: "/", manageable: false, order: 0 },
  { key: "about", label: "About", route: "/about", manageable: true, order: 1 },
  { key: "programs", label: "Programs", route: "/programs", manageable: true, order: 2 },
  {
    key: "impact",
    label: "Impact",
    route: "/impact",
    manageable: true,
    isGroupParent: true,
    order: 3,
  },
  { key: "sdgs", label: "SDGs", route: "/sdgs", group: "impact", manageable: true, order: 4 },
  { key: "stories", label: "Success Stories", route: "/stories", group: "impact", manageable: true, order: 5 },
  { key: "gallery", label: "Gallery", route: "/gallery", group: "impact", manageable: true, order: 6 },
  { key: "events", label: "Events", route: "/events", manageable: true, order: 7 },
  { key: "volunteer", label: "Volunteer", route: "/volunteer", manageable: true, order: 8 },
  { key: "partners", label: "Partners", route: "/partners", manageable: true, order: 9 },
  { key: "contact", label: "Contact", route: "/contact", manageable: true, order: 10 },
];

/** Returns the page key for a given route path (ignoring hash/query). */
export function getPageKeyByRoute(pathname: string): string | undefined {
  const clean = pathname.split("#")[0].split("?")[0];
  const entry = pageRegistry.find((p) => p.route === clean);
  return entry?.key;
}

/** Returns the route for a given page key. */
export function getRouteByKey(key: string): string | undefined {
  return pageRegistry.find((p) => p.key === key)?.route;
}

/**
 * Given a page-config visibility map (key → visible), determine whether a page
 * key is effectively visible (page visible AND parent group visible).
 */
export function isPageVisible(
  pageKey: string | undefined,
  visibilityMap: Record<string, boolean>
): boolean {
  if (!pageKey) return true; // no page key = always visible
  const entry = pageRegistry.find((p) => p.key === pageKey);
  if (!entry) return true; // unknown key = visible by default
  if (!entry.manageable) return true; // non-manageable (home) = always visible

  // Check the page's own visibility
  if (visibilityMap[pageKey] === false) return false;

  // Check parent group visibility
  if (entry.group && visibilityMap[entry.group] === false) return false;

  return true;
}

/**
 * Build a visibility map from an array of PageConfig records.
 */
export function buildVisibilityMap(
  configs: Array<{ key: string; visible: boolean }>
): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const c of configs) {
    map[c.key] = c.visible;
  }
  return map;
}
