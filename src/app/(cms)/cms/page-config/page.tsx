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
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        // Cascade: if toggling a group parent off, hide children
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
      toast.success(
        `${visible ? "Showing" : "Hiding"} "${pageRegistry.find((p) => p.key === key)?.label ?? key}"`,
        {
          description: visible
            ? "Page is now visible on the site."
            : "Page and all its references are now hidden.",
        }
      );
    } catch (err) {
      // Revert on error
      setConfigs(prev);
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
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

  // Build the display structure: top-level pages + group children
  const topLevel = pageRegistry.filter((p) => !p.group);
  const getChildren = (parentKey: string) =>
    pageRegistry.filter((p) => p.group === parentKey);

  const getConfig = (key: string): ConfigEntry | undefined =>
    configs.find((c) => c.key === key);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar (same as main CMS) */}
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
            <p className="mt-1 text-sm font-medium text-white">Page Config</p>
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
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
          <div>
            <h1 className="font-poppins text-lg font-bold text-zinc-900">Page Config</h1>
            <p className="text-xs text-zinc-500">
              Toggle visibility of pages and page groups across your site
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchConfigs} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Refresh
          </Button>
        </header>

        <div className="p-8">
          {/* Info banner */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600">
              <Eye className="h-4 w-4" />
            </div>
            <div className="text-sm text-blue-900">
              <p className="font-semibold">How page visibility works</p>
              <p className="mt-1 text-blue-700">
                Hidden pages are removed from the navbar, footer, and all references.
                Direct access to a hidden page redirects to home. Hiding a group
                (e.g. Impact) automatically hides all its sub-pages.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : (
            <div className="space-y-3">
              {topLevel.map((entry) => {
                const config = getConfig(entry.key);
                const children = getChildren(entry.key);
                const isGroupParent = children.length > 0;

                return (
                  <div key={entry.key}>
                    <ToggleRow
                      entry={entry}
                      visible={config?.visible ?? true}
                      isGroupParent={isGroupParent}
                      disabled={updating === entry.key}
                      onToggle={(v) => handleToggle(entry.key, v)}
                    />
                    {isGroupParent && (
                      <div className="ml-6 border-l-2 border-zinc-200 pl-4">
                        <div className="mt-2 space-y-2">
                          {children.map((child) => {
                            const childConfig = getConfig(child.key);
                            // If parent is hidden, children are effectively hidden
                            const parentHidden = !(config?.visible ?? true);
                            return (
                              <ToggleRow
                                key={child.key}
                                entry={child}
                                visible={childConfig?.visible ?? true}
                                disabled={
                                  updating === child.key || parentHidden
                                }
                                forcedHidden={parentHidden}
                                onToggle={(v) => handleToggle(child.key, v)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ToggleRow({
  entry,
  visible,
  disabled,
  forcedHidden,
  isGroupParent,
  onToggle,
}: {
  entry: PageRegistryEntry;
  visible: boolean;
  disabled?: boolean;
  forcedHidden?: boolean;
  isGroupParent?: boolean;
  onToggle: (visible: boolean) => void;
}) {
  const effectivelyVisible = visible && !forcedHidden;

  return (
    <Card
      className={`flex items-center justify-between p-4 transition-colors ${
        effectivelyVisible ? "bg-white" : "bg-zinc-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`grid h-9 w-9 place-items-center rounded-lg ${
            effectivelyVisible
              ? "bg-blue-100 text-blue-600"
              : "bg-zinc-200 text-zinc-400"
          }`}
        >
          {effectivelyVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900">{entry.label}</p>
            {isGroupParent && (
              <Badge variant="outline" className="text-[10px]">Group</Badge>
            )}
            {forcedHidden && !visible && (
              <Badge variant="secondary" className="text-[10px] text-zinc-500">
                Hidden by parent
              </Badge>
            )}
          </div>
          <p className="text-xs text-zinc-500">{entry.route}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium ${effectivelyVisible ? "text-green-600" : "text-zinc-400"}`}>
          {effectivelyVisible ? "Visible" : "Hidden"}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={effectivelyVisible}
          disabled={disabled}
          onClick={() => onToggle(!visible)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            effectivelyVisible ? "bg-blue-600" : "bg-zinc-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
              effectivelyVisible ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </Card>
  );
}
