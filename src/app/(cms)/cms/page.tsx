"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Atom,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ExternalLink,
  Eye,
  RefreshCw,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cmsModels, type ModelDef } from "@/lib/cms-models";
import { getIcon } from "@/lib/icon-map";
import { RecordDialog } from "@/components/cms/record-dialog";

type DataRecord = Record<string, unknown>;

export default function CmsDashboard() {
  const router = useRouter();
  const [user, setUser] = React.useState<{ email: string } | null>(null);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [activeSlug, setActiveSlug] = React.useState<string>("site");
  const [records, setRecords] = React.useState<DataRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  // Dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState<DataRecord | null>(null);
  const [viewRecord, setViewRecord] = React.useState<DataRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = React.useState<DataRecord | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const activeModel = cmsModels.find((m) => m.slug === activeSlug)!;

  // ── Auth check ───────────────────────────────────────────────────────────
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

  // ── Fetch records when model changes ─────────────────────────────────────
  const fetchRecords = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/${activeSlug}`);
      if (res.status === 401) {
        router.replace("/cms/login");
        return;
      }
      const json = await res.json();
      if (json.data) {
        setRecords(Array.isArray(json.data) ? json.data : [json.data]);
      } else {
        setRecords([]);
      }
    } catch {
      toast.error("Failed to load data");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [activeSlug, router]);

  React.useEffect(() => {
    if (!authChecked) return;
    setSearch("");
    fetchRecords();
  }, [authChecked, activeSlug, fetchRecords]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/cms/login");
    router.refresh();
  };

  const handleCreate = () => {
    setEditingRecord(null);
    setDialogOpen(true);
  };

  const handleEdit = (record: DataRecord) => {
    setEditingRecord(record);
    setDialogOpen(true);
  };

  // For singletons: open the edit dialog pre-filled with the existing record
  const handleEditSingleton = () => {
    setEditingRecord(records[0] ?? null);
    setDialogOpen(true);
  };

  const handleSave = async (values: DataRecord) => {
    try {
      if (activeModel.singleton) {
        // PUT to /api/cms/[model] for singleton
        const res = await fetch(`/api/cms/${activeSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to save");
        }
        toast.success("Settings saved successfully");
      } else if (editingRecord) {
        const id = editingRecord[activeModel.idField];
        const res = await fetch(`/api/cms/${activeSlug}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update");
        }
        toast.success(`${activeModel.singularLabel} updated`);
      } else {
        const res = await fetch(`/api/cms/${activeSlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create");
        }
        toast.success(`${activeModel.singularLabel} created`);
      }
      fetchRecords();
    } catch (err) {
      toast.error("Save failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deleteRecord) return;
    setDeleting(true);
    try {
      const id = deleteRecord[activeModel.idField];
      const res = await fetch(`/api/cms/${activeSlug}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete");
      }
      toast.success(`${activeModel.singularLabel} deleted`);
      setDeleteRecord(null);
      fetchRecords();
    } catch (err) {
      toast.error("Delete failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setDeleting(false);
    }
  };

  // ── Filtered records ─────────────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    if (!search) return records;
    const q = search.toLowerCase();
    return records.filter((r) =>
      activeModel.listColumns.some((col) =>
        String(r[col] ?? "").toLowerCase().includes(q)
      )
    );
  }, [records, search, activeModel]);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  const contentModels = cmsModels.filter((m) => m.group === "content");
  const submissionModels = cmsModels.filter((m) => m.group === "submissions");

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-zinc-950 text-zinc-300">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 border-b border-zinc-800 px-5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <Atom className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Atom Arc CMS</p>
            <p className="text-[10px] text-zinc-500">Content Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Content
            </p>
            <div className="space-y-0.5">
              {contentModels.map((m) => (
                <NavButton
                  key={m.slug}
                  model={m}
                  active={m.slug === activeSlug}
                  onClick={() => setActiveSlug(m.slug)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Submissions
            </p>
            <div className="space-y-0.5">
              {submissionModels.map((m) => (
                <NavButton
                  key={m.slug}
                  model={m}
                  active={m.slug === activeSlug}
                  onClick={() => setActiveSlug(m.slug)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Settings
            </p>
            <div className="space-y-0.5">
              <Link
                href="/cms/page-config"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                {React.createElement(getIcon("Settings"), { className: "h-4 w-4 shrink-0" })}
                <span>Page Config</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
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
          <div className="flex gap-1.5">
            <Link
              href="/"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-red-950 hover:border-red-800 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="ml-64 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
          <div>
            <h1 className="font-poppins text-lg font-bold text-zinc-900">
              {activeModel.label}
            </h1>
            <p className="text-xs text-zinc-500">
              {activeModel.readOnly
                ? "Read-only submissions"
                : activeModel.singleton
                ? "Singleton configuration"
                : `Manage ${activeModel.label.toLowerCase()}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecords}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            {!activeModel.readOnly && !activeModel.singleton && (
              <Button size="sm" onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            )}
            {activeModel.singleton && (
              <Button size="sm" onClick={handleEditSingleton} className="bg-blue-600 hover:bg-blue-700">
                <Pencil className="mr-2 h-4 w-4" /> Edit Settings
              </Button>
            )}
          </div>
        </header>

        {/* Content area */}
        <div className="p-8">
          {/* Search bar (non-singleton) */}
          {!activeModel.singleton && records.length > 0 && (
            <div className="relative mb-4 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder={`Search ${activeModel.label.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : activeModel.singleton ? (
            <SingletonView model={activeModel} record={records[0]} onEdit={handleEditSingleton} />
          ) : records.length === 0 ? (
            <EmptyState model={activeModel} onCreate={handleCreate} />
          ) : (
            <DataTable
              model={activeModel}
              records={filtered}
              onEdit={handleEdit}
              onDelete={setDeleteRecord}
              onView={setViewRecord}
            />
          )}
        </div>
      </main>

      {/* ── Create/Edit Dialog ────────────────────────────────────────────── */}
      <RecordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        modelDef={activeModel}
        record={editingRecord}
        onSave={handleSave}
      />

      {/* ── View Dialog (read-only details) ───────────────────────────────── */}
      <Dialog open={!!viewRecord} onOpenChange={(o) => !o && setViewRecord(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>{activeModel.singularLabel} Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
            <dl className="space-y-3">
              {activeModel.fields.map((f) => (
                <div key={f.name} className="grid grid-cols-3 gap-4 border-b border-zinc-100 pb-3 last:border-0">
                  <dt className="text-sm font-medium text-zinc-500">{f.label}</dt>
                  <dd className="col-span-2 text-sm text-zinc-900">
                    {formatValue(viewRecord?.[f.name], f.type)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ────────────────────────────────────── */}
      <Dialog open={!!deleteRecord} onOpenChange={(o) => !o && setDeleteRecord(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {activeModel.singularLabel}?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-zinc-600">
            Are you sure you want to delete this {activeModel.singularLabel.toLowerCase()}?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteRecord(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function NavButton({
  model,
  active,
  onClick,
}: {
  model: ModelDef;
  active: boolean;
  onClick: () => void;
}) {
  const IconCmp = getIcon(model.icon);
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      {React.createElement(IconCmp, { className: "h-4 w-4 shrink-0" })}
      <span className="truncate">{model.label}</span>
    </button>
  );
}

function DataTable({
  model,
  records,
  onEdit,
  onDelete,
  onView,
}: {
  model: ModelDef;
  records: DataRecord[];
  onEdit: (r: DataRecord) => void;
  onDelete: (r: DataRecord) => void;
  onView: (r: DataRecord) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {model.listColumns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {model.fields.find((f) => f.name === col)?.label ?? col}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {records.map((record, idx) => (
              <tr key={String(record[model.idField] ?? idx)} className="hover:bg-zinc-50">
                {model.listColumns.map((col) => (
                  <td key={col} className="max-w-xs px-4 py-3 text-zinc-700">
                    {renderCell(record[col], col, model)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onView(record)}
                      title="View"
                      className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {!model.readOnly && (
                      <>
                        <button
                          onClick={() => onEdit(record)}
                          title="Edit"
                          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(record)}
                          title="Delete"
                          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-500">
        {records.length} {records.length === 1 ? "record" : "records"}
      </div>
    </div>
  );
}

function renderCell(value: unknown, col: string, model: ModelDef): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-zinc-300">—</span>;
  }
  const field = model.fields.find((f) => f.name === col);
  const str = String(value);

  // Color badge
  if (field?.type === "select" && (col === "color" || col === "type" || col === "status" || col === "category" || col === "mode")) {
    return <Badge variant="secondary">{str}</Badge>;
  }
  // Date formatting
  if (field?.type === "date" || field?.type === "datetime") {
    try {
      return new Date(str).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...(field.type === "datetime" ? { hour: "2-digit", minute: "2-digit" } : {}),
      });
    } catch {
      return str;
    }
  }
  // Boolean
  if (field?.type === "boolean") {
    return value ? <Badge className="bg-green-100 text-green-700">Yes</Badge> : <Badge variant="secondary">No</Badge>;
  }
  // Color swatch
  if (field?.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded border border-zinc-300" style={{ background: str }} />
        <span className="font-mono text-xs">{str}</span>
      </div>
    );
  }
  // Truncate long text
  if (str.length > 80) {
    return <span title={str}>{str.slice(0, 80)}…</span>;
  }
  return str;
}

function formatValue(value: unknown, type: string): React.ReactNode {
  if (value === null || value === undefined || value === "") {
    return <span className="text-zinc-400">—</span>;
  }
  if (type === "array" && Array.isArray(value)) {
    return (
      <ul className="list-disc space-y-0.5 pl-4">
        {value.map((item, i) => (
          <li key={i}>{String(item)}</li>
        ))}
      </ul>
    );
  }
  if (type === "json") {
    const str = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    return <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-3 text-xs">{str}</pre>;
  }
  if (type === "boolean") {
    return value ? "Yes" : "No";
  }
  if (type === "date" || type === "datetime") {
    try {
      return new Date(String(value)).toLocaleString();
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function SingletonView({
  model,
  record,
  onEdit,
}: {
  model: ModelDef;
  record: DataRecord | undefined;
  onEdit: () => void;
}) {
  if (!record) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <p className="text-sm text-zinc-500">No settings found. Click "Edit Settings" to configure.</p>
        <Button onClick={onEdit} className="mt-4 bg-blue-600 hover:bg-blue-700">
          <Pencil className="mr-2 h-4 w-4" /> Edit Settings
        </Button>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2">
        {model.fields.map((f) => (
          <div key={f.name} className="bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{f.label}</p>
            <p className="mt-1 text-sm text-zinc-900">
              {formatValue(record[f.name], f.type)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({
  model,
  onCreate,
}: {
  model: ModelDef;
  onCreate: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-zinc-100">
        {React.createElement(getIcon(model.icon), { className: "h-6 w-6 text-zinc-400" })}
      </div>
      <p className="text-sm font-medium text-zinc-700">No {model.label.toLowerCase()} yet</p>
      <p className="mt-1 text-sm text-zinc-500">
        {model.readOnly
          ? "Form submissions will appear here."
          : "Get started by creating your first record."}
      </p>
      {!model.readOnly && (
        <Button onClick={onCreate} className="mt-4 bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add New {model.singularLabel}
        </Button>
      )}
    </div>
  );
}
