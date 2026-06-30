# Task 5a — Built About, Programs, and SDGs pages

**Agent:** full-stack-developer
**Task:** Built About, Programs, and SDGs pages for Atom Foundation website.
**Status:** ✅ Complete — all 3 pages compile, serve HTTP 200, and pass `bun run lint` with zero errors.

---

## Work Log

1. Ran the fullstack init script (`curl https://z-cdn.chatglm.cn/fullstack/init-fullstack_1775040338514.sh | bash`) to bring up the dev environment: `bun install`, `prisma db push`, and the Next.js dev server on port 3000.
2. Read `worklog.md`, `src/lib/data.ts` (all 742 lines), the shared components (`page-hero.tsx`, `section-heading.tsx`, `reveal.tsx`, `animated-counter.tsx`, `svg-decorations.tsx`), and `globals.css` to lock in the design tokens.
3. Created directories `src/app/about`, `src/app/programs`, `src/app/sdgs` (already existed from prior 5a pass) and rebuilt each page file fresh from scratch.

### `src/app/about/page.tsx` (≈640 lines, "use client")
- **PageHero**: eyebrow `About Atom Foundation`, gradient title `We exist to make future-ready skills accessible to everyone`, `site.mission` as description, Home/About breadcrumbs, Explore Programs + Meet the Team buttons.
- **Our Story**: two-column. Left = founding narrative referencing `site.founded`. Right = decorative Card with `AtomOrbits` + `FloatingParticles` overlay on a `bg-gradient-brand-soft` panel, plus a 3-column `CardContent` strip with `AnimatedCounter` for Students Trained / Women Empowered / Schools Reached (pulled from `impactMetrics[0..2]`).
- **Mission & Vision**: two cards on `bg-gradient-brand-soft`. Mission card uses `Target` icon + blue border + `shadow-glow-blue` on hover. Vision card uses `Eye` icon + purple border + `shadow-glow-purple` on hover. Both render `site.mission` / `site.vision`.
- **Core Values**: 6-card stagger grid using `coreValues` data. Each card has a color-coded icon tile (`bg-brand-{color}/10`), title, description, and a hover-lift + scale effect.
- **Founder Message**: quote card with `team[0]` (Dr. Anand Iyer). Gradient initials avatar + Sparkles badge, large italic quote with `text-gradient-brand` highlight, signature + `site.founded` watermark.
- **Team Members (id="team")**: 6-card grid using `team` data. Gradient initials avatars, name, color-coded role, bio, hover lift, and a bottom accent line that grows on hover (using a static `colorBgSolid` map).
- **Advisory Board**: 4-card centered grid using `advisors` data. `bg-gradient-brand` circular avatars with initials, name, role, org.
- **Annual Reports / Transparency (id="reports")**: 4-stat transparency strip (92% funds to programs, 80G & 12A approved, audited annually, public disclosure) on `bg-gradient-brand-soft` background + 3 downloadable-style report cards (Annual Report 2024/2023/2022) with `FileText` icon, year Badge, page/size meta, and a "Download PDF" Button linking to "#".
- **CTA**: gradient band with `NodeNetwork` decoration + Partner / Volunteer / Donate buttons.

### `src/app/programs/page.tsx` (≈470 lines, "use client")
- **PageHero**: eyebrow `Our Programs`, gradient title `Programs that build future-ready careers`, description, Home/Programs breadcrumbs, plus per-program quick-jump chips linking to `#ai`, `#software`, `#career`, `#women`, `#school`.
- **Intro**: two-column. Left = `SectionHeading` (eyebrow `What we teach`) + 3 quick stats (Programs / Avg placement / Cohorts per year). Right = "How to choose your program" helper Card with 4 numbered anchor links matching each program's id.
- **5 Program sections**: rendered by `programs.map(...)`, each with:
  - `id` anchor matching `program.id` (e.g. `id="ai"`) + `scroll-mt-24` so `/programs#ai` deep links resolve.
  - Two-column layout with `reversed` boolean (idx % 2 === 1) for visual rhythm.
  - Left = large color-coded icon block (`bg-gradient-to-br` with brand tokens), Program `<ID>` badge, title, italic tagline, description, 3 `MetaPill` badges (duration via `Clock`, level via `BarChart3`, audience via `Users`), Enroll Now (`/contact`) + Talk to us (`/volunteer`) buttons.
  - Right = `Card` with header bar tinted using `bg-brand-{color}/10`, modules list (icon + name + description, staggered), separator, outcomes list (animated spring checkmark pills using `bg-gradient-to-br`).
  - Subtle per-program gradient background using `sectionBg[program.color]`.
- **Closing CTA**: "Not sure which program is right for you?" pointing to `/contact` + `/volunteer`, mentioning the AI assistant chatbot in the corner, plus a 3-feature helper grid (Try the AI assistant / Talk to a mentor / Scholarships available).
- Extracted a `MetaPill` subcomponent so the duration/level/audience badges stay DRY.

### `src/app/sdgs/page.tsx` (≈370 lines, "use client")
- **PageHero**: eyebrow `Sustainable Development Goals`, gradient title `Our commitment to the UN Global Goals`, SDG alignment description, Home/SDGs breadcrumbs, Partner With Us (`/partners`) + Explore the 6 Goals (`#goals`) buttons.
- **Intro**: two-column. Left = `SectionHeading` + SDG alignment narrative mapping our programs to Goals 4/5/8/9/10/17 + SDG chip legend. Right = `NodeNetwork` decoration Card with `FloatingParticles` and "6 goals, one ecosystem" header.
- **6 SDG cards (id="goals")**: 3-col desktop / 1-col mobile, staggered. Each card uses `style={{ backgroundColor: sdg.color }}` for the official UN SDG color on the header bar (since those colors fall outside our brand palette), with a number tile + spring-animated Lucide icon. Body has title, contribution paragraph, highlights as checkmark bullets colored with `sdg.color`. Hover effect: lift + bottom accent line grow.
- **Impact strip**: 6 metrics reused from `impactMetrics` subset (Students Trained, Women Empowered, Schools Reached, Active Volunteers, Partner Organizations, Districts Covered) with `AnimatedCounter`.
- **CTA**: gradient band "Partner with us to advance the Global Goals" with Partner (`/partners`) + Donate to the Goals (`/donate`) buttons.

## Stage Summary

### Files created
- `src/app/about/page.tsx`
- `src/app/programs/page.tsx`
- `src/app/sdgs/page.tsx`
- `agent-ctx/5a-full-stack-developer.md` (this record)

### Key decisions
- All three pages are `"use client"` because they rely on framer-motion, `AnimatedCounter`, and the scroll-reveal wrappers (`Reveal`/`Stagger`/`StaggerItem`/`FadeIn`).
- Reusable color-mapping objects per page (`colorText`, `colorBgSoft`, `colorBgSofter`, `colorBorder`, `colorBgGradient`, `colorBadgeClass`, `colorBgSolid`, `colorGlow`, `avatarGradient`) map the data's `"blue" | "purple" | "green"` to Tailwind brand tokens — keeping cards consistent and theme-aware (light/dark). Critically, no dynamic class string concatenation (`bg-brand-${color}`) is used, because Tailwind 4's JIT would purge those classes.
- About page reuses `impactMetrics[0..2]` for the Our-Story stats card and reports-section transparency strip rather than duplicating numbers — single source of truth in `data.ts`.
- Programs page alternates left/right via a `reversed` boolean prop on `ProgramSection` (idx % 2 === 1) for visual rhythm, and renders every program from the data array — no hardcoding. `MetaPill` extracted as a subcomponent so duration/level/audience badges stay DRY.
- SDG cards use inline `style={{ backgroundColor: sdg.color }}` for the UN official SDG colors (which fall outside our brand palette) while the rest of each card stays on-brand.
- Anchors (`id="team"`, `id="reports"`, `id="ai"`, `id="software"`, `id="career"`, `id="women"`, `id="school"`, `id="goals"`) + `scroll-mt-24` match the navbar/footer deep-link expectations so `/programs#ai`, `/about#team` etc. resolve correctly.
- All buttons use Next.js `<Link>` via `Button asChild`; the "Download PDF" buttons intentionally link to `"#"` as the task spec calls them downloadable-style placeholders.

### Verification
- `curl` tested all routes and anchors: `/about`, `/programs`, `/sdgs`, `/programs#ai`, `/programs#software`, `/programs#career`, `/programs#women`, `/programs#school`, `/sdgs#goals`, `/about#team`, `/about#reports` — all returned HTTP 200.
- `bun run lint` exits 0 with zero errors across the repo.
- `dev.log` shows clean `✓ Compiled` lines for all 3 routes; no runtime errors.
