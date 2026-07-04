/**
 * Public re-exports of content types.
 *
 * All website content now lives in PostgreSQL and is fetched dynamically via
 * the `/api/content` API (see `src/hooks/use-content.ts`). This module keeps
 * the type re-exports so existing imports (`import type { Program } from
 * "@/lib/data"`) continue to work — the only difference is that `icon` is now
 * a string (lucide icon name) resolved client-side via `getIcon`.
 */
export type {
  Site,
  Program,
  ProgramModule,
  ImpactMetric,
  Sdg,
  EventItem,
  Story,
  Partner,
  TeamMember,
  Advisor,
  CoreValue,
  Milestone,
  Testimonial,
  GalleryItem,
  VolunteerRole,
  VolunteerFaq,
} from "@/lib/queries";
