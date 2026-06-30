# Atom Foundation Website - Work Log

Project: Multi-page Next.js website for Atom Foundation (non-profit / education / social impact).

Shared conventions:
- Fonts: Poppins (headings, `--font-poppins`) + Inter (body, `--font-inter`)
- Brand colors: blue (`--brand-blue`), purple (`--brand-purple`), green (`--brand-green`)
- Multi-page App Router. Routes under `src/app/(site)/<page>/page.tsx`
- Framer Motion for animations; reusable wrappers in `src/components/motion/`
- Shared data in `src/lib/data.ts`
- Prisma models for volunteer/contact/donation/newsletter submissions
- Sticky footer with `min-h-screen flex flex-col` root + `mt-auto` footer

---
Task ID: 5c
Agent: full-stack-developer
Task: Built Partners, Blog, and Contact pages.

Work Log:
- Read worklog, data.ts, shared components (PageHero, SectionHeading, Reveal/Stagger/StaggerItem, svg-decorations), and globals.css to align with established design conventions.
- Created /partners page: PageHero, 5 partner-type cards (CSR/Educational/NGO/Government/Technology) with icon + live counts, 12-partner grid with gradient logo placeholders + type badges, marquee row using animate-marquee CSS (duplicated list), 3-column "Why partner" benefits, gradient "Become a Partner" CTA band with inquiry form posting to /api/contact (subject="Partnership Inquiry — {type}") and sonner toast, and 3 testimonial quote cards.
- Created /blog page: PageHero, featured post (large gradient header + meta + Read article button), category filter (All + 7 categories) using useState + AnimatePresence layout animations with smooth enter/exit, responsive blog card grid with gradient top + category badge + meta + hover lift, empty-state, and newsletter CTA inline email form POSTing to /api/newsletter with sonner toast. Dates formatted as "Jan 12, 2025".
- Created /contact page: PageHero, two-column layout (contact form with react state validation + shadcn Input/Textarea/Label/Select on the left; contact info cards with mailto/tel links + office hours + social links row on the right), stylized "map" placeholder with grid-pattern bg, fake SVG roads, animated bouncing gradient pin with ping ring, address glass overlay, FAQ accordion (5 Q&As) using shadcn Accordion, and gradient CTA band linking to /volunteer and /donate.
- All pages: "use client", brand blue/purple/green palette (no indigo), responsive mobile-first, Framer Motion via Reveal/Stagger + custom motion, accessible labels/aria attributes, no external image URLs.

Stage Summary:
- Files created:
  - src/app/partners/page.tsx
  - src/app/blog/page.tsx
  - src/app/contact/page.tsx
- Key decisions:
  - Partner inquiry & contact forms both POST to existing /api/contact route; partner form shapes payload so subject carries "Partnership Inquiry — {type}".
  - Blog uses post.gradient directly (e.g. "from-blue-500 to-purple-500") as the data field already encodes a brand-ish gradient per post.
  - Map is a pure CSS/SVG placeholder (no third-party embed) per the no-external-resource rule; pin uses Framer Motion bounce + ping ring.
  - Category filter uses AnimatePresence with mode="popLayout" for smooth reflow when switching categories.
  - All toasts via sonner (already wired in root layout); loading spinners via Loader2.

---
Task ID: 5a
Agent: full-stack-developer
Task: Built About, Programs, and SDGs pages for Atom Foundation website.

Work Log:
- Read worklog.md, src/lib/data.ts, shared components (PageHero, SectionHeading, reveal.tsx, animated-counter.tsx, svg-decorations.tsx) and globals.css to understand the conventions and the exact exported APIs.
- Verified the root layout (SiteNavbar + SiteFooter + ChatbotWidget are already wired) and confirmed the nav config points to /about, /programs, /sdgs and the #team, #reports, /programs#ai, etc. anchors I needed to honor.
- Created directories: src/app/about, src/app/programs, src/app/sdgs and /agent-ctx.
- Built src/app/about/page.tsx — PageHero (eyebrow + mission description + Home/About breadcrumbs + Enroll/Meet-team buttons); Our Story two-column (founding narrative + AtomOrbits + FloatingParticles card with 3 AnimatedCounter stats from impactMetrics); Mission & Vision two-card grid (Target + Sparkles icons, hover lift + glow); Core Values 6-card stagger grid (color-coded icons, hover lift); Founder Message quote card (team[0] initials gradient avatar, large quote with gradient highlight, signature feel); Team Members (id="team") 6-card grid with hover lift; Advisory Board 4-card grid centered with gradient avatars; Annual Reports (id="reports") with transparency stats strip (92% funds to programs, 80G/12A, audited yearly, public disclosure) + 3 downloadable-style report cards (FileText icon, year badge, Download PDF button linking to "#"); gradient CTA band with NodeNetwork decoration and Partner/Volunteer/Donate buttons.
- Built src/app/programs/page.tsx — PageHero (eyebrow + description + quick-jump chips per program); intro two-column (SectionHeading + 3 quick stats + "How to choose your program" helper card with anchor links); 5 program detail sections rendered by mapping over programs data, each with id anchor (id="ai" etc.) for /programs#ai nav links, alternating left/right layout (reversed prop on odd index), color-coded icon block, title, tagline, description, duration/level/audience badges, Enroll Now (/contact) + Talk to us (/volunteer) buttons, and a right-side Card containing modules list (icon + name + description, staggered) and outcomes list (animated spring checkmarks); closing "Not sure which program is right for you?" CTA pointing to /contact + /volunteer and mentioning the AI assistant chatbot, with a 3-feature helper grid.
- Built src/app/sdgs/page.tsx — PageHero (eyebrow + UN Global Goals title + SDG alignment description + Partner/Explore buttons); intro two-column (SDG alignment narrative + NodeNetwork decoration card with FloatingParticles); 6 SDG cards (3-col desktop / 1-col mobile, staggered) each with colored header bar using inline backgroundColor from sdg.color, big SDG number, title, spring-animated icon, contribution paragraph, highlights as checkmark bullets colored with sdg.color, hover lift + bottom accent line grow; impact strip with 6 AnimatedCounter metrics reused from impactMetrics subset; gradient CTA "Partner with us to advance the Global Goals" with Partner (/partners) + Donate (/donate) buttons.
- Used only the shared data (site, programs, sdgs, team, advisors, coreValues, impactMetrics) — did not invent new content beyond report metadata (years/sizes) and transparency captions that the task explicitly asked for. No external image URLs — all avatars are gradient circles with initials.
- Honored brand palette only (blue/purple/green); no indigo. Used shared Reveal/Stagger/StaggerItem/FadeIn/AnimatedCounter/AtomOrbits/NodeNetwork/FloatingParticles/PageHero/SectionHeading components without modifying them.

Stage Summary:
- Files created: src/app/about/page.tsx, src/app/programs/page.tsx, src/app/sdgs/page.tsx, agent-ctx/5a-full-stack-developer.md (this record)
- Key decisions:
  * All three pages are "use client" because they rely on framer-motion, AnimatedCounter and scroll-reveal wrappers.
  * Reusable color-mapping objects (colorText/colorBgSoft/colorBorder/colorBgGradient/colorBadgeClass) per page map the data's "blue"|"purple"|"green" to Tailwind brand tokens, keeping cards consistent and theme-aware (light/dark).
  * About page reuses impactMetrics[0..2] for the founder-card stats and reports section instead of duplicating numbers.
  * Programs page alternates left/right via a `reversed` boolean prop on ProgramSection for visual rhythm and renders every program from the data array (no hardcoding).
  * SDG cards use inline `style={{ backgroundColor: sdg.color }}` for the UN official SDG colors (which are not part of our brand palette) while the rest of each card stays on-brand.
  * Anchors (id="team", id="reports", id="ai", id="software", id="career", id="women", id="school", id="goals") match the navbar/footer links in src/lib/nav.ts so deep links resolve correctly.
  * All buttons use Next.js <Link> via Button asChild; external report "downloads" are intentionally href="#" placeholders per the task spec.

---
Task ID: 5b
Agent: full-stack-developer
Task: Built Impact, Events, Stories, and Gallery pages.

Work Log:
- Read worklog, data.ts, shared components (page-hero, section-heading, reveal, animated-counter, svg-decorations) and globals.css to align with established conventions.
- Created src/app/impact/page.tsx: PageHero + 8-metric stagger grid with AnimatedCounter; recharts BarChart (Cell-colored bars), AreaChart (multi-series cumulative growth), PieChart (donut) wrapped in Tabs (Reach / Growth / Demographics); stylized India SVG map with animated pulsing pins + reach stats; vertical alternating timeline; gallery preview; gradient CTA.
- Created src/app/events/page.tsx: PageHero + Upcoming/Past Tabs filter; event cards with type/mode badges, gradient date badge, seat progress bar, registration button opening Dialog with form (name/email/phone/role) POSTing to /api/event-register + sonner success toast; event type legend; featured Hackathon band; CTA.
- Created src/app/stories/page.tsx: PageHero + featured story banner + stats strip (AnimatedCounter); category filter (All / Student / Women Entrepreneur / Placement / Volunteer) with AnimatePresence layout animations on story cards; before→after mini-section; click-to-expand Story dialog; gradient CTA.
- Created src/app/gallery/page.tsx: PageHero + stats strip; category filter (All / Events / Training Sessions / Certificates / Community Outreach / Videos); masonry-style grid using auto-rows + col-span-2/row-span-2 for span:true items; gradient tiles with play/zoom hover icons; Lightbox Dialog with enlarged gradient + metadata; CTA.
- Ran `bun run lint` — single pre-existing error in src/app/donate/page.tsx (not in scope of this task). My 4 page files lint clean.
- Curl-verified /impact, /events, /stories, /gallery all return HTTP 200 with successful compile (see dev.log).

Stage Summary:
- Files created:
  - src/app/impact/page.tsx
  - src/app/events/page.tsx
  - src/app/stories/page.tsx
  - src/app/gallery/page.tsx
- Key decisions:
  - All 4 pages are `"use client"` (interactive: charts, dialogs, filters, AnimatePresence).
  - Recharts wrapped inline in the impact page; brand colors via `var(--brand-blue/purple/green)` CSS variables mapped to chart fills.
  - Custom SVG India map with animated pins replaces a static image (no external image URLs).
  - Event registration reuses existing /api/event-register route (Prisma EventRegistration model).
  - Story/Gallery dialogs use shadcn Dialog with gradient header backgrounds.
  - Strictly brand palette (blue/purple/green) — no indigo. Consistent `bg-gradient-brand` CTA banners across all 4 pages.

---
Task ID: 5d
Agent: full-stack-developer
Task: Built Volunteer and Donate pages with interactive forms and donation impact calculator.

Work Log:
- Read worklog.md, src/lib/data.ts (volunteerRoles, volunteerFaqs, donationTiers, donationImpact, impactMetrics), shared components (PageHero, SectionHeading, Reveal/Stagger/StaggerItem/FadeIn, AnimatedCounter, NodeNetwork), globals.css, existing /api/volunteer + /api/donate routes, and shadcn primitives (select, accordion, radio-group, slider, progress, checkbox) to align with established conventions and exact exported APIs.
- Verified the existing volunteer/donate page stubs had a parsing error in donate (line 480) — both files were rebuilt from scratch to fully satisfy the task spec and to fix the lint failure.
- Built /volunteer page: PageHero (eyebrow + "Give your time, change a future" title with text-gradient-brand span + Home/Volunteer breadcrumbs + Apply Now / Explore Roles scroll buttons); "Why volunteer" 4-benefit card grid (Make Real Impact / Grow Your Skills / Join a Community / Get Certified, color-coded icons + hover lift); Open Roles section (id="roles") rendering all 4 volunteerRoles with icon + commitment Badge + description + "Apply for this role" button that pre-selects the role in the form state and smooth-scrolls to #apply with a sonner info toast; Volunteer Impact stats strip reusing impactMetrics[3] (Active Volunteers 320+), impactMetrics[0] (Students Trained 12,450+), impactMetrics[4] (Training Hours 86,000+) via AnimatedCounter on a grid-pattern bg with brand blobs; Application form (id="apply") in a Card with a 1.5px gradient header bar + sticky left intro column (NodeNetwork decoration, trust bullets), and a 2-column field layout: name/email/phone/location + role Select (volunteerRoles titles + "Other") + availability Select (Weekday evenings / Weekends / Flexible) + skills + motivation Textareas, POSTing to /api/volunteer with Loader2 spinner, sonner success toast on success and full form reset; FAQs section rendering all 5 volunteerFaqs in a shadcn Accordion inside a Card; gradient CTA band "Prefer to donate instead?" linking to /donate + /contact.
- Built /donate page: PageHero (eyebrow + "Your contribution builds future-ready communities" title with text-gradient-brand span + Home/Donate breadcrumbs + Calculate impact / Choose a tier scroll buttons); Donation Impact Calculator (HIGHLIGHT, id="calculator") — shadcn Slider (min 500 / max 100000 / step 500) with a large editable ₹ amount input synced both ways, 5 quick-preset chips (500/1500/5000/15000/50000), an impact readout panel that uses AnimatePresence to animate "Your ₹X donation can <outcome>" via getImpactTier() (highest donationImpact tier ≤ amount), a "students reached = amount/500" visualisation with spring-animated dot grid (capped at 30 + "+N more"), and a Donate button that scrolls to the form; Donation Tiers grid (id="tiers") rendering all 4 donationTiers as clickable color-coded cards with selected state (ring + Selected badge) that set the amount and scroll to form with an info toast; Donation form (id="donate-form") in a Card with gradient header bar showing live amount/frequency summary, fields: name/email/phone/amount (synced with calculator + tiers, also editable), frequency RadioGroup (One-time/Monthly), method RadioGroup (UPI/Bank Transfer/Card) with icons + hints, PAN (optional, uppercased), anonymous Checkbox, message Textarea, a security note with Lock icon, and a submit button showing the live amount; on success the form switches (AnimatePresence) to a success state showing the returned reference (ATOM-…) in a dashed brand-purple card + thank-you message + "80G receipt will be emailed" note + "Make another donation" + "Volunteer instead" buttons; Payment details panel (right column) with UPI ID (atomfoundation@upi) and bank details (Account Name: Atom Foundation, A/C: XXXXXXXXXX1234, IFSC: HDFC0001234, Bank: HDFC) each with its own CopyButton (navigator.clipboard + sonner toast), plus a small trust mini-card; Transparency section (id="trust") with 4 trust-badge cards (80G & 12A approved / Audited annually / 92% to programs / Reg. under Societies Act) and an animated funds-allocation bar (92% programs green→blue gradient vs 8% operations) using motion.div width animation whileInView; Impact of donations section reusing impactMetrics[0]/[1]/[5] with AnimatedCounter on a dot-pattern bg + a summary line; gradient CTA band "Can't donate? Volunteer instead." linking to /volunteer + /contact.
- Both pages: "use client", brand blue/purple/green palette only (NO indigo), responsive mobile-first (grid-cols-1 → sm:2 → lg:3/4), Framer Motion via Reveal/Stagger/StaggerItem + custom motion + AnimatePresence, accessible labels/aria on every form field, no external image URLs (all visuals are gradients, SVG, initials, or animated dots), all toasts via sonner (already wired in root layout), all icons from lucide-react.
- Ran `bun run lint` — clean (0 errors, 0 warnings). Verified GET /volunteer → 200 and GET /donate → 200 (compile + render) via curl against the running dev server.

Stage Summary:
- Files created:
  - src/app/volunteer/page.tsx (overwrote stub)
  - src/app/donate/page.tsx (overwrote stub, fixed pre-existing parse error)
- Key decisions:
  * Donation amount is the single source of truth: Slider, preset chips, tier cards, and the form amount Input all read/write the same `amount` state, so the calculator, tiers and form stay perfectly in sync.
  * getImpactTier() walks donationImpact in order and returns the highest tier whose amount ≤ current value (donationImpact is already sorted ascending in data.ts), powering both the calculator readout and the tier selection toast.
  * Volunteer "Apply for this role" buttons set form.role via React state and smooth-scroll to #apply — no router navigation needed since both sections are on the same page.
  * Donate success state replaces the form (AnimatePresence mode="wait") with a reference card and CTA buttons instead of just a toast, because the reference number is the primary confirmation artifact the donor needs.
  * Reused impactMetrics values for the volunteer impact strip (volunteers / students / hours) and donate impact section (students / women / placement %) rather than inventing new numbers — keeps cross-page metrics consistent with /impact and /about.
  * Funds-allocation bar uses a motion.div width animation whileInView instead of the shadcn Progress component so the 92%/8% split can be styled with a brand gradient and a legend.
  * CopyButton uses navigator.clipboard.writeText + sonner toast with the copied value as description; degrades gracefully on failure with an error toast.

---
Task ID: 5a
Agent: full-stack-developer
Task: Built About, Programs, and SDGs pages for Atom Foundation website.

Work Log:
- Ran the fullstack init script to spin up the dev environment (bun install + prisma db push + Next.js dev server on :3000).
- Read worklog.md to understand prior context (Tasks 5a/5b/5c all referenced), src/lib/data.ts in full, and the shared components (PageHero, SectionHeading, reveal.tsx, animated-counter.tsx, svg-decorations.tsx) and globals.css to lock in the brand tokens (text-brand-blue/purple/green, bg-gradient-brand, bg-gradient-brand-soft, grid-pattern, dot-pattern, glass, shadow-soft, shadow-glow-blue/purple).
- Created directories src/app/about, src/app/programs, src/app/sdgs (already existed from prior 5a pass — kept in place) and rebuilt each page file fresh.
- Wrote src/app/about/page.tsx (≈640 lines, "use client"): PageHero (eyebrow "About Atom Foundation" + gradient title + site.mission description + Home/About breadcrumbs + Explore Programs / Meet the Team buttons); Our Story two-column (founding narrative using site.founded + AtomOrbits card with FloatingParticles overlay + 3 AnimatedCounter stats pulled from impactMetrics[0..2]); Mission & Vision two-card grid (Target icon for Mission, Eye icon for Vision, blue/purple color-coded borders + hover glow); Core Values 6-card stagger grid (color-coded icons, hover lift + scale); Founder Message quote card (team[0] initials gradient avatar with Sparkles badge, large italic quote with text-gradient-brand highlight, founder name + role + site.founded watermark); Team Members (id="team") 6-card grid with gradient initials avatars + role color text + bio + hover lift + bottom accent line grow; Advisory Board 4-card grid centered with bg-gradient-brand avatars; Annual Reports / Transparency (id="reports") with 4-stat transparency strip (92% funds to programs, 80G/12A, audited yearly, public disclosure) + 3 downloadable-style report cards (FileText icon, year Badge, page/size meta, "Download PDF" Button linking to "#"); gradient CTA band with NodeNetwork decoration and Partner/Volunteer/Donate buttons. Added a static colorBgSolid map to avoid the dynamic `bg-brand-${color}` Tailwind pitfall.
- Wrote src/app/programs/page.tsx (≈470 lines, "use client"): PageHero (eyebrow "Our Programs" + gradient title + description + Home/Programs breadcrumbs + per-program quick-jump chips linking to #ai/#software/#career/#women/#school); intro two-column (SectionHeading + 3 quick stats + "How to choose your program" helper Card with 4 numbered anchor links); 5 ProgramSection blocks rendered by mapping over programs array — each with id anchor (id="ai" etc. matching program.id), alternating left/right layout via `reversed` boolean (idx % 2 === 1), color-coded icon block (bg-gradient-to-br with brand tokens), title, italic tagline, description, 3 MetaPill badges (duration/level/audience using Clock/BarChart3/Users icons), Enroll Now (→/contact) + Talk to us (→/volunteer) buttons, right-side Card with modules list (icon + name + description, staggered) and outcomes list (animated spring checkmark pills); closing "Not sure which program is right for you?" CTA pointing to /contact + /volunteer, mentioning the AI assistant chatbot, with a 3-feature helper grid (Bot/Users/CheckCircle2). Extracted a MetaPill subcomponent for the duration/level/audience badges to keep the JSX readable.
- Wrote src/app/sdgs/page.tsx (≈370 lines, "use client"): PageHero (eyebrow "Sustainable Development Goals" + "UN Global Goals" gradient title + SDG alignment description + Home/SDGs breadcrumbs + Partner With Us / Explore the 6 Goals buttons); intro two-column (SDG alignment narrative mapping our programs to Goals 4/5/8/9/10/17 + NodeNetwork decoration Card with FloatingParticles and "6 goals, one ecosystem" header + SDG chip legend); 6 SDG cards (3-col desktop / 1-col mobile, staggered) each with colored header bar using inline `style={{ backgroundColor: sdg.color }}` for the official UN SDG color, big SDG number tile + spring-animated Lucide icon, title, contribution paragraph, highlights as checkmark bullets colored with sdg.color, hover lift + bottom accent line grow; impact strip with 6 AnimatedCounter metrics reused from impactMetrics subset (Students Trained, Women Empowered, Schools Reached, Active Volunteers, Partner Organizations, Districts Covered); gradient CTA "Partner with us to advance the Global Goals" with Partner (/partners) + Donate (/donate) buttons.
- Used only the shared data (site, programs, sdgs, team, advisors, coreValues, impactMetrics) — no invented content beyond the report metadata (years 2024/2023/2022, page counts, file sizes) and transparency captions the task spec explicitly asked for. No external image URLs — every avatar is a gradient circle with initials.
- Honored the brand palette only (blue/purple/green); no indigo. Reused shared PageHero/SectionHeading/Reveal/Stagger/StaggerItem/FadeIn/AnimatedCounter/AtomOrbits/NodeNetwork/FloatingParticles components verbatim — did NOT edit any shared files, layout.tsx, globals.css, or data.ts.
- Verified the rebuild end-to-end: curl-tested /about, /programs, /sdgs plus all deep-link anchors (#ai, #software, #career, #women, #school, #goals, #team, #reports) — every one returned HTTP 200. `bun run lint` exits 0 with zero errors across the repo.

Stage Summary:
- Files created:
  - src/app/about/page.tsx
  - src/app/programs/page.tsx
  - src/app/sdgs/page.tsx
  - agent-ctx/5a-full-stack-developer.md (this record, overwritten)
- Key decisions:
  * All three pages are "use client" because they rely on framer-motion, AnimatedCounter and the scroll-reveal wrappers (Reveal/Stagger/StaggerItem/FadeIn).
  * Reusable color-mapping objects (colorText/colorBgSoft/colorBgSofter/colorBorder/colorBgGradient/colorBadgeClass/colorBgSolid/colorGlow/avatarGradient) per page map the data's "blue"|"purple"|"green" to Tailwind brand tokens, keeping cards consistent and theme-aware (light/dark) without any dynamic class string concatenation (which Tailwind 4's JIT would purge).
  * About page reuses impactMetrics[0..2] for the Our-Story stats card and reports-section transparency strip rather than duplicating numbers — single source of truth in data.ts.
  * Programs page alternates left/right via a `reversed` boolean prop on ProgramSection (idx % 2 === 1) for visual rhythm, and renders every program from the data array — no hardcoding. MetaPill extracted as a subcomponent so duration/level/audience badges stay DRY.
  * SDG cards use inline `style={{ backgroundColor: sdg.color }}` for the UN official SDG colors (which fall outside our brand palette) while the rest of each card stays on-brand — same approach as the existing partner implementation.
  * Anchors (id="team", id="reports", id="ai", id="software", id="career", id="women", id="school", id="goals") + scroll-mt-24 match the navbar/footer deep-link expectations so /programs#ai, /about#team etc. resolve correctly.
  * All buttons use Next.js <Link> via Button asChild; the "Download PDF" buttons intentionally link to "#" as the task spec says these are downloadable-style placeholders.

---
Task ID: 4 (Home) + 7 (Verification)
Agent: main (Z.ai Code)
Task: Built the Home page and performed end-to-end self-verification with Agent Browser.

Work Log:
- Built Home page (src/app/page.tsx) with 10 sections: Hero (parallax + AtomOrbits SVG + floating cards + particles), Mission Snapshot, Focus Areas (5 program cards), Impact Metrics (animated counters), Success Stories, SDG Commitment, Upcoming Events, Partners Marquee, Testimonials, Final CTA.
- Fixed AnimatedCounter reliability: replaced useInView/useSpring with a scroll-listener + getBoundingClientRect approach that triggers when element enters OR is scrolled past viewport (handles instant scrolls in headless verification).
- Verified all 13 routes return HTTP 200 with zero console/page errors.
- Verified animated counters (12,450+, 4,200+, 180+, 86,000+, 68%, 45+, 32) animate on scroll.
- Verified AI chatbot: LLM responds with context-aware career guidance (POST /api/chatbot 200).
- Verified contact form submission: success toast + Prisma INSERT logged.
- Verified event registration dialog opens with form.
- Verified gallery lightbox opens on tile click.
- Verified impact dashboard recharts render.
- Verified mobile responsiveness (390px viewport) + mobile menu opens.
- Verified sticky footer pattern (min-h-screen flex flex-col + mt-auto).
- Lint: 0 errors, 0 warnings.

Stage Summary:
- Home page complete with rich Framer Motion animations, SVG decorations (AtomOrbits, GrowthLine, FloatingParticles, NodeNetwork), parallax hero, animated counters, marquee, staggered reveals.
- All 13 pages verified interactive and runnable in browser.
- Full stack working: Prisma (volunteer/contact/donation/newsletter/event-registration models), 6 API routes, LLM-powered chatbot.

---
Task ID: SVG-LIB
Agent: main (Z.ai Code)
Task: Built comprehensive SVG illustrations library for the Atom Foundation website.

Work Log:
- Created src/components/site/svg-illustrations.tsx with 16 themed SVG illustrations:
  1. AIIllustration (neural network + sparkles)
  2. SoftwareIllustration (code editor + brackets)
  3. CareerIllustration (briefcase + trend arrow)
  4. WomenIllustration (figure + growth sun)
  5. SchoolIllustration (graduation cap + books)
  6. HeroCommunityIllustration (community learning scene)
  7. ImpactIllustration (bar chart + trend)
  8. VolunteerIllustration (helping hands + heart)
  9. DonateIllustration (coin stack + rupee)
  10. PartnershipIllustration (handshake nodes)
  11. EmptyIllustration (magnifying glass)
  12. IndiaReachMap (India silhouette + pins)
  13. CertificateIllustration (document + seal)
  14. EventIllustration (calendar + play)
  15. BlogIllustration (notebook + pen)
  16. PlaceholderIllustration (generic)
  + programIllustrations map (id → component)
- Created src/components/site/svg-logos.tsx with:
  - PartnerLogo (6 abstract geometric logo shapes, color-paletted by name hash)
  - AvatarSvg (stylized person silhouette with initials, brand/blue/purple/green variants)
- All illustrations use brand CSS variables (blue/purple/green), Framer Motion animations (draw, scale, float), aria-hidden for decorative ones.
- Lint passes clean.

Stage Summary:
- SVG library ready for integration into all 13 pages.
- Exports: AIIllustration, SoftwareIllustration, CareerIllustration, WomenIllustration, SchoolIllustration, HeroCommunityIllustration, ImpactIllustration, VolunteerIllustration, DonateIllustration, PartnershipIllustration, EmptyIllustration, IndiaReachMap, CertificateIllustration, EventIllustration, BlogIllustration, PlaceholderIllustration, programIllustrations (from svg-illustrations.tsx); PartnerLogo, AvatarSvg (from svg-logos.tsx).

---
Task ID: 4a
Agent: full-stack-developer
Task: Integrated SVG illustrations into About, Programs, and SDGs pages.

Work Log:
- Read worklog.md (project history + SVG-LIB entry), svg-illustrations.tsx (16 illustrations + programIllustrations map), svg-logos.tsx (AvatarSvg + PartnerLogo APIs), the 3 target pages, and data.ts to confirm team/advisor/program shapes and the brand color union ("blue"|"purple"|"green").
- About page: added HeroCommunityIllustration + CertificateIllustration imports from svg-illustrations and AvatarSvg from svg-logos. In Our Story, kept AtomOrbits + stats CardContent and appended a HeroCommunityIllustration (h-28) in a bordered soft-gradient footer strip inside the same Card. Founder avatar replaced with AvatarSvg variant="blue" className="h-20 w-20 shadow-glow-blue" (kept Sparkles badge). Team Members avatars replaced with AvatarSvg variant={member.color} className="h-14 w-14 rounded-xl" (kept group-hover:scale-105 transition wrapper). Advisory Board avatars replaced with AvatarSvg variant="brand" className="h-16 w-16 shadow-glow-blue". Annual Reports: inserted a new Reveal "Audited & Verified" trust banner between the transparency stats strip and the report cards — a flex (col on mobile, row on sm+) with a CertificateIllustration (h-32) + ShieldCheck-titled paragraph. All existing copy, animations, anchors (#team, #reports), and report cards untouched.
- Programs page: added HeroCommunityIllustration + programIllustrations imports. In ProgramSection, resolved const ProgramIllustration = programIllustrations[program.id] at top of function, then inserted a bordered illustration card (colorBorder + colorBgSoft for the program's color) containing <ProgramIllustration className="h-44 w-full" /> between the icon+title block and the description. Each of the 5 programs (ai/software/career/women/school) now shows its themed illustration. Closing CTA: added <HeroCommunityIllustration className="mx-auto mb-6 h-32 w-full max-w-sm" /> above the "Need help deciding?" eyebrow. All anchors (#ai etc.), modules, outcomes, meta pills, buttons, and helper grid untouched.
- SDGs page: added IndiaReachMap + ImpactIllustration imports. Intro section: kept NodeNetwork card intact, wrapped the right column inner div in space-y-4 and added a second smaller "India reach — 32 districts and growing" Card below it with IndiaReachMap (h-32) + caption + Globe2 accent. Impact strip: replaced the plain centered FadeIn "See all metrics →" paragraph with a flex Card containing an ImpactIllustration (h-16 w-16) alongside the existing link. SDG cards and 6-up AnimatedCounter grid untouched (color-coded design preserved).
- Verified via tailwind-merge that passing concrete sizes (h-20 w-20 / h-14 w-14 / h-16 w-16) to AvatarSvg correctly strips the internal h-full w-full — confirmed in rendered HTML.
- Ran `bun run lint` — clean (0 errors, 0 warnings). curl-verified /about, /programs, /sdgs + deep links (#team, #reports, #ai, #goals) all return HTTP 200. Grep-verified SVG viewBoxes in rendered HTML: About has 11× AvatarSvg (80x80) + HeroCommunity (400x320) + Certificate (240x200); Programs has 5× program illustrations (240x200) + HeroCommunity (400x320); SDGs has IndiaReachMap (220x200) + ImpactIllustration (260x200).

Stage Summary:
- Files modified:
  - src/app/about/page.tsx
  - src/app/programs/page.tsx
  - src/app/sdgs/page.tsx
- Illustrations added:
  - About: HeroCommunityIllustration (Our Story card footer), AvatarSvg variant="blue" (founder), AvatarSvg variant={member.color} ×6 (team), AvatarSvg variant="brand" ×4 (advisors), CertificateIllustration (reports trust banner).
  - Programs: programIllustrations[p.id] ×5 (one per program section, color-accented card), HeroCommunityIllustration (closing CTA header).
  - SDGs: IndiaReachMap (intro section, new "India reach" card below NodeNetwork), ImpactIllustration (impact strip, alongside "See all metrics" link).
- Did NOT modify svg-illustrations.tsx, svg-logos.tsx, globals.css, layout, data.ts, or any other page. No existing content/animations/anchors removed. Brand palette preserved (no indigo).

---
Task ID: 4b
Agent: full-stack-developer
Task: Integrated SVG illustrations into Impact, Events, Stories, and Gallery pages.

Work Log:
- Read worklog.md (incl. SVG-LIB entry), src/components/site/svg-illustrations.tsx (all 16 exports + programIllustrations), src/components/site/svg-logos.tsx (PartnerLogo, AvatarSvg), the 4 target page files, and src/lib/data.ts to align with the established design conventions and confirm exact exported APIs.
- Impact page: imported IndiaReachMap + ImpactIllustration from @/components/site/svg-illustrations. Removed the local stylized RegionalReachMap placeholder function (the hand-rolled India silhouette with dotted texture + animated pins) and replaced its <RegionalReachMap /> usage inside the Regional Reach Card with <IndiaReachMap className="h-72 w-full max-w-md mx-auto" /> — keeps the surrounding reach stats, AtomOrbits header, and Card chrome intact. Added an ImpactIllustration side visual (h-24 w-32 rounded-xl, hidden on mobile) next to the "In Pictures" SectionHeading in the gallery preview / videos section header, wrapped with the existing "View full gallery" button in the section's flex row. All recharts, tabs, timeline, and CTA structure untouched. COLORS constant still used by charts so no unused-variable lint error.
- Events page: imported EventIllustration from @/components/site/svg-illustrations. Wrapped the two PageHero CTA buttons in a flex row and added a decorative EventIllustration card (h-24 w-32 rounded-xl, hidden on mobile, sm:block) next to them in the hero children — adds a calendar+play themed visual to the page intro without crowding the title/description. Did not touch the date badge, type badge, tabs, registration dialog, featured hackathon band, or CTA. No filter exists on this page (only Upcoming/Past tabs which always have items), so no empty-state to enhance with EmptyIllustration — skipped per task spec.
- Stories page: imported AvatarSvg from @/components/site/svg-logos and HeroCommunityIllustration + EmptyIllustration from @/components/site/svg-illustrations. Added avatarVariant map: Student→blue, Women Entrepreneur→purple, Placement→green, Volunteer→brand. Replaced all three initials-circle avatars with circular AvatarSvg containers (rounded-full, overflow-hidden, shadow-soft, ring-1/2): StoryCard avatar (h-16 w-16), FeaturedStory banner avatar (h-20 w-20, ring-white/50), and StoryDialog avatar (h-16 w-20 → h-16 w-16, ring-white/50). In the FeaturedStory left visual panel, replaced the small decorative Quote icon with a HeroCommunityIllustration (h-32 w-full max-w-[240px]) as a richer community-scene visual side. Replaced the dashed empty-state text with a centered EmptyIllustration (h-32 w-40) + caption when a category filter has no stories. Quote import still used by StoryCard + StoryDialog so no unused import. AnimatePresence, before/after, filter pills, and StoryDialog structure untouched.
- Gallery page: imported HeroCommunityIllustration + EmptyIllustration from @/components/site/svg-illustrations. Added a HeroCommunityIllustration side visual (h-24 w-32 rounded-xl, hidden on mobile) next to the "Browse" SectionHeading in the gallery section header — thematically matches the "A picture of community" title. Replaced the dashed empty-state text with a centered EmptyIllustration (h-32 w-40) + caption when a category filter has no items. Chose the simpler/safer "one intro illustration" approach over per-tile overlays to avoid crowding the gradient tiles and clashing with the existing dot-pattern + play/zoom hover icon. Masonry grid, lightbox Dialog, category filter pills, stats strip, and CTA all untouched.
- Ran `bun run lint` — clean (0 errors, 0 warnings). Curl-verified /impact, /events, /stories, /gallery all return HTTP 200 with successful compile (dev.log confirms compile times).

Stage Summary:
- Files modified:
  - src/app/impact/page.tsx
  - src/app/events/page.tsx
  - src/app/stories/page.tsx
  - src/app/gallery/page.tsx
- Illustrations added:
  - Impact: IndiaReachMap (replacing stylized map placeholder in Regional Reach Card, h-72 w-full max-w-md mx-auto); ImpactIllustration (side visual in "In Pictures" gallery preview section header, h-24 w-32).
  - Events: EventIllustration (decorative side visual in PageHero children next to CTA buttons, h-24 w-32).
  - Stories: AvatarSvg (3 placements — StoryCard, FeaturedStory, StoryDialog, all rounded-full with category-mapped variant); HeroCommunityIllustration (in FeaturedStory left visual panel, h-32 max-w-[240px]); EmptyIllustration (empty-state for category filter, h-32 w-40).
  - Gallery: HeroCommunityIllustration (side visual in "Browse" section header, h-24 w-32); EmptyIllustration (empty-state for category filter, h-32 w-40).
- Key decisions:
  * Replaced the local RegionalReachMap placeholder function entirely with the shared IndiaReachMap illustration — single source of truth for the India map visual across pages, consistent with the SVG-LIB convention.
  * AvatarSvg containers use rounded-full (not rounded-2xl) so the ring traces the AvatarSvg's circular silhouette cleanly — avoids the awkward "circle inside rounded square" outline.
  * All side-visual illustration cards are hidden on mobile (sm:block) to keep mobile layouts uncluttered; they appear on sm+ screens where horizontal space allows.
  * Used justify-between / items-end flex layouts to place illustrations alongside SectionHeading components without displacing the existing right-aligned actions ("View full gallery" button on impact, "Showing X of Y" counter on gallery).
  * Kept brand palette only (blue/purple/green) — no indigo added. Pre-existing indigo gradient on gallery item g8 (Mock Interview Drive) is in data.ts which is out of scope.
  * Did not modify svg-illustrations.tsx, svg-logos.tsx, globals.css, layout, data.ts, or any other pages.

---
Task ID: 4c
Agent: full-stack-developer
Task: Integrated SVG illustrations into Partners, Blog, Contact, Volunteer, and Donate pages.

Work Log:
- Read worklog.md (incl. SVG-LIB, 4a, 4b entries), src/components/site/svg-illustrations.tsx (all 16 exports), src/components/site/svg-logos.tsx (PartnerLogo + AvatarSvg APIs), the 5 target page files, and src/lib/data.ts to confirm partner/blog/testimonial shapes and the brand color union ("blue"|"purple"|"green"). Confirmed "Research" is in the BlogPost category union but has zero posts in data → empty-state is reachable.
- Partners page: imported PartnershipIllustration from svg-illustrations and PartnerLogo from svg-logos; removed the now-unused NodeNetwork import. PartnerCard: replaced the initials `<span>` with `<PartnerLogo name logoText className="relative h-14 w-14" />` inside the existing gradient/ring/dot-pattern container (container + sizing preserved). Marquee row: replaced the gradient initials div with a muted-bg container holding `<PartnerLogo className="h-9 w-9" />` (keeps the ring + partner name). Stats card ("partnership model in numbers"): replaced `<NodeNetwork className="h-32 w-40" />` with `<PartnershipIllustration className="h-32 w-40" />` in the same hidden sm:block side column. All marquee animation, testimonials, inquiry form (→ /api/contact), and structure untouched. gradientForType still used by PartnerCard container so no unused-fn lint error.
- Blog page: imported BlogIllustration + EmptyIllustration from svg-illustrations. Featured section: wrapped the existing left-aligned SectionHeading in a `flex items-end justify-between gap-6` row and added `<BlogIllustration className="hidden h-24 w-32 sm:block" />` as a side visual next to the heading. Empty state (when a category filter has no posts, e.g. "Research"): replaced the dashed text-only div with a centered `flex flex-col items-center gap-4` container holding `<EmptyIllustration className="h-32 w-40" />` above the existing caption. FeaturedPost card gradient, category filter pills, AnimatePresence layout grid, and newsletter CTA (→ /api/newsletter) untouched.
- Contact page: imported IndiaReachMap from svg-illustrations; removed the now-unused `motion` import from framer-motion (motion was only used by the animated pin in MapPlaceholder). MapPlaceholder: replaced the entire inner content (gradient bg + grid-pattern + fake-roads SVG + animated motion pin) with `<IndiaReachMap className="h-full w-full" />` inside the same h-72/h-80 card; kept the address overlay (glass card with Building2 icon + site.address) absolutely positioned at the bottom. The card kept a subtle brand gradient backdrop so the India silhouette + pins read clearly. ContactForm, contact info cards, office hours, social links, FAQ accordion, and CTA band untouched. MapPin still used by contactCards + SectionHeading icon; Building2 still used by address overlay.
- Volunteer page: imported VolunteerIllustration from svg-illustrations; removed the now-unused NodeNetwork import. PageHero children: wrapped the existing two CTA buttons (Apply Now / Explore Roles) in their flex row and added `<div className="hidden sm:block"><VolunteerIllustration className="h-24 w-32" /></div>` next to them (follows the 4b events-page pattern). Application form sticky left column: replaced `<NodeNetwork className="absolute inset-0 h-full w-full opacity-80" />` with `<VolunteerIllustration className="absolute inset-0 h-full w-full opacity-90" />` in the same h-44 bordered card with the "Your skills fit somewhere here." caption. Roles grid, impact stats (AnimatedCounter), application form (→ /api/volunteer), FAQs, and CTA untouched.
- Donate page: imported DonateIllustration, CertificateIllustration, ImpactIllustration from svg-illustrations. PageHero children: added `<div className="hidden sm:block"><DonateIllustration className="h-24 w-32" /></div>` next to the Calculate impact / Choose a tier buttons (decorative side visual above the calculator section). Transparency / trust section: inserted a new Reveal Card between the trust-badges grid and the funds-allocation bar — a `flex flex-col sm:flex-row` card with `<CertificateIllustration className="h-28 w-36 shrink-0" />` on the left and a "Certified, audited & accountable" heading + paragraph on the right (thematically extends the 4 trust badges). Impact-of-donations section: replaced the plain centered FadeIn `<p>` with a centered Card containing `<ImpactIllustration className="hidden h-20 w-28 shrink-0 sm:block" />` alongside the existing BookOpen summary paragraph (follows the 4a SDGs impact-strip pattern). ALL existing donate functionality preserved: slider calculator, donation tiers, donor form (→ /api/donate), AnimatePresence success state, UPI/bank copy buttons, funds-allocation animated bar, trust badges grid. No state logic touched.
- Ran `bun run lint` — clean (0 errors, 0 warnings). Curl-verified /partners, /blog, /contact, /volunteer, /donate all return HTTP 200 with successful compile (dev.log confirms compile times). Grep-verified SVG viewBoxes in rendered HTML: Partners has 36× PartnerLogo (12 grid + 24 marquee) + 1× PartnershipIllustration (240x200); Blog has 1× BlogIllustration (240x200); Contact has 1× IndiaReachMap (220x200); Volunteer has 2× VolunteerIllustration (240x200 — PageHero + sticky column); Donate has 2× (240x200) [DonateIllustration + CertificateIllustration] + 1× ImpactIllustration (260x200).

Stage Summary:
- Files modified:
  - src/app/partners/page.tsx
  - src/app/blog/page.tsx
  - src/app/contact/page.tsx
  - src/app/volunteer/page.tsx
  - src/app/donate/page.tsx
- Illustrations added:
  - Partners: PartnerLogo ×36 (12 in partner grid + 24 in marquee, replacing initials placeholders, h-14 w-14 / h-9 w-9); PartnershipIllustration (stats card "partnership model in numbers", h-32 w-40, replacing NodeNetwork).
  - Blog: BlogIllustration (featured section header side visual, h-24 w-32, hidden on mobile); EmptyIllustration (empty-state when category filter has no posts, h-32 w-40).
  - Contact: IndiaReachMap (map card, h-full w-full, replacing gradient + grid-pattern + fake-roads SVG + animated motion pin; address overlay preserved).
  - Volunteer: VolunteerIllustration ×2 (PageHero children side visual next to CTA buttons, h-24 w-32, hidden on mobile; application-form sticky left column replacing NodeNetwork, h-full w-full opacity-90).
  - Donate: DonateIllustration (PageHero children side visual next to CTA buttons, h-24 w-32, hidden on mobile); CertificateIllustration (trust section, new Card between trust badges grid and funds-allocation bar, h-28 w-36); ImpactIllustration (impact-of-donations section, replaced plain FadeIn paragraph with Card containing illustration + paragraph, h-20 w-28, hidden on mobile).
- Key decisions:
  * Replaced the local MapPlaceholder internals (gradient + grid-pattern + fake-roads SVG + animated motion pin) entirely with the shared IndiaReachMap illustration — single source of truth for the India map visual across pages (consistent with 4b Impact-page RegionalReachMap replacement). Removed the now-unused `motion` import.
  * Replaced NodeNetwork with thematic illustrations on Partners (PartnershipIllustration) and Volunteer (VolunteerIllustration) pages where the generic node-network decoration was less on-theme; removed the now-unused NodeNetwork imports from both pages.
  * All side-visual illustration cards in PageHero children are hidden on mobile (sm:block) to keep mobile layouts uncluttered — follows the 4b events-page pattern.
  * For the donate trust section, added the CertificateIllustration as a standalone Card between the trust-badges grid and the funds-allocation bar rather than restructuring the 4-column badges grid — keeps the existing badge layout intact while adding a richer certified/audited visual.
  * For the donate impact section, wrapped the existing BookOpen summary paragraph in a Card with an ImpactIllustration side visual (hidden on mobile) — follows the 4a SDGs impact-strip pattern.
  * Kept brand palette only (blue/purple/green) — no indigo added. Did not modify svg-illustrations.tsx, svg-logos.tsx, globals.css, layout, data.ts, or any other pages. No existing content/animations/forms/state removed.

---
Task ID: SVG-INTEGRATION (Home + Verification)
Agent: main (Z.ai Code)
Task: Integrated SVG illustrations into the Home page and verified all pages.

Work Log:
- Home page (src/app/page.tsx):
  - Hero: added HeroCommunityIllustration centered inside the AtomOrbits (layered visual).
  - FocusAreas: added themed program illustration (programIllustrations[p.id]) as a footer visual on each of the 5 program cards.
  - ImpactSection: added ImpactIllustration alongside the GrowthLine.
  - SuccessStories: replaced initials-circle avatars with AvatarSvg (variant by category).
  - UpcomingEvents: added EventIllustration as a subtle background on each event card header.
  - PartnersMarquee: replaced initials placeholders with PartnerLogo SVG component (24 logos).
  - Testimonials: replaced initials with AvatarSvg (variant by color).
- Verified via Agent Browser + VLM:
  - Home: 143 SVGs (hero community illustration, 5 program illustrations, impact illustration, 6 avatars, 24 partner logos, event illustrations).
  - All 13 routes return 200, zero console errors.
  - Donate calculator still works (slider value=2500).
  - Mobile (390px) renders all 143 SVGs correctly.
  - VLM confirms: hero has visual illustration, program cards have themed illustrations, overall clean/modern/cohesive design.
- Lint: 0 errors, 0 warnings.

Stage Summary:
- SVG illustrations now present across ALL 13 pages: Home, About, Programs, SDGs, Impact, Events, Stories, Gallery, Partners, Blog, Contact, Volunteer, Donate.
- Replaced plain gradient placeholders and initials avatars with themed, animated SVG illustrations using the brand blue/purple/green palette.

---
Task ID: ERROR-FIX
Agent: main (Z.ai Code)
Task: Checked for errors across the project and fixed issues found.

Work Log:
- Audited dev server logs: all 13 routes return 200, no runtime errors (only old EADDRINUSE from restarts).
- Ran ESLint: 0 errors, 0 warnings (clean).
- Ran TypeScript tsc --noEmit: app src/ code is type-clean (only errors in unrelated examples/ and skills/ folders).
- Scanned browser console across all 13 pages via Agent Browser.
- FOUND: SSR hydration mismatches on /, /about, /sdgs, /impact ("A tree hydrated but some attributes of the server rendered HTML didn't match the client").
- ROOT CAUSE: FloatingParticles component (src/components/site/svg-decorations.tsx) used Math.random() inside useMemo during render, producing different particle positions on server vs client.
- FIX: Refactored FloatingParticles to generate particles in useState (empty initially) + populate via useEffect (client-only). This guarantees server and client render the same (empty) initial markup, then particles appear after hydration.
- Re-verified all 13 pages: zero hydration errors, zero console errors, zero page errors.
- Verified API routes all work: contact, newsletter, donate (valid + validation), volunteer, event-register, chatbot (LLM responds).
- Verified interactive features: contact form submits + shows success toast, donate calculator slider works (value=2500), chatbot responds with career guidance.
- Remaining cosmetic warning: Framer Motion "non-static position" scroll-offset notice on the hero parallax — this is a known harmless false-positive (the section already has position:relative; parallax works correctly). Filtered from error scan as non-blocking.

Stage Summary:
- Fixed the only real bug: FloatingParticles SSR hydration mismatch (Math.random in render → moved to useEffect).
- All 13 pages now render with zero errors. Lint clean. APIs functional. Interactions verified.

---
Task ID: REMOVE-DONATE
Agent: main (Z.ai Code)
Task: Removed the donate button, page, and all its references from the site.

Work Log:
- Deleted src/app/donate/ (page) and src/app/api/donate/ (API route).
- Removed Donation model from prisma/schema.prisma and ran db push (--accept-data-loss to drop the 1 test row).
- Navbar: removed desktop "Donate" button + mobile "Donate Now" button; promoted Volunteer to primary CTA ("Get Involved").
- Footer nav (lib/nav.ts): removed "Donate" link from Get Involved column.
- Home page: removed hero "Donate" button and FinalCTA "Donate Now" button; updated copy ("a donor or" → removed). Replaced donate CTA with "Partner With Us".
- About page: removed "Donate" CTA button (→ Contact Us); updated heading ("Partner, volunteer or donate" → "Partner or volunteer").
- SDGs page: replaced "Donate to the Goals" button → "Volunteer With Us".
- Impact page: replaced 2 donate links (hero "Support our mission" → /volunteer; CTA "Donate now" → "Volunteer now" + "Partner with us").
- Volunteer page: replaced "Prefer to donate instead?" CTA band → "Want to do more? Partner with us." with /partners + /contact buttons.
- Contact page: removed "Donations" subject option; replaced donations FAQ with partnership FAQ; updated PageHero description; replaced 2 donate CTA buttons with partnership CTAs; updated bullet list (removed "80G tax-deductible donations", added "CSR & government collaborations").
- Chatbot widget + API route: removed all donate/donation mentions from system prompt, suggestions ("How do donations help?" → "How can my company partner with you?"), and fallback message.
- lib/data.ts: removed DonationTier type, donationTiers, and donationImpact arrays (no longer used).
- svg-illustrations.tsx: removed DonateIllustration component (no longer used).
- Cleaned unused imports: Heart (navbar, home), HandHeart (contact → Handshake), CardContent/ChevronRight/Play (home).

Stage Summary:
- Donate feature fully removed: page, API route, Prisma model, all UI buttons/links/CTAs, chatbot mentions, data, and illustration.
- All remaining CTAs repurposed to Volunteer / Partner / Contact.
- Verified: /donate → 404, /api/donate → 404, all 12 remaining pages → 200, zero donate links/text on any page, lint clean (0 errors).
