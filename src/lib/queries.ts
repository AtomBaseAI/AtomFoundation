/**
 * Server-side data access layer.
 *
 * Every function here queries PostgreSQL via Prisma and returns plain
 * JSON-serialisable data (icon names are strings, dates are ISO strings).
 * These functions are consumed by the `/api/content` route and can also be
 * called directly from Server Components.
 */
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

// ---------------------------------------------------------------------------
// Types (icon is now a string name, resolved client-side via icon-map)
// ---------------------------------------------------------------------------
export type Site = {
  name: string;
  legalName: string;
  tagline: string;
  vision: string;
  mission: string;
  email: string;
  phone: string;
  address: string;
  addressShort: string;
  founded: number;
  registration: string;
};

export type ProgramModule = { name: string; description: string; icon: string };
export type Program = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  level: string;
  audience: string;
  modules: ProgramModule[];
  outcomes: string[];
};

export type ImpactMetric = {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
  description: string;
};

export type Sdg = {
  number: number;
  title: string;
  color: string;
  icon: string;
  contribution: string;
  highlights: string[];
};

export type EventItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  endDate: string | null;
  location: string;
  mode: string;
  description: string;
  status: string;
  seats: number | null;
  registered: number | null;
};

export type Story = {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  quote: string;
  journey: string;
  before: string;
  after: string;
};

export type Partner = {
  name: string;
  type: string;
  logoText: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  socials: { label: string; href: string }[] | null;
};

export type Advisor = {
  name: string;
  role: string;
  org: string;
  initials: string;
};

export type CoreValue = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  color: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  gradient: string;
  span: boolean;
};

export type VolunteerRole = {
  title: string;
  commitment: string;
  description: string;
  icon: string;
};

export type VolunteerFaq = {
  question: string;
  answer: string;
};

// ---------------------------------------------------------------------------
// Query functions
// ---------------------------------------------------------------------------
export async function getSite(): Promise<Site | null> {
  const row = await db.siteSetting.findUnique({ where: { id: "default" } });
  if (!row) return null;
  return {
    name: row.name,
    legalName: row.legalName,
    tagline: row.tagline,
    vision: row.vision,
    mission: row.mission,
    email: row.email,
    phone: row.phone,
    address: row.address,
    addressShort: row.addressShort,
    founded: row.founded,
    registration: row.registration,
  };
}

export async function getPrograms(): Promise<Program[]> {
  const rows = await db.program.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    tagline: r.tagline,
    description: r.description,
    icon: r.icon,
    color: r.color,
    duration: r.duration,
    level: r.level,
    audience: r.audience,
    modules: (r.modules as Prisma.JsonValue) as ProgramModule[],
    outcomes: r.outcomes,
  }));
}

export async function getImpactMetrics(): Promise<ImpactMetric[]> {
  const rows = await db.impactMetric.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    label: r.label,
    value: r.value,
    suffix: r.suffix,
    icon: r.icon,
    color: r.color,
    description: r.description,
  }));
}

export async function getSdgs(): Promise<Sdg[]> {
  const rows = await db.sdg.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    number: r.number,
    title: r.title,
    color: r.color,
    icon: r.icon,
    contribution: r.contribution,
    highlights: r.highlights,
  }));
}

export async function getEvents(): Promise<EventItem[]> {
  const rows = await db.eventItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type,
    date: r.date.toISOString(),
    endDate: r.endDate ? r.endDate.toISOString() : null,
    location: r.location,
    mode: r.mode,
    description: r.description,
    status: r.status,
    seats: r.seats,
    registered: r.registered,
  }));
}

export async function getStories(): Promise<Story[]> {
  const rows = await db.story.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    category: r.category,
    image: r.image,
    quote: r.quote,
    journey: r.journey,
    before: r.before,
    after: r.after,
  }));
}

export async function getPartners(): Promise<Partner[]> {
  const rows = await db.partner.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ name: r.name, type: r.type, logoText: r.logoText }));
}

export async function getTeam(): Promise<TeamMember[]> {
  const rows = await db.teamMember.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    name: r.name,
    role: r.role,
    bio: r.bio,
    initials: r.initials,
    color: r.color,
    socials: (r.socials as { label: string; href: string }[] | null) ?? null,
  }));
}

export async function getAdvisors(): Promise<Advisor[]> {
  const rows = await db.advisor.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    name: r.name,
    role: r.role,
    org: r.org,
    initials: r.initials,
  }));
}

export async function getCoreValues(): Promise<CoreValue[]> {
  const rows = await db.coreValue.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    icon: r.icon,
    color: r.color,
  }));
}

export async function getTimeline(): Promise<Milestone[]> {
  const rows = await db.milestone.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    year: r.year,
    title: r.title,
    description: r.description,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    name: r.name,
    role: r.role,
    quote: r.quote,
    initials: r.initials,
    color: r.color,
  }));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const rows = await db.galleryItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    gradient: r.gradient,
    span: r.span,
  }));
}

export async function getVolunteerRoles(): Promise<VolunteerRole[]> {
  const rows = await db.volunteerRole.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    title: r.title,
    commitment: r.commitment,
    description: r.description,
    icon: r.icon,
  }));
}

export async function getVolunteerFaqs(): Promise<VolunteerFaq[]> {
  const rows = await db.volunteerFaq.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ question: r.question, answer: r.answer }));
}

// ---------------------------------------------------------------------------
// Page config (visibility toggles)
// ---------------------------------------------------------------------------
export type PageConfigItem = {
  key: string;
  label: string;
  route: string;
  group: string | null;
  visible: boolean;
  formsVisible: boolean;
};

export async function getPageConfig(): Promise<PageConfigItem[]> {
  const rows = await db.pageConfig.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    key: r.key,
    label: r.label,
    route: r.route,
    group: r.group,
    visible: r.visible,
    formsVisible: r.formsVisible,
  }));
}

// ---------------------------------------------------------------------------
// Dispatcher: map a content type key -> query function
// ---------------------------------------------------------------------------
export const contentFetchers = {
  site: getSite,
  programs: getPrograms,
  impact: getImpactMetrics,
  sdgs: getSdgs,
  events: getEvents,
  stories: getStories,
  partners: getPartners,
  team: getTeam,
  advisors: getAdvisors,
  "core-values": getCoreValues,
  timeline: getTimeline,
  testimonials: getTestimonials,
  gallery: getGalleryItems,
  "volunteer-roles": getVolunteerRoles,
  "volunteer-faqs": getVolunteerFaqs,
  "page-config": getPageConfig,
} as const;

export type ContentType = keyof typeof contentFetchers;
