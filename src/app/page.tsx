"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Users,
  Handshake,
  GraduationCap,
  Sparkles,
  Quote,
  Calendar,
  MapPin,
  Rocket,
  Target,
  Eye,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem, FadeIn } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AtomOrbits,
  FloatingParticles,
  NodeNetwork,
  GrowthLine,
  WaveDivider,
} from "@/components/site/svg-decorations";
import {
  HeroCommunityIllustration,
  EventIllustration,
  ImpactIllustration,
  programIllustrations,
} from "@/components/site/svg-illustrations";
import { AvatarSvg, PartnerLogo } from "@/components/site/svg-logos";
import {
  programs,
  impactMetrics,
  sdgs,
  events,
  stories,
  partners,
  testimonials,
  site,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSnapshot />
      <FocusAreas />
      <ImpactSection />
      <SuccessStories />
      <SdgSection />
      <UpcomingEvents />
      <PartnersMarquee />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yOrbits = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-brand-soft"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
      <FloatingParticles count={16} />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-brand-purple/20 blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />

      <div className="container relative mx-auto grid items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Text column */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            Empowering 12,450+ learners across 32 districts
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-poppins text-4xl font-800 leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Building Future-Ready Communities Through{" "}
            <span className="text-gradient-brand">Technology & Education</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            We empower every student and woman with future-ready technology
            skills — AI, software, career readiness and digital literacy — for
            sustainable careers and inclusive growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="bg-gradient-brand shadow-glow-blue">
              <Link href="/programs">
                <GraduationCap className="mr-2 h-5 w-5" /> Join Training
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/volunteer">
                <Users className="mr-2 h-5 w-5" /> Become Volunteer
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/partners">
                <Handshake className="mr-2 h-5 w-5" /> Partner With Us
              </Link>
            </Button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4"
          >
            {[
              { label: "Students Trained", value: 12450, suffix: "+" },
              { label: "Women Empowered", value: 4200, suffix: "+" },
              { label: "Schools Reached", value: 180, suffix: "+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-poppins text-2xl font-800 text-gradient-brand sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={2.2} />
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual column */}
        <motion.div
          style={{ y: yOrbits }}
          className="relative lg:col-span-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <AtomOrbits className="h-full w-full" />
            {/* Centered community scene illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute inset-0 grid place-items-center p-16"
            >
              <HeroCommunityIllustration className="h-full w-full drop-shadow-sm" />
            </motion.div>
            {/* Floating cards */}
            <motion.div
              className="absolute -left-2 top-12 glass rounded-2xl border border-border/60 p-3 shadow-soft sm:left-0"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue/15 text-brand-blue">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-700">AI Training</div>
                  <div className="text-[10px] text-muted-foreground">GenAI · ML · Prompts</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-1 top-1/3 glass rounded-2xl border border-border/60 p-3 shadow-soft sm:right-0"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-purple/15 text-brand-purple">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-700">Women Empowerment</div>
                  <div className="text-[10px] text-muted-foreground">4,200+ empowered</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-1/4 glass rounded-2xl border border-border/60 p-3 shadow-soft"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-green/15 text-brand-green">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-700">68% Placed</div>
                  <div className="text-[10px] text-muted-foreground">Career readiness</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1.5">
          <span className="h-2 w-1 rounded-full bg-muted-foreground/60" />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MISSION SNAPSHOT                                                    */
/* ------------------------------------------------------------------ */

const missionCards = [
  { icon: Target, title: "Mission", text: "Democratize future-ready tech education.", color: "blue" },
  { icon: Eye, title: "Vision", text: "Sustainable careers & inclusive growth for all.", color: "purple" },
  { icon: Rocket, title: "Approach", text: "Learning by doing — real projects, real impact.", color: "green" },
  { icon: Handshake, title: "Partnerships", text: "CSR, NGOs, government & tech — together.", color: "blue" },
] as const;

function MissionSnapshot() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge variant="secondary" className="mb-4">
              <Target className="mr-1.5 h-3.5 w-3.5" /> Our Mission
            </Badge>
            <h2 className="font-poppins text-3xl font-700 tracking-tight sm:text-4xl">
              Democratizing access to{" "}
              <span className="text-gradient-brand">future-ready skills</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {site.mission}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/about">
                  Learn about us <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="bg-gradient-brand">
                <Link href="/impact">
                  See our impact <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-4 sm:grid-cols-2">
              {missionCards.map((c) => {
                const cm = colorMap[c.color];
                return (
                  <motion.div
                    key={c.title}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
                  >
                    <span className={`mb-3 inline-grid h-10 w-10 place-items-center rounded-xl ${cm.bg} ${cm.text}`}>
                      <c.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-poppins text-base font-700">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FOCUS AREAS (PROGRAMS)                                              */
/* ------------------------------------------------------------------ */

const colorMap: Record<string, { text: string; bg: string; border: string; grad: string }> = {
  blue: { text: "text-brand-blue", bg: "bg-brand-blue/10", border: "group-hover:border-brand-blue/40", grad: "from-brand-blue/15" },
  purple: { text: "text-brand-purple", bg: "bg-brand-purple/10", border: "group-hover:border-brand-purple/40", grad: "from-brand-purple/15" },
  green: { text: "text-brand-green", bg: "bg-brand-green/10", border: "group-hover:border-brand-green/40", grad: "from-brand-green/15" },
};

function FocusAreas() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Our Focus Areas"
          title={<>Programs that build <span className="text-gradient-brand">future-ready careers</span></>}
          description="From AI and software development to women empowerment and school programs — we meet learners where they are."
          icon={Sparkles}
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {programs.map((p) => {
            const c = colorMap[p.color];
            return (
              <StaggerItem key={p.id}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link
                    href={`/programs#${p.id}`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${c.grad} to-card p-6 shadow-soft transition-colors ${c.border}`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`grid h-12 w-12 place-items-center rounded-xl ${c.bg} ${c.text}`}>
                        <p.icon className="h-6 w-6" />
                      </span>
                      <ArrowUpRight className={`h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${c.text}`} />
                    </div>
                    <h3 className="font-poppins text-lg font-700">{p.title}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{p.tagline}</p>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.modules.slice(0, 3).map((m) => (
                        <Badge key={m.name} variant="secondary" className="text-[10px]">
                          {m.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{p.duration}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span>{p.level}</span>
                    </div>
                    {/* Themed SVG illustration footer */}
                    <div className="pointer-events-none relative mt-4 -mb-2 h-24 w-full opacity-80 transition-transform duration-300 group-hover:scale-105">
                      {(() => {
                        const Ill = programIllustrations[p.id];
                        return Ill ? <Ill className="h-full w-full" /> : null;
                      })()}
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
          {/* CTA card */}
          <StaggerItem>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link
                href="/programs"
                className="group relative flex h-full flex-col justify-center overflow-hidden rounded-2xl bg-gradient-brand p-6 text-white shadow-glow-purple"
              >
                <Rocket className="mb-3 h-8 w-8" />
                <h3 className="font-poppins text-lg font-700">Explore all programs</h3>
                <p className="mt-1 text-sm text-white/85">
                  Find the right track for your goals and start learning today.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  View programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IMPACT METRICS                                                      */
/* ------------------------------------------------------------------ */

function ImpactSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Our Impact"
            title={<>Numbers that tell a <span className="text-gradient-brand">real story</span></>}
            description="Every number represents a learner, a woman, a school and a community moving toward a better future."
            icon={Target}
          />
          <FadeIn delay={0.2} className="lg:justify-self-end">
            <div className="flex w-full max-w-md items-end gap-4">
              <div className="h-20 w-28 shrink-0">
                <ImpactIllustration className="h-full w-full" />
              </div>
              <div className="flex-1">
                <GrowthLine className="h-28 w-full" />
                <p className="mt-2 text-right text-xs text-muted-foreground">
                  Cumulative learners reached · 2019 → 2024
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.07}>
          {impactMetrics.map((m) => {
            const c = colorMap[m.color];
            return (
              <StaggerItem key={m.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
                >
                  <span className={`mb-3 inline-grid h-10 w-10 place-items-center rounded-xl ${c.bg} ${c.text}`}>
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div className={`font-poppins text-3xl font-800 ${c.text}`}>
                    <AnimatedCounter value={m.value} suffix={m.suffix} duration={2} />
                  </div>
                  <div className="mt-1 text-sm font-semibold">{m.label}</div>
                  <div className="text-xs text-muted-foreground">{m.description}</div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/impact">
              Explore the impact dashboard <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SUCCESS STORIES                                                     */
/* ------------------------------------------------------------------ */

function SuccessStories() {
  const featured = stories.slice(0, 3);
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Success Stories"
          title={<>Real journeys of <span className="text-gradient-brand">transformation</span></>}
          description="From first-time coders to placed developers, from homakers to entrepreneurs — meet the people whose lives changed."
          icon={Star}
        />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {featured.map((s) => (
            <StaggerItem key={s.id}>
              <motion.article
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
              >
                <Quote className="h-7 w-7 text-brand-purple/40" />
                <p className="mt-3 flex-1 text-sm italic text-foreground/90">"{s.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-border/40">
                    <AvatarSvg
                      initials={s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      variant={s.category === "Women Entrepreneur" ? "purple" : s.category === "Placement" ? "green" : s.category === "Volunteer" ? "brand" : "blue"}
                    />
                  </span>
                  <div>
                    <div className="text-sm font-700">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role}</div>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-[10px]">{s.category}</Badge>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/stories">
              Read more stories <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SDG COMMITMENT                                                      */
/* ------------------------------------------------------------------ */

function SdgSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="SDG Commitment"
              title={<>Aligned with the <span className="text-gradient-brand">UN Global Goals</span></>}
              description="Our work directly advances six Sustainable Development Goals — building a more equitable, educated and prosperous world."
              icon={Target}
            />
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/sdgs">
                  Explore SDGs <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.06}>
              {sdgs.map((sdg) => (
                <StaggerItem key={sdg.number}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow-soft"
                  >
                    <div
                      className="absolute left-0 top-0 h-1.5 w-full"
                      style={{ backgroundColor: sdg.color }}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className="grid h-9 w-9 place-items-center rounded-lg font-poppins text-sm font-800 text-white"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.number}
                      </span>
                      <sdg.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="mt-3 font-poppins text-sm font-700 leading-tight">{sdg.title}</h3>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* UPCOMING EVENTS                                                     */
/* ------------------------------------------------------------------ */

function UpcomingEvents() {
  const upcoming = events.filter((e) => e.status === "upcoming").slice(0, 3);
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Upcoming Events"
            title={<>Join us at our next <span className="text-gradient-brand">event</span></>}
            description="Bootcamps, hackathons, workshops and community drives — there's something for everyone."
            icon={Calendar}
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/events">
              All events <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {upcoming.map((e) => (
            <StaggerItem key={e.id}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft"
              >
                <div className="relative h-28 overflow-hidden bg-gradient-brand">
                  <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-28 opacity-60">
                    <EventIllustration className="h-full w-full" />
                  </div>
                  <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-center">
                    <div className="font-poppins text-lg font-800 leading-none text-foreground">
                      {new Date(e.date).getDate()}
                    </div>
                    <div className="text-[10px] font-700 uppercase text-muted-foreground">
                      {new Date(e.date).toLocaleDateString("en-IN", { month: "short" })}
                    </div>
                  </div>
                  <Badge className="absolute right-4 top-4 bg-white/90 text-foreground hover:bg-white">
                    {e.type}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-poppins text-base font-700 leading-snug">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{e.description}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {fmt(e.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {e.location}
                    </span>
                  </div>
                  <Link
                    href="/events"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Register now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PARTNERS MARQUEE                                                    */
/* ------------------------------------------------------------------ */

function PartnersMarquee() {
  const loop = [...partners, ...partners];
  return (
    <section className="overflow-hidden py-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <p className="text-center font-poppins text-sm font-700 uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by CSR partners, institutions, NGOs & government
          </p>
        </FadeIn>
      </div>
      <div className="group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {loop.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card px-5 py-3"
            >
              <span className="h-9 w-9">
                <PartnerLogo name={p.name} logoText={p.logoText} />
              </span>
              <span className="whitespace-nowrap text-sm font-600">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto mt-8 flex justify-center px-4">
        <Button asChild variant="outline">
          <Link href="/partners">
            Meet all our partners <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TESTIMONIALS                                                        */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>What our community <span className="text-gradient-brand">says about us</span></>}
          description="Principals, CSR heads and mentors share why they believe in Atom Arc Foundation."
          icon={Quote}
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t) => {
            const c = colorMap[t.color];
            return (
              <StaggerItem key={t.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
                >
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic text-foreground/90">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-border/40">
                      <AvatarSvg initials={t.initials} variant={t.color} />
                    </span>
                    <div>
                      <div className="text-sm font-700">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FINAL CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white shadow-glow-purple sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative mx-auto max-w-2xl">
              <Sparkles className="mx-auto mb-4 h-8 w-8" />
              <h2 className="font-poppins text-3xl font-800 tracking-tight sm:text-4xl lg:text-5xl">
                Be part of building future-ready communities
              </h2>
              <p className="mt-4 text-base text-white/90 sm:text-lg">
                Whether you're a student, a volunteer or a partner —
                there's a role for you in this movement.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/programs">
                    <GraduationCap className="mr-2 h-5 w-5" /> Join a Program
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/volunteer">
                    <Users className="mr-2 h-5 w-5" /> Volunteer
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/partners">
                    <Handshake className="mr-2 h-5 w-5" /> Partner With Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
