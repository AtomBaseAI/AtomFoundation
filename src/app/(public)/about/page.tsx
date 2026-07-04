"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Eye,
  Quote,
  ArrowRight,
  Download,
  FileText,
  ShieldCheck,
  BadgeCheck,
  FileCheck,
  HeartHandshake,
  Users,
  Handshake,
  TrendingUp,
  Building2,
  GraduationCap,
  Scale,
  Rocket,
  Lightbulb,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Reveal,
  Stagger,
  StaggerItem,
  FadeIn,
} from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AtomOrbits,
  FloatingParticles,
  NodeNetwork,
} from "@/components/site/svg-decorations";
import {
  HeroCommunityIllustration,
  CertificateIllustration,
} from "@/components/site/svg-illustrations";
import { AvatarSvg } from "@/components/site/svg-logos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type TeamMember, type Advisor, type CoreValue } from "@/lib/data";
import { useContent, type ContentData } from "@/hooks/use-content";
import { Icon } from "@/components/site/icon";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Color helpers — map "blue" | "purple" | "green" to brand tokens    */
/* ------------------------------------------------------------------ */

const colorText: Record<string, string> = {
  blue: "text-brand-blue",
  purple: "text-brand-purple",
  green: "text-brand-green",
};

const colorBgSoft: Record<string, string> = {
  blue: "bg-brand-blue/10",
  purple: "bg-brand-purple/10",
  green: "bg-brand-green/10",
};

const colorBgSofter: Record<string, string> = {
  blue: "bg-brand-blue/15",
  purple: "bg-brand-purple/15",
  green: "bg-brand-green/15",
};

const colorBorder: Record<string, string> = {
  blue: "border-brand-blue/30",
  purple: "border-brand-purple/30",
  green: "border-brand-green/30",
};

const avatarGradient: Record<string, string> = {
  blue: "from-brand-blue to-brand-purple",
  purple: "from-brand-purple to-brand-green",
  green: "from-brand-green to-brand-blue",
};

const colorGlow: Record<string, string> = {
  blue: "shadow-glow-blue",
  purple: "shadow-glow-purple",
  green: "shadow-glow-blue",
};

const colorBgSolid: Record<string, string> = {
  blue: "bg-brand-blue",
  purple: "bg-brand-purple",
  green: "bg-brand-green",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const { data, loading } = useContent<
    Pick<ContentData, "site" | "team" | "advisors" | "core-values" | "impact">
  >(["site", "team", "advisors", "core-values", "impact"]);

  const site = data?.site;
  const team = data?.team ?? [];
  const advisors = data?.advisors ?? [];
  const coreValues = data?.["core-values"] ?? [];
  const impactMetrics = data?.impact ?? [];

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const founder = team[0];

  const storyStats = [
    {
      label: "Students Trained",
      value: impactMetrics[0]?.value ?? 0,
      suffix: impactMetrics[0]?.suffix ?? "",
      icon: GraduationCap,
      color: "blue" as const,
    },
    {
      label: "Women Empowered",
      value: impactMetrics[1]?.value ?? 0,
      suffix: impactMetrics[1]?.suffix ?? "",
      icon: HeartHandshake,
      color: "purple" as const,
    },
    {
      label: "Schools Reached",
      value: impactMetrics[2]?.value ?? 0,
      suffix: impactMetrics[2]?.suffix ?? "",
      icon: Building2,
      color: "green" as const,
    },
  ];

  const reports = [
    {
      year: "2024",
      title: "Annual Report 2024",
      summary:
        "A year of scaling partnerships — 12 new CSR & government collaborations, expansion to 32 districts, and 4,200+ women empowered.",
      size: "2.4 MB",
      pages: 36,
    },
    {
      year: "2023",
      title: "Annual Report 2023",
      summary:
        "Crossed 10,000 trained learners, launched the flagship AI track and reported a 65% placement rate for eligible graduates.",
      size: "2.1 MB",
      pages: 32,
    },
    {
      year: "2022",
      title: "Annual Report 2022",
      summary:
        "The bootcamp year — first AI Training cohort, women empowerment track in full swing and the shift back to hybrid delivery.",
      size: "1.8 MB",
      pages: 28,
    },
  ];

  const transparencyStats = [
    {
      icon: TrendingUp,
      label: "Funds to Programs",
      value: "92%",
      caption: "Of every rupee goes to on-ground programs.",
      color: "blue" as const,
    },
    {
      icon: BadgeCheck,
      label: "80G & 12A Approved",
      value: "100%",
      caption: "Tax-exempt & legally registered non-profit.",
      color: "green" as const,
    },
    {
      icon: FileCheck,
      label: "Audited Annually",
      value: "Yearly",
      caption: "Independent financial audits published openly.",
      color: "purple" as const,
    },
    {
      icon: ShieldCheck,
      label: "Public Disclosure",
      value: "Open",
      caption: "Reports, impact data & finances on our website.",
      color: "blue" as const,
    },
  ];

  return (
    <>
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="About Atom Arc Foundation"
        title={
          <>
            We exist to make{" "}
            <span className="text-gradient-brand">future-ready skills</span>{" "}
            accessible to everyone
          </>
        }
        description={site?.mission ?? ""}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-brand">
            <Link href="/programs">
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about#team">Meet the Team</Link>
          </Button>
        </div>
      </PageHero>

      {/* ============== OUR STORY ============== */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: narrative */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow={`Founded in ${site?.founded ?? ""}`}
                icon={Sparkles}
                title="A small workshop that became a movement"
                description={
                  <>
                    Atom Arc Foundation began in {site?.founded ?? ""} with a single
                    coding workshop for 30 students in Coimbatore. What started
                    as a weekend experiment in equitable access quickly became
                    a full-scale mission to bring AI, software and digital
                    literacy to those who needed it most.
                  </>
                }
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Over six years we have grown from a small volunteer group
                  into a recognised non-profit operating across{" "}
                  <span className="font-semibold text-foreground">
                    32 districts
                  </span>
                  , partnering with CSR companies, governments, NGOs and
                  technology leaders — all united by one belief: opportunity
                  should never be decided by geography, gender or income.
                </p>
                <p>
                  Today we run five flagship programs in AI training, software
                  development, career readiness, women empowerment and school
                  STEM — with measurable, audited outcomes and a community of
                  mentors who learned with us and now teach with us.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Equity-first",
                  "Community-driven",
                  "Audited & transparent",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-border/70 bg-background/60 px-3 py-1 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Reveal>

            {/* Right: decorative card with orbits + stats */}
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand-soft blur-2xl" />
                <Card className="overflow-hidden border-border/60 shadow-soft">
                  <div className="relative aspect-square w-full overflow-hidden bg-gradient-brand-soft">
                    <FloatingParticles count={10} />
                    <AtomOrbits className="h-full w-full p-8" />
                    <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-3 py-2 backdrop-blur">
                      <Sparkles className="h-4 w-4 text-brand-purple" />
                      <span className="text-xs font-medium text-foreground">
                        Building future-ready communities since {site?.founded ?? ""}
                      </span>
                    </div>
                  </div>
                  <CardContent className="grid grid-cols-3 gap-2 pt-0">
                    {storyStats.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className={cn(
                            "flex flex-col items-center gap-1 rounded-lg border p-3 text-center",
                            colorBorder[s.color],
                            colorBgSoft[s.color]
                          )}
                        >
                          <Icon className={cn("h-5 w-5", colorText[s.color])} />
                          <div
                            className={cn(
                              "font-poppins text-2xl font-800",
                              colorText[s.color]
                            )}
                          >
                            <AnimatedCounter
                              value={s.value}
                              suffix={s.suffix}
                              duration={2.2}
                            />
                          </div>
                          <div className="text-[11px] font-medium leading-tight text-muted-foreground">
                            {s.label}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                  {/* Community illustration — complements the orbits + stats */}
                  <div className="border-t border-border/60 bg-gradient-brand-soft/50 p-3">
                    <HeroCommunityIllustration className="h-28 w-full" />
                  </div>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== MISSION & VISION ============== */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Mission & Vision"
            icon={Target}
            title="Why we do what we do"
            description="Two statements that guide every program, partnership and decision at Atom Arc Foundation."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-blue/30 bg-background/80 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/3 translate-x-1/3 rounded-full bg-brand-blue/15 blur-2xl transition-all duration-500 group-hover:bg-brand-blue/25" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-blue">
                    <Target className="h-7 w-7" />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-brand-blue/30 bg-brand-blue/10 text-brand-blue"
                    >
                      Our Mission
                    </Badge>
                  </div>
                  <h3 className="font-poppins text-2xl font-700">
                    What we do every day
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {site?.mission ?? ""}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-purple/30 bg-background/80 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/3 translate-x-1/3 rounded-full bg-brand-purple/15 blur-2xl transition-all duration-500 group-hover:bg-brand-purple/25" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-purple">
                    <Eye className="h-7 w-7" />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-brand-purple/30 bg-brand-purple/10 text-brand-purple"
                    >
                      Our Vision
                    </Badge>
                  </div>
                  <h3 className="font-poppins text-2xl font-700">
                    The future we see
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {site?.vision ?? ""}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== CORE VALUES ============== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Core Values"
            icon={HeartHandshake}
            title="The principles behind every program"
            description="Six values that shape how we teach, partner and grow with the communities we serve."
          />

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value: CoreValue) => {
              return (
                <StaggerItem key={value.title}>
                  <div
                    className={cn(
                      "group relative h-full overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft",
                      colorBorder[value.color]
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150",
                        colorBgSofter[value.color]
                      )}
                    />
                    <div className="relative">
                      <div
                        className={cn(
                          "inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                          colorBgSoft[value.color]
                        )}
                      >
                        <Icon name={value.icon} className={cn("h-6 w-6", colorText[value.color])} />
                      </div>
                      <h3 className="mt-5 font-poppins text-lg font-700">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ============== FOUNDER MESSAGE ============== */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-purple/15 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <Reveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-8 shadow-soft backdrop-blur sm:p-12">
              <Quote className="absolute -top-4 left-6 h-20 w-20 text-brand-blue/10" />
              <div className="relative">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <div className="relative">
                    <AvatarSvg
                      initials={founder?.initials ?? ""}
                      variant="blue"
                      className="h-20 w-20 shadow-glow-blue"
                    />
                    <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-background shadow-soft">
                      <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      Founder&apos;s Message
                    </div>
                    <h3 className="mt-1 font-poppins text-2xl font-700">
                      {founder?.name ?? ""}
                    </h3>
                    <p className="text-sm text-muted-foreground">{founder?.role ?? ""}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <p className="font-poppins text-lg font-500 italic leading-relaxed text-foreground sm:text-xl">
                  &ldquo;When we taught our first 30 students in{" "}
                  {site?.founded ?? ""}, we weren&apos;t building an organization — we
                  were answering a simple question:{" "}
                  <span className="text-gradient-brand not-italic font-600">
                    what if every student and every woman could access the
                    skills shaping our future?
                  </span>{" "}
                  Six years later, that question still drives us. Every cohort,
                  every partnership, every line of code we teach is a small step
                  toward a more equitable future. We have only just begun.&rdquo;
                </p>

                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <div className="font-poppins text-base font-700 text-gradient-brand">
                      {founder?.name ?? ""}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {founder?.role ?? ""}, Atom Arc Foundation
                    </div>
                  </div>
                  <div className="hidden font-poppins text-5xl font-800 text-brand-blue/10 sm:block">
                    {site?.founded ?? ""}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== TEAM ============== */}
      <section id="team" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Team"
            icon={Users}
            title="The people behind the mission"
            description="Educators, engineers and community organizers who turn our mission into measurable impact every single day."
          />

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member: TeamMember) => (
              <StaggerItem key={member.name}>
                <div className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <AvatarSvg
                        initials={member.initials}
                        variant={member.color as "blue" | "purple" | "green" | "brand"}
                        className="h-14 w-14 rounded-xl"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-poppins text-base font-700">
                        {member.name}
                      </h3>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          colorText[member.color]
                        )}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                  <div
                    className={cn(
                      "mt-4 h-0.5 w-12 origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-150",
                      colorBgSolid[member.color]
                    )}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============== ADVISORY BOARD ============== */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Advisory Board"
            icon={Handshake}
            title="Guided by experience, grounded in impact"
            description="Leaders from academia, industry, policy and community development who advise our strategy."
          />

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((adv: Advisor) => (
              <StaggerItem key={adv.name}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-border/60 bg-background/80 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <AvatarSvg
                      initials={adv.initials}
                      variant="brand"
                      className="h-16 w-16 shadow-glow-blue"
                    />
                  </div>
                  <h3 className="mt-4 font-poppins text-base font-700">
                    {adv.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {adv.role}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{adv.org}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============== ANNUAL REPORTS / TRANSPARENCY ============== */}
      <section id="reports" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Annual Reports & Transparency"
            icon={ShieldCheck}
            title="Trust, built on open books"
            description="We believe every rupee and every outcome should be visible. Download our annual reports and audit summaries below."
          />

          {/* Transparency stats strip */}
          <Reveal>
            <div className="mt-12 grid gap-4 rounded-2xl border border-border/60 bg-gradient-brand-soft p-6 sm:grid-cols-2 lg:grid-cols-4">
              {transparencyStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-start gap-3 rounded-xl bg-background/70 p-4"
                  >
                    <div
                      className={cn(
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        colorBgSoft[stat.color]
                      )}
                    >
                      <Icon className={cn("h-5 w-5", colorText[stat.color])} />
                    </div>
                    <div>
                      <div className="font-poppins text-xl font-800 text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-foreground">
                        {stat.label}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {stat.caption}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Trust banner with certificate illustration */}
          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-gradient-brand-soft p-6 sm:flex-row sm:text-left">
              <CertificateIllustration className="h-32 w-full max-w-[200px] shrink-0" />
              <div className="sm:ml-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-blue" />
                  <span className="font-poppins text-lg font-700">
                    Audited &amp; Verified
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Every report below is independently audited and published
                  openly — part of our commitment to radical transparency. Your
                  trust is earned, not assumed.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Report cards */}
          <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {reports.map((r) => (
              <StaggerItem key={r.year}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-blue/10 blur-2xl transition-all duration-500 group-hover:bg-brand-purple/20" />
                  <div className="relative flex items-start justify-between">
                    <div className="inline-flex h-14 w-12 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                      <FileText className="h-7 w-7" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-brand-purple/30 bg-brand-purple/10 text-brand-purple"
                    >
                      {r.year}
                    </Badge>
                  </div>
                  <h3 className="relative mt-4 font-poppins text-lg font-700">
                    {r.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.summary}
                  </p>
                  <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>PDF · {r.pages} pages · {r.size}</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="relative mt-4 w-full"
                  >
                    <Link href="#">
                      <Download className="h-4 w-4" /> Download PDF
                    </Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need a detailed financial breakdown or audit statement?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Request it from our team →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-glow-blue sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <NodeNetwork className="pointer-events-none absolute right-0 top-0 hidden h-48 w-72 opacity-30 lg:block" />

              <div className="relative max-w-2xl">
                <h2 className="font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                  Partner or volunteer — build the future with us.
                </h2>
                <p className="mt-4 text-base text-white/85 sm:text-lg">
                  Whether you are a CSR team, a technologist who wants to
                  mentor, or someone who simply believes in equitable access —
                  there is a place for you at Atom Arc Foundation.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/partners">
                      <Handshake className="h-4 w-4" /> Partner With Us
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/volunteer">
                      <Users className="h-4 w-4" /> Become a Volunteer
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/contact">
                      <HeartHandshake className="h-4 w-4" /> Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
