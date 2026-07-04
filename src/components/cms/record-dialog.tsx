"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { FieldInput } from "./field-input";
import type { ModelDef } from "@/lib/cms-models";

type RecordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelDef: ModelDef;
  /** The existing record being edited, or null for create mode. */
  record: Record<string, unknown> | null;
  /** Called with the form values when the user saves. */
  onSave: (values: Record<string, unknown>) => Promise<void>;
};

export function RecordDialog({
  open,
  onOpenChange,
  modelDef,
  record,
  onSave,
}: RecordDialogProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>({});
  const [saving, setSaving] = React.useState(false);

  // Reset values when the dialog opens or the record changes
  React.useEffect(() => {
    if (open) {
      const initial: Record<string, unknown> = {};
      for (const f of modelDef.fields) {
        if (record && record[f.name] !== undefined) {
          initial[f.name] = record[f.name];
        } else {
          initial[f.name] = defaultFor(f.type);
        }
      }
      setValues(initial);
    }
  }, [open, record, modelDef]);

  const handleChange = (name: string, val: unknown) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    // Basic required-field validation
    for (const f of modelDef.fields) {
      if (f.required) {
        const v = values[f.name];
        if (v === "" || v === null || v === undefined) {
          return; // The UI marks required fields; skip empty for now
        }
      }
    }
    setSaving(true);
    try {
      await onSave(values);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  const isCreate = !record;
  const title = `${isCreate ? "Create" : "Edit"} ${modelDef.singularLabel}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 px-6 py-4">
            {modelDef.fields.map((f) => (
              <FieldInput
                key={f.name}
                field={f}
                value={values[f.name]}
                onChange={(val) => handleChange(f.name, val)}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function defaultFor(type: string): unknown {
  switch (type) {
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "json":
      return "";
    case "select":
    case "icon":
      return "";
    default:
      return "";
  }
}
