"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  BarChart3,
  Users,
  CheckCircle2,
  MessageSquare,
  Bot,
  Sparkles,
  HelpCircle,
  Compass,
  Loader2,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Program } from "@/lib/data";
import { useContent, type ContentData } from "@/hooks/use-content";
import { Icon } from "@/components/site/icon";
import {
  HeroCommunityIllustration,
  programIllustrations,
} from "@/components/site/svg-illustrations";
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

const colorBgGradient: Record<string, string> = {
  blue: "from-brand-blue to-brand-purple",
  purple: "from-brand-purple to-brand-green",
  green: "from-brand-green to-brand-blue",
};

const colorBorder: Record<string, string> = {
  blue: "border-brand-blue/30",
  purple: "border-brand-purple/30",
  green: "border-brand-green/30",
};

const colorBadgeClass: Record<string, string> = {
  blue: "border-brand-blue/30 bg-brand-blue/10 text-brand-blue",
  purple: "border-brand-purple/30 bg-brand-purple/10 text-brand-purple",
  green: "border-brand-green/30 bg-brand-green/10 text-brand-green",
};

// Subtle full-section gradient backdrop per program color.
const sectionBg: Record<string, string> = {
  blue: "bg-gradient-to-br from-brand-blue/[0.04] via-brand-purple/[0.04] to-transparent",
  purple:
    "bg-gradient-to-br from-brand-purple/[0.05] via-brand-blue/[0.04] to-transparent",
  green:
    "bg-gradient-to-br from-brand-green/[0.05] via-brand-blue/[0.04] to-transparent",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProgramsPage() {
  const { data, loading } = useContent<Pick<ContentData, "site" | "programs">>(["site", "programs"]);
  const site = data?.site;
  const programs = data?.programs ?? [];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Our Programs"
        title={
          <>
            Programs that build{" "}
            <span className="text-gradient-brand">future-ready careers</span>
          </>
        }
        description="Five focused tracks taking learners from first-line-of-code to deployed AI applications, careers and community leadership. Each program is hands-on, mentored and built for measurable outcomes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs" },
        ]}
      >
        {/* Quick-jump chips per program */}
        <div className="flex flex-wrap gap-2">
          {programs.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold transition-all hover:-translate-y-0.5 hover:shadow-soft",
                colorBadgeClass[p.color]
              )}
            >
              <Icon name={p.icon} className="h-3.5 w-3.5" />
              {p.title}
            </a>
          ))}
        </div>
      </PageHero>

      {/* ============== INTRO ============== */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="What we teach"
                icon={Sparkles}
                title="Hands-on tracks, not just courses"
                description="Every program is designed around real projects, mentor support and outcomes you can put on a resume. We blend AI, software and human skills so learners are not just employable — they are future-ready."
              />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Programs", value: String(programs.length) },
                  { label: "Avg. placement", value: "68%" },
                  { label: "Cohorts / year", value: "12+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border/60 bg-card p-4"
                  >
                    <div className="font-poppins text-2xl font-800 text-gradient-brand">
                      {s.value}
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* How to choose — helper card with anchor links */}
            <Reveal delay={0.15}>
              <Card className="overflow-hidden border-border/60 p-6 shadow-soft">
                <div className="mb-1 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-poppins text-base font-700">
                    How to choose your program
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Pick the path that matches where you are right now.
                </p>
                <Separator className="my-4" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-xs font-700 text-brand-blue">
                      1
                    </span>
                    <span>
                      <span className="font-semibold">
                        Student or fresh graduate?
                      </span>{" "}
                      Start with{" "}
                      <a
                        href="#ai"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        AI Training
                      </a>{" "}
                      or{" "}
                      <a
                        href="#software"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        Software Development
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-purple/10 text-xs font-700 text-brand-purple">
                      2
                    </span>
                    <span>
                      <span className="font-semibold">
                        Final year & looking for a job?
                      </span>{" "}
                      The{" "}
                      <a
                        href="#career"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        Career Readiness
                      </a>{" "}
                      track is for you.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/10 text-xs font-700 text-brand-green">
                      3
                    </span>
                    <span>
                      <span className="font-semibold">
                        Woman, homemaker or SHG member?
                      </span>{" "}
                      Explore{" "}
                      <a
                        href="#women"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        Women Empowerment
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-xs font-700 text-brand-blue">
                      4
                    </span>
                    <span>
                      <span className="font-semibold">
                        School or student (Grades 5–12)?
                      </span>{" "}
                      See our{" "}
                      <a
                        href="#school"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        School Programs
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== PROGRAM SECTIONS ============== */}
      {programs.map((program, idx) => (
        <ProgramSection
          key={program.id}
          program={program}
          reversed={idx % 2 === 1}
        />
      ))}

      {/* ============== CLOSING CTA ============== */}
      <section className="relative overflow-hidden border-t border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-purple/15 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <HeroCommunityIllustration className="mx-auto mb-6 h-32 w-full max-w-sm" />
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <HelpCircle className="h-3.5 w-3.5" /> Need help deciding?
              </div>
              <h2 className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                Not sure which program is right for you?
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Talk to our team for a personalised recommendation, or use our{" "}
                <span className="font-semibold text-foreground">
                  AI assistant chatbot
                </span>{" "}
                in the corner of your screen — it can suggest a track in under
                a minute based on your goals, background and time available.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-gradient-brand">
                  <Link href="/contact">
                    Talk to Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/volunteer">
                    <MessageSquare className="h-4 w-4" /> Volunteer as a Mentor
                  </Link>
                </Button>
              </div>

              {/* Helper feature grid */}
              <div className="mt-10 grid gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 text-left sm:grid-cols-3">
                {[
                  {
                    icon: Bot,
                    title: "Try the AI assistant",
                    text: "Get an instant program recommendation based on your goals.",
                  },
                  {
                    icon: Users,
                    title: "Talk to a mentor",
                    text: "Book a 15-minute call with a program lead, free of cost.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Scholarships available",
                    text: "Need-based scholarships for women, rural learners & students.",
                  },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{f.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {f.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Single program section                                             */
/* ------------------------------------------------------------------ */

function ProgramSection({
  program,
  reversed,
}: {
  program: Program;
  reversed: boolean;
}) {
  const ProgramIllustration = programIllustrations[program.id];

  return (
    <section
      id={program.id}
      className={cn(
        "scroll-mt-24 relative overflow-hidden py-16 sm:py-20 lg:py-24",
        sectionBg[program.color]
      )}
    >
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
      <div
        className={cn(
          "pointer-events-none absolute -top-20 h-72 w-72 rounded-full blur-3xl",
          reversed ? "-left-20" : "-right-20",
          colorBgSoft[program.color]
        )}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Overview column */}
          <Reveal>
            <div className={reversed ? "lg:order-2" : "lg:order-1"}>
              <div className="flex items-start gap-5">
                <div
                  className={cn(
                    "grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft",
                    colorBgGradient[program.color]
                  )}
                >
                  <Icon name={program.icon} className="h-8 w-8" />
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={cn("mb-2", colorBadgeClass[program.color])}
                  >
                    Program {program.id.toUpperCase()}
                  </Badge>
                  <h2 className="font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                    {program.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-1 font-poppins text-base font-500 italic",
                      colorText[program.color]
                    )}
                  >
                    {program.tagline}
                  </p>
                </div>
              </div>

              {/* Program illustration — themed visual for this track */}
              {ProgramIllustration && (
                <div
                  className={cn(
                    "mt-6 overflow-hidden rounded-2xl border p-4",
                    colorBorder[program.color],
                    colorBgSoft[program.color]
                  )}
                >
                  <ProgramIllustration className="h-44 w-full" />
                </div>
              )}

              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {program.description}
              </p>

              {/* Meta badges: duration / level / audience */}
              <div className="mt-6 flex flex-wrap gap-3">
                <MetaPill
                  icon={Clock}
                  label="Duration"
                  value={program.duration}
                  color={program.color}
                />
                <MetaPill
                  icon={BarChart3}
                  label="Level"
                  value={program.level}
                  color={program.color}
                />
                <MetaPill
                  icon={Users}
                  label="For"
                  value={program.audience}
                  color={program.color}
                />
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-brand">
                  <Link href="/contact">
                    Enroll Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/volunteer">
                    <MessageSquare className="h-4 w-4" /> Talk to us
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Modules + outcomes column */}
          <Reveal delay={0.12}>
            <div className={reversed ? "lg:order-1" : "lg:order-2"}>
              <Card className="overflow-hidden border-border/60 shadow-soft">
                {/* Modules header */}
                <div
                  className={cn(
                    "flex items-center justify-between border-b border-border/60 px-6 py-4",
                    colorBgSoft[program.color]
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={program.icon} className={cn("h-5 w-5", colorText[program.color])} />
                    <span className="font-poppins text-base font-700">
                      What you&apos;ll learn
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border/60 bg-background/70"
                  >
                    {program.modules.length} modules
                  </Badge>
                </div>

                {/* Modules list */}
                <div className="px-6 py-5">
                  <Stagger className="space-y-3" stagger={0.08}>
                    {program.modules.map((m) => {
                      return (
                        <StaggerItem key={m.name}>
                          <div className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-border/60 hover:bg-accent/40">
                            <div
                              className={cn(
                                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105",
                                colorBgSoft[program.color]
                              )}
                            >
                              <Icon
                                name={m.icon}
                                className={cn(
                                  "h-5 w-5",
                                  colorText[program.color]
                                )}
                              />
                            </div>
                            <div>
                              <div className="font-poppins text-sm font-700">
                                {m.name}
                              </div>
                              <div className="mt-0.5 text-sm text-muted-foreground">
                                {m.description}
                              </div>
                            </div>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>

                <Separator />

                {/* Outcomes */}
                <div className="px-6 py-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2
                      className={cn("h-5 w-5", colorText[program.color])}
                    />
                    <span className="font-poppins text-base font-700">
                      Outcomes you walk away with
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {program.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white",
                            colorBgGradient[program.color]
                          )}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </motion.span>
                        <span className="leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Meta pill (duration / level / audience)                            */
/* ------------------------------------------------------------------ */

function MetaPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  const c = (color as "blue" | "purple" | "green") ?? "blue";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
        colorBorder[c],
        colorBgSoft[c]
      )}
    >
      <Icon className={cn("h-4 w-4", colorText[c])} />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
