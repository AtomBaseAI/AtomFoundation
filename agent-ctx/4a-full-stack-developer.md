# Task 4a — Integrate SVG illustrations into About, Programs, and SDGs pages

**Agent:** full-stack-developer
**Task ID:** 4a
**Status:** Complete — lint clean, all 3 pages return HTTP 200, all illustrations verified in rendered HTML.

## Context reviewed
- `/home/z/my-project/worklog.md` (project history + SVG-LIB entry listing all available illustration exports).
- `src/components/site/svg-illustrations.tsx` (16 illustrations + `programIllustrations` map; viewBoxes confirmed: HeroCommunity=400x320, Certificate=240x200, IndiaReachMap=220x200, ImpactIllustration=260x200, program illustrations=240x200).
- `src/components/site/svg-logos.tsx` (`AvatarSvg` renders an 80x80 circle SVG with person silhouette + initials; `cn("h-full w-full", className)` so tailwind-merge strips the `h-full w-full` when a concrete size is passed — verified in rendered HTML).
- The 3 target pages + `src/lib/data.ts` (team `initials`/`color`, advisors `initials`, programs `id`/`color`).

## Changes

### `src/app/about/page.tsx`
1. **Imports:** added `HeroCommunityIllustration`, `CertificateIllustration` from `@/components/site/svg-illustrations` and `AvatarSvg` from `@/components/site/svg-logos`.
2. **Our Story section:** kept the `AtomOrbits` aspect-square card and the 3-column stats `CardContent`; added a `HeroCommunityIllustration` (h-28) in a bordered, soft-gradient footer strip *inside* the same Card (below the stats). The card now reads: orbits visual → stats → community illustration.
3. **Founder Message:** replaced the `grid h-20 w-20 rounded-2xl bg-gradient-to-br` initials div with `<AvatarSvg initials={founder.initials} variant="blue" className="h-20 w-20 shadow-glow-blue" />`. Preserved the Sparkles badge overlay and all surrounding quote/signature markup.
4. **Team Members (id="team"):** replaced each `grid h-14 w-14 rounded-xl bg-gradient-to-br` initials div with `<AvatarSvg initials={member.initials} variant={member.color} className="h-14 w-14 rounded-xl" />`. `member.color` ("blue"|"purple"|"green") maps directly to the AvatarSvg variant union. Wrapped in a div that keeps the `group-hover:scale-105` transition. Same sizing (h-14 w-14) preserved.
5. **Advisory Board:** replaced each `grid h-16 w-16 rounded-full bg-gradient-brand` initials div with `<AvatarSvg initials={adv.initials} variant="brand" className="h-16 w-16 shadow-glow-blue" />`. Same sizing (h-16 w-16) preserved.
6. **Annual Reports (id="reports"):** inserted a new `<Reveal>` "Audited & Verified" trust banner between the transparency stats strip and the report cards. The banner is a flex (stacks on mobile, row on sm+) containing a `CertificateIllustration` (h-32, max-w-200px) on one side and a ShieldCheck-titled paragraph on the other. Existing report cards, transparency stats, and "Request it from our team" link are untouched.

### `src/app/programs/page.tsx`
1. **Imports:** added `HeroCommunityIllustration`, `programIllustrations` from `@/components/site/svg-illustrations`.
2. **`ProgramSection` component:** resolved `const ProgramIllustration = programIllustrations[program.id]` at the top of the function. Between the icon+title block and the description, added a new bordered illustration card (`colorBorder[program.color]` + `colorBgSoft[program.color]`) containing `<ProgramIllustration className="h-44 w-full" />` (guarded with `ProgramIllustration && `). Each of the 5 programs (ai/software/career/women/school) now shows its themed illustration as a prominent ~176px visual right under the title/tagline. All anchors (#ai, #software, etc.), modules, outcomes, meta pills, and CTAs are untouched.
3. **Closing CTA:** added `<HeroCommunityIllustration className="mx-auto mb-6 h-32 w-full max-w-sm" />` at the top of the centered max-w-3xl block, above the "Need help deciding?" eyebrow. All existing copy, buttons, and the 3-feature helper grid are untouched.

### `src/app/sdgs/page.tsx`
1. **Imports:** added `IndiaReachMap`, `ImpactIllustration` from `@/components/site/svg-illustrations`.
2. **Intro section:** kept the existing NodeNetwork card intact. Wrapped the right column's inner div in `space-y-4` and added a second smaller Card below it titled "India reach — 32 districts and growing" with a `IndiaReachMap` (h-32) and a caption. The Globe2 icon (already imported) accents the card header. Doesn't overcrowd — the two cards stack vertically on the right while the left column keeps its narrative + SDG chip legend.
3. **Impact strip:** replaced the plain centered `<FadeIn>` "See all metrics →" paragraph with a flex (stacks on mobile, row on sm+) Card containing an `ImpactIllustration` (h-16 w-16) alongside the existing "Want the full impact dashboard? See all metrics →" link. The 6-up AnimatedCounter grid, SectionHeading, and SDG cards are untouched (color-coded design preserved).

## Verification
- `bun run lint` — clean (0 errors, 0 warnings).
- `curl` checks: `/about` 200, `/programs` 200, `/sdgs` 200, plus deep links `#team`, `#reports`, `#ai`, `#goals` all 200.
- Rendered-HTML grep confirms:
  - About: 11× AvatarSvg (viewBox 80x80), 1× HeroCommunityIllustration (400x320), 1× CertificateIllustration (240x200), plus existing AtomOrbits + NodeNetwork.
  - Programs: 5× program illustrations (viewBox 240x200), 1× HeroCommunityIllustration (400x320).
  - SDGs: 1× IndiaReachMap (220x200), 1× ImpactIllustration (260x200), plus existing NodeNetwork.
- tailwind-merge verified stripping `h-full w-full` when concrete sizes passed to AvatarSvg (founder=h-20 w-20, team=h-14 w-14, advisors=h-16 w-16 all render at correct sizes).

## Notes
- Did NOT modify svg-illustrations.tsx, svg-logos.tsx, globals.css, layout, data.ts, or any other page.
- Did NOT remove any existing content, animations, anchors, or layout structure.
- Brand palette (blue/purple/green) preserved — no indigo. AvatarSvg `variant` prop maps cleanly to the existing `color` field on TeamMember.
- The previously-defined `avatarGradient` map in about/page.tsx is now unused (its only two consumers — founder + team avatars — were replaced). Left in place to match the existing pre-existing pattern of unused `colorGlow` map; lint config does not flag unused vars (verified — `bun run lint` clean).
