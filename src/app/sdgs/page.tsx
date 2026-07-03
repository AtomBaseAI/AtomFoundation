"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Handshake,
  Heart,
  Target,
  CheckCircle2,
  TrendingUp,
  Sparkles,
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
import { NodeNetwork, FloatingParticles } from "@/components/site/svg-decorations";
import {
  IndiaReachMap,
  ImpactIllustration,
} from "@/components/site/svg-illustrations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sdgs, impactMetrics, type Sdg } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SdgsPage() {
  // Subset of impact metrics for the impact strip.
  const impactSubset = [
    impactMetrics[0], // Students Trained
    impactMetrics[1], // Women Empowered
    impactMetrics[2], // Schools Reached
    impactMetrics[3], // Active Volunteers
    impactMetrics[6], // Partner Organizations
    impactMetrics[7], // Districts Covered
  ];

  const brandTextColors = [
    "text-brand-blue",
    "text-brand-purple",
    "text-brand-green",
  ];

  const brandBgSoft = [
    "bg-brand-blue/10",
    "bg-brand-purple/10",
    "bg-brand-green/10",
  ];

  return (
    <>
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Sustainable Development Goals"
        title={
          <>
            Our commitment to the{" "}
            <span className="text-gradient-brand">UN Global Goals</span>
          </>
        }
        description="Atom Arc Foundation aligns its programs, partnerships and measurement framework with the United Nations Sustainable Development Goals — turning local action into globally accountable impact."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "SDGs" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-brand">
            <Link href="/partners">
              <Handshake className="h-4 w-4" /> Partner With Us
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#goals">
              Explore the 6 Goals <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* ============== INTRO ============== */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Why SDGs matter to us"
                icon={Globe2}
                title="Local action, globally accountable"
                description="The Sustainable Development Goals give us a shared language for impact. They help us design programs that actually move the needle on education, equality and opportunity — and report progress in a way partners, donors and communities can trust."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Every Atom Arc Foundation program maps to one or more SDGs. Our
                  AI, software and career tracks advance{" "}
                  <span className="font-semibold text-foreground">
                    Goal 4 (Quality Education)
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">
                    Goal 8 (Decent Work)
                  </span>
                  . Our women empowerment track drives{" "}
                  <span className="font-semibold text-foreground">
                    Goal 5 (Gender Equality)
                  </span>
                  . And our community-first model supports{" "}
                  <span className="font-semibold text-foreground">
                    Goals 9, 10 and 17
                  </span>
                  .
                </p>
                <p>
                  We don&apos;t just badge our work with SDG icons — we measure
                  outcomes against them. Below are the six goals we contribute
                  to most directly.
                </p>
              </div>

              {/* SDG chip legend */}
              <div className="mt-8 flex flex-wrap gap-2">
                {sdgs.map((g) => (
                  <span
                    key={g.number}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                    SDG {g.number}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* NodeNetwork decoration card + India reach card */}
            <Reveal delay={0.15}>
              <div className="relative space-y-4">
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand-soft blur-2xl" />
                  <Card className="relative overflow-hidden border-border/60 p-8 shadow-soft">
                    <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
                    <FloatingParticles count={8} />
                    <div className="relative">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Connected impact
                          </div>
                          <h3 className="font-poppins text-lg font-700">
                            6 goals, one ecosystem
                          </h3>
                        </div>
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow-blue">
                          <Globe2 className="h-6 w-6" />
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <NodeNetwork className="h-56 w-full" />
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        Our programs are nodes in a larger network of partners,
                        communities and learners — each strengthening the others.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* India reach card — complements the network view */}
                <Card className="overflow-hidden border-border/60 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        India reach
                      </div>
                      <h3 className="font-poppins text-base font-700">
                        32 districts and growing
                      </h3>
                    </div>
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-green/10 text-brand-green">
                      <Globe2 className="h-5 w-5" />
                    </div>
                  </div>
                  <IndiaReachMap className="mt-3 h-32 w-full" />
                  <p className="mt-1 text-center text-xs text-muted-foreground">
                    From metro hubs to rural districts — impact where it matters most.
                  </p>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== SDG CARDS ============== */}
      <section
        id="goals"
        className="relative scroll-mt-24 overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="The goals we advance"
            icon={Target}
            title="Six SDGs at the core of our work"
            description="Each card maps an SDG to the concrete contribution Atom Arc Foundation makes — and the measurable highlights behind it."
          />

          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sdgs.map((sdg: Sdg) => (
              <StaggerItem key={sdg.number}>
                <SdgCard sdg={sdg} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============== IMPACT STRIP ============== */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Impact in numbers"
            icon={TrendingUp}
            title="Real outcomes, mapped to the goals"
            description="Every number below is a person, a community or a partnership moving closer to a Global Goal."
          />

          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {impactSubset.map((m, i) => {
              const Icon = m.icon;
              const textColor = brandTextColors[i % brandTextColors.length];
              const bgSoft = brandBgSoft[i % brandBgSoft.length];
              return (
                <StaggerItem key={m.label}>
                  <Card className="h-full border-border/60 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <div
                      className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl ${bgSoft}`}
                    >
                      <Icon className={`h-6 w-6 ${textColor}`} />
                    </div>
                    <div
                      className={`mt-3 font-poppins text-2xl font-800 sm:text-3xl ${textColor}`}
                    >
                      <AnimatedCounter
                        value={m.value}
                        suffix={m.suffix}
                        duration={2.2}
                      />
                    </div>
                    <div className="mt-1 text-xs font-semibold text-foreground">
                      {m.label}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                      {m.description}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn className="mt-8">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-card p-5 sm:flex-row sm:gap-6">
              <ImpactIllustration className="h-16 w-16 shrink-0" />
              <p className="text-center text-sm text-muted-foreground sm:text-left">
                Want the full impact dashboard?{" "}
                <Link
                  href="/impact"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  See all metrics →
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="relative overflow-hidden border-t border-border/60 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-glow-blue sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative mx-auto max-w-2xl text-center">
                <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h2 className="font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                  Partner with us to advance the Global Goals
                </h2>
                <p className="mt-4 text-base text-white/85 sm:text-lg">
                  CSR teams, NGOs, governments and technology partners — your
                  collaboration can move a community closer to a Sustainable
                  Development Goal. Let&apos;s design impact together.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
                      <Heart className="h-4 w-4" /> Volunteer With Us
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

/* ------------------------------------------------------------------ */
/*  SDG card                                                           */
/* ------------------------------------------------------------------ */

function SdgCard({ sdg }: { sdg: Sdg }) {
  const Icon = sdg.icon;
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
      {/* Color header bar — uses official SDG color via inline style */}
      <div
        className="relative flex items-center justify-between px-5 py-4 text-white"
        style={{ backgroundColor: sdg.color }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/20 backdrop-blur">
            <span className="font-poppins text-lg font-800">{sdg.number}</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
            SDG {sdg.number}
          </span>
        </div>
        <motion.div
          initial={{ rotate: -10, scale: 0.9 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="grid h-10 w-10 place-items-center rounded-lg bg-white/20 backdrop-blur"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-poppins text-lg font-700 leading-tight">
          {sdg.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {sdg.contribution}
        </p>

        <Separator className="my-4" />

        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Highlights
        </div>
        <ul className="space-y-2">
          {sdg.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm text-foreground"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: sdg.color }}
              />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent line — grows on hover */}
      <div
        className="h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: sdg.color }}
      />
    </div>
  );
}
