# Task 5d — Volunteer & Donate pages

**Agent:** full-stack-developer
**Task:** Built Volunteer and Donate pages with interactive forms and donation impact calculator.

## Work Log

1. Read `/home/z/my-project/worklog.md` to understand prior work (About, Programs, SDGs, Impact, Events, Stories, Gallery, Partners, Blog, Contact pages already built by agents 5a–5c).
2. Read `src/lib/data.ts` and confirmed exact shapes of `volunteerRoles` (4 items), `volunteerFaqs` (5), `donationTiers` (4), `donationImpact` (5 ascending tiers), and `impactMetrics` (8).
3. Read shared components without modifying them: `PageHero`, `SectionHeading`, `Reveal`/`Stagger`/`StaggerItem`/`FadeIn`, `AnimatedCounter`, `NodeNetwork`.
4. Read `globals.css` for the brand utility classes (`bg-gradient-brand`, `text-gradient-brand`, `bg-gradient-brand-soft`, `grid-pattern`, `dot-pattern`, `glass`, `shadow-soft`, `shadow-glow-*`).
5. Read the existing `/api/volunteer` and `/api/donate` route handlers to confirm payload shapes and response formats (`{ ok }` for volunteer; `{ ok, reference }` for donate).
6. Read shadcn primitives (`select`, `accordion`, `radio-group`, `slider`, `progress`, `checkbox`) to confirm exact prop APIs.
7. Verified existing stubs of `src/app/volunteer/page.tsx` and `src/app/donate/page.tsx` had a parse error at `donate/page.tsx:480`; rebuilt both from scratch.
8. Wrote `src/app/volunteer/page.tsx` — PageHero, 4 benefit cards, 4 role cards with Apply buttons that pre-select the role, volunteer impact stats strip (reused impactMetrics), application form posting to `/api/volunteer`, FAQ accordion (5 items), CTA to /donate.
9. Wrote `src/app/donate/page.tsx` — PageHero, donation impact calculator with Slider + AnimatePresence impact text + students-reached dot visual, 4 donation tier cards (clickable, selected state), donation form posting to `/api/donate` with success state showing returned reference, payment details panel with copy buttons, transparency section with trust badges + animated funds-allocation bar, impact stats with AnimatedCounter, CTA to /volunteer.
10. Ran `bun run lint` — clean (0 errors, 0 warnings). Verified `GET /volunteer` → 200 and `GET /donate` → 200 via curl.
11. Appended entry to `/home/z/my-project/worklog.md`.

## Stage Summary

- **Files created:**
  - `src/app/volunteer/page.tsx`
  - `src/app/donate/page.tsx`
- **Key decisions:**
  - Single `amount` state shared across slider, preset chips, tier cards and the form amount Input — keeps the calculator, tiers and form perfectly in sync.
  - `getImpactTier()` walks `donationImpact` (already ascending) and returns the highest tier whose `amount ≤ value`, powering both the calculator readout and the tier-selection toast.
  - Volunteer "Apply for this role" sets `form.role` via state + smooth-scrolls to `#apply` — no router navigation needed.
  - Donate success state replaces the form (AnimatePresence `mode="wait"`) with a reference card + CTA buttons because the reference number is the primary confirmation artifact.
  - Reused `impactMetrics` values (volunteers/students/hours for volunteer page; students/women/placement for donate page) — no invented numbers.
  - Funds-allocation bar uses a `motion.div` width animation whileInView (92% programs green→blue gradient vs 8% operations) rather than the shadcn Progress component so it can be styled with a brand gradient + legend.
  - `CopyButton` uses `navigator.clipboard.writeText` + sonner toast with the copied value as description; degrades gracefully with an error toast on failure.
  - Brand blue/purple/green palette only — no indigo. All visuals are gradients, SVG, initials, or animated dots (no external image URLs).
