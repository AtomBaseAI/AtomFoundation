# Task 5c — Partners, Blog, Contact pages

**Agent**: full-stack-developer
**Task**: Build `/partners`, `/blog`, and `/contact` routes for the Atom Foundation Next.js 16 site.

## What I built

### `src/app/partners/page.tsx`
- PageHero (eyebrow "Our Partners", breadcrumbs Home / Partners, CTA buttons).
- Section: 5 partner-type cards (CSR, Educational Institutions, NGOs, Government, Technology) with Building2/GraduationCap/HeartHandshake/Landmark/Cpu icons + live counts computed from `partners` array.
- Section: 12-partner responsive grid — each card has a square gradient logo placeholder with `logoText` initials, name, and a type badge. Hover lift via Framer Motion.
- Marquee row using `animate-marquee` CSS class, list duplicated for seamless loop, with fade masks on both edges.
- Section: 3-column "Why partner with us" (Amplify Impact, Co-branded Programs, Transparent Reporting) with icons + a stats card including `NodeNetwork` SVG.
- Section: gradient "Become a Partner" CTA band with partnership inquiry form. Posts to `/api/contact` with `subject="Partnership Inquiry — {type}"`. Uses sonner `toast` for success/error and a `Loader2` spinner during submit.
- Section: 3 testimonial quote cards from `testimonials` data.

### `src/app/blog/page.tsx`
- PageHero (eyebrow "Blog & Insights", breadcrumbs Home / Blog).
- Featured post (first item): large 2-column card with gradient header from `post.gradient`, "Featured" badge, category badge, big author initials, title, excerpt, meta (date / read time / author), "Read article" button → "#".
- Category filter: All + 7 categories (AI, Technology, Career, Education, Women Empowerment, Success Stories, Research). `useState` + `AnimatePresence` with `mode="popLayout"` for smooth enter/exit + layout reflow. Buttons show item counts.
- Blog grid: remaining posts as cards with gradient top, category badge, meta, hover lift, "Read" link → "#".
- Empty state when a category has no posts.
- Newsletter CTA band with inline email input that POSTs to `/api/newsletter` and shows sonner toast.
- Dates formatted via `toLocaleDateString` to "Jan 12, 2025" style.

### `src/app/contact/page.tsx`
- PageHero (eyebrow "Contact Us", breadcrumbs Home / Contact).
- Two-column layout:
  - Left: contact form (name, email, phone, subject select, message) with client-side validation (required, email regex, message length), aria-invalid styling, error messages, loading state, success toast, form reset on success. Posts to `/api/contact`.
  - Right: contact info cards (email `mailto:`, phone `tel:`, address `#map` link), office hours card, social links row (Twitter/LinkedIn/Instagram/YouTube).
- Stylized "map" placeholder: gradient bg + `grid-pattern`, fake SVG roads in brand colors, animated bouncing gradient pin with ping ring, glass address overlay with `Building2` icon.
- FAQ accordion with 5 Q&As (programs, partnership, volunteering, donations, geographic reach) using shadcn `Accordion`.
- Gradient CTA band linking to `/volunteer` and `/donate` with checklist of benefits.

## Conventions followed
- "use client" at top of every page.
- Brand palette only (blue/purple/green) — no indigo.
- shadcn/ui (Button, Card*, Badge, Input, Textarea, Label, Select, Accordion, Separator).
- Lucide icons throughout.
- Framer Motion via shared `Reveal`, `Stagger`, `StaggerItem` + custom `motion.*` where layout animations are needed.
- Section pattern: `<section className="py-16 sm:py-20 lg:py-24"><div className="container mx-auto px-4">…</div></section>`.
- Responsive mobile-first.
- All toasts via `sonner` (already mounted in root layout).
- No external image URLs — gradients, initials, and inline SVG only.

## Files touched (created only)
- `src/app/partners/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/contact/page.tsx`

No shared components, `globals.css`, `data.ts`, or `layout.tsx` were modified.
