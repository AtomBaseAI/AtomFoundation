"use client";

import { useEffect, useState } from "react";
import type {
  Site,
  Program,
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
  PageConfigItem,
} from "@/lib/queries";

export type ContentData = {
  site?: Site | null;
  programs?: Program[];
  impact?: ImpactMetric[];
  sdgs?: Sdg[];
  events?: EventItem[];
  stories?: Story[];
  partners?: Partner[];
  team?: TeamMember[];
  advisors?: Advisor[];
  "core-values"?: CoreValue[];
  timeline?: Milestone[];
  testimonials?: Testimonial[];
  gallery?: GalleryItem[];
  "volunteer-roles"?: VolunteerRole[];
  "volunteer-faqs"?: VolunteerFaq[];
  "page-config"?: PageConfigItem[];
};

type State<T extends ContentData> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Fetch one or more content types from the database via `/api/content`.
 *
 * Usage:
 *   const { data, loading } = useContent(["site", "programs", "events"]);
 *
 * The hook dedupes requests that share the same set of types.
 */
export function useContent<T extends ContentData>(types: Array<keyof ContentData>) {
  const key = types.slice().sort().join(",");

  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (types.length === 0) {
      setState({ data: {} as T, loading: false, error: null });
      return;
    }

    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetch(`/api/content?types=${encodeURIComponent(key)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        if (!active) return;
        setState({ data: (json.data ?? {}) as T, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load content",
        });
      });

    return () => {
      active = false;
    };
  }, [key]);

  return state;
}
