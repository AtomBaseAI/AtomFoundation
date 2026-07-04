/**
 * CMS Model Registry
 *
 * Defines every content type the CMS can manage: its Prisma model name,
 * display labels, field schema, and list/table configuration. The generic
 * CMS API and CMS UI are both driven by this registry so adding a new model
 * only requires adding an entry here.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "json"
  | "array"
  | "boolean"
  | "icon"
  | "color";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select / icon (icon uses iconMap keys)
  help?: string;
  placeholder?: string;
};

export type ModelDef = {
  slug: string; // URL slug, e.g. "programs"
  prismaModel: string; // Prisma model name (lowercase), e.g. "program"
  label: string; // "Programs"
  singularLabel: string; // "Program"
  icon: string; // lucide icon name for sidebar
  idField: string; // primary key field name
  idType: "string" | "number";
  fields: Field[];
  listColumns: string[]; // field names to show in the table
  singleton?: boolean; // only one row (e.g. site settings)
  readOnly?: boolean; // form submissions — no create/edit/delete
  group: "content" | "submissions";
};

// Shared option sets
const COLOR_OPTIONS = ["blue", "purple", "green"];
const ICON_NAMES = [
  "Sparkles", "Code2", "GraduationCap", "HeartHandshake", "Users",
  "Brain", "Bot", "Cpu", "Globe", "BookOpen", "Briefcase", "Award",
  "Laptop", "ShieldCheck", "Rocket", "Target", "Heart", "Handshake",
  "Building2", "Scale", "Lightbulb", "TrendingUp",
];

export const cmsModels: ModelDef[] = [
  // ── Content ──────────────────────────────────────────────────────────────
  {
    slug: "site",
    prismaModel: "siteSetting",
    label: "Site Settings",
    singularLabel: "Site Settings",
    icon: "Settings",
    idField: "id",
    idType: "string",
    singleton: true,
    group: "content",
    fields: [
      { name: "name", label: "Site Name", type: "text", required: true },
      { name: "legalName", label: "Legal Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "vision", label: "Vision", type: "textarea", required: true },
      { name: "mission", label: "Mission", type: "textarea", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
      { name: "addressShort", label: "Address (Short)", type: "text", required: true },
      { name: "founded", label: "Founded Year", type: "number", required: true },
      { name: "registration", label: "Registration Info", type: "text", required: true },
    ],
    listColumns: ["name", "email", "phone"],
  },
  {
    slug: "programs",
    prismaModel: "program",
    label: "Programs",
    singularLabel: "Program",
    icon: "Sparkles",
    idField: "id",
    idType: "string",
    group: "content",
    fields: [
      { name: "id", label: "ID (slug)", type: "text", required: true, help: "Unique slug, e.g. 'ai', 'software'" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "icon", required: true, options: ICON_NAMES },
      { name: "color", label: "Color", type: "select", required: true, options: COLOR_OPTIONS },
      { name: "duration", label: "Duration", type: "text", required: true },
      { name: "level", label: "Level", type: "text", required: true },
      { name: "audience", label: "Audience", type: "text", required: true },
      {
        name: "modules",
        label: "Modules (JSON)",
        type: "json",
        required: true,
        help: 'Array of { name, description, icon }. Example: [{"name":"Prompt Engineering","description":"...","icon":"Bot"}]',
      },
      { name: "outcomes", label: "Outcomes (one per line)", type: "array", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["title", "duration", "color", "order"],
  },
  {
    slug: "impact",
    prismaModel: "impactMetric",
    label: "Impact Metrics",
    singularLabel: "Impact Metric",
    icon: "TrendingUp",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "number", required: true },
      { name: "suffix", label: "Suffix", type: "text", help: "e.g. '+', '%'" },
      { name: "icon", label: "Icon", type: "icon", required: true, options: ICON_NAMES },
      { name: "color", label: "Color", type: "select", required: true, options: COLOR_OPTIONS },
      { name: "description", label: "Description", type: "text", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["label", "value", "suffix", "color", "order"],
  },
  {
    slug: "sdgs",
    prismaModel: "sdg",
    label: "SDGs",
    singularLabel: "SDG",
    icon: "Target",
    idField: "number",
    idType: "number",
    group: "content",
    fields: [
      { name: "number", label: "SDG Number", type: "number", required: true, help: "UN SDG number, e.g. 4, 5, 8" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "color", label: "Color (hex)", type: "color", required: true },
      { name: "icon", label: "Icon", type: "icon", required: true, options: ICON_NAMES },
      { name: "contribution", label: "Contribution", type: "textarea", required: true },
      { name: "highlights", label: "Highlights (one per line)", type: "array", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["number", "title", "color", "order"],
  },
  {
    slug: "events",
    prismaModel: "eventItem",
    label: "Events",
    singularLabel: "Event",
    icon: "Calendar",
    idField: "id",
    idType: "string",
    group: "content",
    fields: [
      { name: "id", label: "ID", type: "text", required: true, help: "Unique ID, e.g. 'ev1'" },
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: ["Workshop", "Hackathon", "AI Bootcamp", "Community Program", "Webinar"],
      },
      { name: "date", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: false },
      { name: "location", label: "Location", type: "text", required: true },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        required: true,
        options: ["Online", "Offline", "Hybrid"],
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["upcoming", "past"],
      },
      { name: "seats", label: "Seats", type: "number", required: false },
      { name: "registered", label: "Registered", type: "number", required: false },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["title", "type", "date", "mode", "status", "order"],
  },
  {
    slug: "stories",
    prismaModel: "story",
    label: "Success Stories",
    singularLabel: "Story",
    icon: "Heart",
    idField: "id",
    idType: "string",
    group: "content",
    fields: [
      { name: "id", label: "ID", type: "text", required: true, help: "e.g. 's1'" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Student", "Women Entrepreneur", "Placement", "Volunteer"],
      },
      { name: "image", label: "Image Key", type: "text", required: true, help: "Image identifier, e.g. 'priya'" },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "journey", label: "Journey Summary", type: "textarea", required: true },
      { name: "before", label: "Before", type: "textarea", required: true },
      { name: "after", label: "After", type: "textarea", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["name", "role", "category", "order"],
  },
  {
    slug: "partners",
    prismaModel: "partner",
    label: "Partners",
    singularLabel: "Partner",
    icon: "Handshake",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: ["CSR", "Educational Institution", "NGO", "Government", "Technology"],
      },
      { name: "logoText", label: "Logo Text", type: "text", required: true, help: "Short text for logo, e.g. 'TN'" },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["name", "type", "logoText", "order"],
  },
  {
    slug: "team",
    prismaModel: "teamMember",
    label: "Team",
    singularLabel: "Team Member",
    icon: "Users",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea", required: true },
      { name: "initials", label: "Initials", type: "text", required: true, help: "e.g. 'AI'" },
      { name: "color", label: "Color", type: "select", required: true, options: COLOR_OPTIONS },
      {
        name: "socials",
        label: "Socials (JSON)",
        type: "json",
        required: false,
        help: 'Array of { label, href }. Leave empty for none.',
      },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["name", "role", "initials", "color", "order"],
  },
  {
    slug: "advisors",
    prismaModel: "advisor",
    label: "Advisors",
    singularLabel: "Advisor",
    icon: "Award",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "org", label: "Organization", type: "text", required: true },
      { name: "initials", label: "Initials", type: "text", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["name", "role", "org", "order"],
  },
  {
    slug: "core-values",
    prismaModel: "coreValue",
    label: "Core Values",
    singularLabel: "Core Value",
    icon: "ShieldCheck",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "icon", required: true, options: ICON_NAMES },
      { name: "color", label: "Color", type: "select", required: true, options: COLOR_OPTIONS },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["title", "color", "order"],
  },
  {
    slug: "timeline",
    prismaModel: "milestone",
    label: "Timeline",
    singularLabel: "Milestone",
    icon: "Rocket",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "year", label: "Year", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["year", "title", "order"],
  },
  {
    slug: "testimonials",
    prismaModel: "testimonial",
    label: "Testimonials",
    singularLabel: "Testimonial",
    icon: "Heart",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "initials", label: "Initials", type: "text", required: true },
      { name: "color", label: "Color", type: "select", required: true, options: COLOR_OPTIONS },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["name", "role", "color", "order"],
  },
  {
    slug: "gallery",
    prismaModel: "galleryItem",
    label: "Gallery",
    singularLabel: "Gallery Item",
    icon: "BookOpen",
    idField: "id",
    idType: "string",
    group: "content",
    fields: [
      { name: "id", label: "ID", type: "text", required: true, help: "e.g. 'g1'" },
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Events", "Training Sessions", "Certificates", "Community Outreach", "Videos"],
      },
      { name: "gradient", label: "Gradient (Tailwind classes)", type: "text", required: true, help: "e.g. 'from-blue-500 via-purple-500 to-pink-500'" },
      { name: "span", label: "Span (wide)", type: "boolean" },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["title", "category", "span", "order"],
  },
  {
    slug: "volunteer-roles",
    prismaModel: "volunteerRole",
    label: "Volunteer Roles",
    singularLabel: "Volunteer Role",
    icon: "Users",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "commitment", label: "Commitment", type: "text", required: true, help: "e.g. '4 hrs/week'" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "icon", required: true, options: ICON_NAMES },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["title", "commitment", "order"],
  },
  {
    slug: "volunteer-faqs",
    prismaModel: "volunteerFaq",
    label: "Volunteer FAQs",
    singularLabel: "Volunteer FAQ",
    icon: "Lightbulb",
    idField: "id",
    idType: "number",
    group: "content",
    fields: [
      { name: "question", label: "Question", type: "textarea", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "order", label: "Order", type: "number", required: true },
    ],
    listColumns: ["question", "order"],
  },
  // ── Form Submissions (read-only) ──────────────────────────────────────────
  {
    slug: "contact-messages",
    prismaModel: "contactMessage",
    label: "Contact Messages",
    singularLabel: "Contact Message",
    icon: "Mail",
    idField: "id",
    idType: "string",
    readOnly: true,
    group: "submissions",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "createdAt", label: "Received", type: "datetime" },
    ],
    listColumns: ["name", "email", "subject", "createdAt"],
  },
  {
    slug: "volunteer-signups",
    prismaModel: "volunteerSignup",
    label: "Volunteer Signups",
    singularLabel: "Volunteer Signup",
    icon: "Users",
    idField: "id",
    idType: "string",
    readOnly: true,
    group: "submissions",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "skills", label: "Skills", type: "textarea" },
      { name: "availability", label: "Availability", type: "text" },
      { name: "motivation", label: "Motivation", type: "textarea" },
      { name: "createdAt", label: "Received", type: "datetime" },
    ],
    listColumns: ["name", "email", "role", "createdAt"],
  },
  {
    slug: "event-registrations",
    prismaModel: "eventRegistration",
    label: "Event Registrations",
    singularLabel: "Event Registration",
    icon: "Calendar",
    idField: "id",
    idType: "string",
    readOnly: true,
    group: "submissions",
    fields: [
      { name: "eventId", label: "Event ID", type: "text" },
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "createdAt", label: "Received", type: "datetime" },
    ],
    listColumns: ["eventId", "name", "email", "createdAt"],
  },
  {
    slug: "newsletter-subscribers",
    prismaModel: "newsletterSubscriber",
    label: "Newsletter Subscribers",
    singularLabel: "Subscriber",
    icon: "Mail",
    idField: "id",
    idType: "string",
    readOnly: true,
    group: "submissions",
    fields: [
      { name: "email", label: "Email", type: "text" },
      { name: "createdAt", label: "Subscribed", type: "datetime" },
    ],
    listColumns: ["email", "createdAt"],
  },
];

export function getModelDef(slug: string): ModelDef | undefined {
  return cmsModels.find((m) => m.slug === slug);
}
