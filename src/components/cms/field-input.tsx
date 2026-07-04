"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Field } from "@/lib/cms-models";

/**
 * Renders a single form field based on its type definition.
 * Used inside the CMS create/edit dialog.
 */
export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  const id = `field-${field.name}`;

  switch (field.type) {
    case "textarea":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Textarea
            id={id}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            placeholder={field.placeholder}
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "number":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Input
            id={id}
            type="number"
            value={value === null || value === undefined ? "" : String(value)}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder={field.placeholder}
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "date":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Input
            id={id}
            type="date"
            value={toDateInput(value)}
            onChange={(e) => onChange(e.target.value)}
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "datetime":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Input
            id={id}
            type="datetime-local"
            value={toDatetimeInput(value)}
            onChange={(e) => onChange(e.target.value)}
            readOnly
            className="bg-muted/50"
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center gap-3 py-2">
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              value ? "bg-blue-600" : "bg-zinc-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                value ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <Label htmlFor={id} className="cursor-pointer">
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
        </div>
      );

    case "select":
    case "icon":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Select
            value={String(value ?? "")}
            onValueChange={(v) => onChange(v)}
          >
            <SelectTrigger id={id}>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "color":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <div className="flex gap-2">
            <input
              id={id}
              type="color"
              value={String(value ?? "#000000")}
              onChange={(e) => onChange(e.target.value)}
              className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border border-input bg-background p-1"
            />
            <Input
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#C5192D"
              className="flex-1"
            />
          </div>
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "json":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Textarea
            id={id}
            value={
              typeof value === "string"
                ? value
                : value == null
                ? ""
                : JSON.stringify(value, null, 2)
            }
            onChange={(e) => onChange(e.target.value)}
            rows={8}
            className="font-mono text-xs"
            placeholder='[{"name":"...","description":"..."}]'
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    case "array":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Textarea
            id={id}
            value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            placeholder={"One item per line"}
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );

    default: // text
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id}>
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          <Input
            id={id}
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
        </div>
      );
  }
}

// --- helpers ---

function toDateInput(val: unknown): string {
  if (!val) return "";
  try {
    const d = new Date(val as string);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function toDatetimeInput(val: unknown): string {
  if (!val) return "";
  try {
    const d = new Date(val as string);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 16);
  } catch {
    return "";
  }
}
