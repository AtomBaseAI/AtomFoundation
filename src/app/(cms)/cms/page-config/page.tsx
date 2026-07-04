"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Atom,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  RefreshCw,
  Globe,
  Layers,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  AlertCircle,
  LayoutGrid,
  Info,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { pageRegistry, type PageRegistryEntry } from "@/lib/page-registry";

type ConfigEntry = {
  key: string;
  label: string;
  route: string;
  group: string | null;
  visible: boolean;
};

export default function PageConfigPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<{ email: string } | null>(null);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [configs, setConfigs] = React.useState<ConfigEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updating, setUpdating] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");

  // Auth check
  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/cms/login");
          return;
        }
        setUser(data.user);
        setAuthChecked(true);
      })
      .catch(() => router.replace("/cms/login"));
  }, [router]);

  const fetchConfigs = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms/page-config");
      if (res.status === 401) {
        router.replace("/cms/login");
        return;
      }
      const json = await res.json();
      setConfigs(json.data ?? []);
    } catch {
      toast.error("Failed to load page config");
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    if (authChecked) fetchConfigs();
  }, [authChecked, fetchConfigs]);

  const handleToggle = async (key: string, visible: boolean) => {
    setUpdating(key);
    const prev = configs;
    // Optimistic update
    setConfigs((cs) =>
      cs.map((c) => {
        if (c.key === key) return { ...c, visible };
        if (visible === false) {
          const entry = pageRegistry.find((p) => p.key === key);
          if (entry?.isGroupParent && c.group === key) {
            return { ...c, visible: false };
          }
        }
        return c;
      })
    );

    try {
      const res = await fetch("/api/cms/page-config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, visible }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }
      const label = pageRegistry.find((p) => p.key === key)?.label ?? key;
      toast.success(`${visible ? "Showing" : "Hiding"} "${label}"`, {
        description: visible
          ? "Page is now visible on the site."
          : "Page and all its references are now hidden.",
      });
    } catch (err) {
      setConfigs(prev);
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setUpdating(null);
    }
  };

  const handleBulkToggle = async (keys: string[], visible: boolean) => {
    setUpdating("bulk");
    const prev = configs;
    setConfigs((cs) =>
      cs.map((c) => (keys.includes(c.key) ? { ...c, visible } : c))
    );
    try {
      await Promise.all(
        keys.map((key) =>
          fetch("/api/cms/page-config", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, visible }),
          })
        )
      );
      toast.success(`${visible ? "Showing" : "Hiding"} ${keys.length} pages`);
    } catch {
      setConfigs(prev);
      toast.error("Bulk update failed");
    } finally {
      setUpdating(null);
    }
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  // Build display structure
  const topLevel = pageRegistry.filter((p) => !p.group && p.manageable);
  const getChildren = (parentKey: string) =>
    pageRegistry.filter((p) => p.group === parentKey);
  const getConfig = (key: string): ConfigEntry | undefined =>
    configs.find((c) => c.key === key);

  // Stats
  const totalManageable = topLevel.length;
  const visibleCount = topLevel.filter(
    (p) => getConfig(p.key)?.visible ?? true
  ).length;
  const hiddenCount = totalManageable - visibleCount;
  const groupCount = topLevel.filter((p) => getChildren(p.key).length > 0).length;

  // Filter by search
  const searchLower = search.toLowerCase().trim();
  const matchesSearch = (entry: PageRegistryEntry) =>
    !searchLower ||
    entry.label.toLowerCase().includes(searchLower) ||
    entry.route.toLowerCase().includes(searchLower);

  const filteredTopLevel = topLevel.filter(
    (p) =>
      matchesSearch(p) ||
      getChildren(p.key).some(matchesSearch)
  );

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-zinc-950 text-zinc-300">
        <div className="flex h-16 items-center gap-2.5 border-b border-zinc-800 px-5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <Atom className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Atom Arc CMS</p>
            <p className="text-[10px] text-zinc-500">Page Configuration</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <Link
            href="/cms"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="mt-4 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Current Page
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
              <LayoutGrid className="h-3.5 w-3.5" /> Page Config
            </p>
          </div>
        </nav>
        <div className="border-t border-zinc-800 p-3">
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-xs font-bold text-white">
              {(user?.email ?? "A")[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-xs font-medium text-white">{user?.email}</p>
              <p className="text-[10px] text-zinc-500">Administrator</p>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-poppins text-lg font-bold text-zinc-900">Page Config</h1>
              <p className="text-xs text-zinc-500">
                Toggle visibility of pages and page groups across your site
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkToggle(topLevel.map((p) => p.key), true)}
              disabled={loading || updating === "bulk"}
              className="text-green-600 hover:bg-green-50 hover:text-green-700"
            >
              <EyeIcon className="mr-1.5 h-4 w-4" /> Show All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchConfigs}
              disabled={loading}
            >
              <RefreshCw className={`mr-1.5 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Globe className="h-5 w-5" />}
              label="Total Pages"
              value={totalManageable}
              accent="blue"
            />
            <StatCard
              icon={<EyeIcon className="h-5 w-5" />}
              label="Visible"
              value={visibleCount}
              accent="green"
            />
            <StatCard
              icon={<EyeOffIcon className="h-5 w-5" />}
              label="Hidden"
              value={hiddenCount}
              accent="amber"
            />
            <StatCard
              icon={<Layers className="h-5 w-5" />}
              label="Page Groups"
              value={groupCount}
              accent="purple"
            />
          </div>

          {/* Info banner */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600">
              <Info className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-blue-900">How page visibility works</p>
              <p className="mt-1 text-blue-700">
                Hidden pages are removed from the navbar, footer, and all references.
                Direct access to a hidden page redirects to home. Hiding a group
                (e.g. Impact) automatically hides all its sub-pages.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search pages by name or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 border-zinc-200 bg-white pl-10 shadow-sm"
            />
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : filteredTopLevel.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white text-center">
              <Search className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-sm font-medium text-zinc-600">No pages found</p>
              <p className="text-xs text-zinc-400">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Group parents (with sub-pages) → full-width accordions */}
              {filteredTopLevel.some((e) => getChildren(e.key).length > 0) && (
                <Accordion
                  type="multiple"
                  defaultValue={filteredTopLevel
                    .filter((e) => getChildren(e.key).length > 0)
                    .map((p) => p.key)}
                  className="space-y-3"
                >
                  {filteredTopLevel
                    .filter((entry) => getChildren(entry.key).length > 0)
                    .map((entry) => {
                      const config = getConfig(entry.key);
                      const children = getChildren(entry.key);
                      const isVisible = config?.visible ?? true;
                      const parentHidden = !isVisible;
                      const visibleChildren = children.filter(
                        (c) => getConfig(c.key)?.visible ?? true
                      ).length;

                      return (
                        <AccordionItem
                          key={entry.key}
                          value={entry.key}
                          className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${
                            isVisible
                              ? "border-zinc-200"
                              : "border-amber-200 bg-amber-50/30"
                          }`}
                        >
                          <AccordionTrigger className="px-5 py-4 hover:no-underline">
                            <div className="flex w-full items-center justify-between pr-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
                                    isVisible
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-amber-100 text-amber-500"
                                  }`}
                                >
                                  {isVisible ? (
                                    <Eye className="h-5 w-5" />
                                  ) : (
                                    <EyeOff className="h-5 w-5" />
                                  )}
                                </div>
                                <div className="text-left">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-zinc-900">
                                      {entry.label}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="border-blue-200 bg-blue-50 text-[10px] font-medium text-blue-600"
                                    >
                                      <Layers className="mr-1 h-2.5 w-2.5" />
                                      Group · {children.length}
                                    </Badge>
                                  </div>
                                  <p className="mt-0.5 font-mono text-xs text-zinc-400">
                                    {entry.route}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <StatusBadge visible={isVisible} />
                                <ToggleSwitch
                                  checked={isVisible}
                                  disabled={updating === entry.key}
                                  onChange={(v) => handleToggle(entry.key, v)}
                                />
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="px-5 pb-4">
                            <div className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
                              <div className="mb-2 flex items-center justify-between px-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                  Sub-pages ({visibleChildren}/{children.length} visible)
                                </p>
                                {parentHidden && (
                                  <Badge
                                    variant="outline"
                                    className="border-amber-200 bg-amber-100 text-[10px] text-amber-700"
                                  >
                                    <AlertCircle className="mr-1 h-2.5 w-2.5" />
                                    Children locked
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {children.map((child) => {
                                  const childConfig = getConfig(child.key);
                                  const childVisible = childConfig?.visible ?? true;
                                  const effectivelyVisible = childVisible && !parentHidden;
                                  return (
                                    <div
                                      key={child.key}
                                      className={`flex flex-col gap-3 rounded-lg border bg-white p-3 transition-all ${
                                        effectivelyVisible
                                          ? "border-zinc-200"
                                          : "border-amber-100 bg-amber-50/40"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${
                                            effectivelyVisible
                                              ? "bg-blue-50 text-blue-500"
                                              : "bg-zinc-100 text-zinc-400"
                                          }`}
                                        >
                                          {effectivelyVisible ? (
                                            <Eye className="h-4 w-4" />
                                          ) : (
                                            <EyeOff className="h-4 w-4" />
                                          )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className="truncate text-sm font-medium text-zinc-800">
                                              {child.label}
                                            </span>
                                            {parentHidden && (
                                              <Badge
                                                variant="secondary"
                                                className="shrink-0 bg-amber-100 text-[10px] text-amber-700"
                                              >
                                                Locked
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="truncate font-mono text-xs text-zinc-400">
                                            {child.route}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <StatusBadge visible={effectivelyVisible} small />
                                        <ToggleSwitch
                                          checked={childVisible}
                                          disabled={
                                            updating === child.key || parentHidden
                                          }
                                          onChange={(v) => handleToggle(child.key, v)}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                </Accordion>
              )}

              {/* Standalone pages (no sub-pages) → compact rectangle cards */}
              {filteredTopLevel.some((e) => getChildren(e.key).length === 0) && (
                <div>
                  <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Standalone Pages
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTopLevel
                      .filter((entry) => getChildren(entry.key).length === 0)
                      .map((entry) => {
                        const config = getConfig(entry.key);
                        const isVisible = config?.visible ?? true;
                        return (
                          <div
                            key={entry.key}
                            className={`group flex flex-col justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${
                              isVisible
                                ? "border-zinc-200 bg-white"
                                : "border-amber-200 bg-amber-50/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
                                  isVisible
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-amber-100 text-amber-500"
                                }`}
                              >
                                {isVisible ? (
                                  <Eye className="h-5 w-5" />
                                ) : (
                                  <EyeOff className="h-5 w-5" />
                                )}
                              </div>
                              <ToggleSwitch
                                checked={isVisible}
                                disabled={updating === entry.key}
                                onChange={(v) => handleToggle(entry.key, v)}
                              />
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-zinc-900">
                                  {entry.label}
                                </span>
                              </div>
                              <p className="mt-0.5 font-mono text-xs text-zinc-400">
                                {entry.route}
                              </p>
                              <div className="mt-2">
                                <StatusBadge visible={isVisible} small />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          {!loading && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
              <Sparkles className="h-3.5 w-3.5" />
              Changes apply instantly across the entire website
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: "blue" | "green" | "amber" | "purple";
}) {
  const accents = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border ${accents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold leading-none text-zinc-900">{value}</p>
        <p className="mt-1 text-xs font-medium text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({
  visible,
  small,
}: {
  visible: boolean;
  small?: boolean;
}) {
  if (visible) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-green-100 font-medium text-green-700 ${
          small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Visible
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 font-medium text-amber-700 ${
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Hidden
    </span>
  );
}

function ToggleSwitch({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "bg-blue-600" : "bg-zinc-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
