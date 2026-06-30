"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
  Heart,
  Users,
  Rocket,
  BarChart3,
  PieChart as PieIcon,
  Activity,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { AtomOrbits, FloatingParticles, GrowthLine } from "@/components/site/svg-decorations";
import { IndiaReachMap, ImpactIllustration } from "@/components/site/svg-illustrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { impactMetrics, timeline, type ImpactMetric } from "@/lib/data";

// Chart data
const studentsByYear = [
  { year: "2019", value: 30 },
  { year: "2020", value: 1200 },
  { year: "2021", value: 2600 },
  { year: "2022", value: 5200 },
  { year: "2023", value: 8400 },
  { year: "2024", value: 12450 },
];

const beneficiariesByProgram = [
  { name: "Students", value: 12450 },
  { name: "Women", value: 4200 },
  { name: "Schools", value: 180 },
  { name: "Volunteers", value: 320 },
];

const cumulativeGrowth = [
  { year: "2019", total: 30, women: 0, schools: 5 },
  { year: "2020", total: 1230, women: 200, schools: 38 },
  { year: "2021", total: 3830, women: 1100, schools: 78 },
  { year: "2022", total: 9030, women: 2400, schools: 122 },
  { year: "2023", total: 17430, women: 3400, schools: 160 },
  { year: "2024", total: 29880, women: 4200, schools: 180 },
];

const COLORS = {
  blue: "var(--brand-blue)",
  purple: "var(--brand-purple)",
  green: "var(--brand-green)",
  amber: "#f59e0b",
};

const PIE_COLORS = [COLORS.blue, COLORS.purple, COLORS.green, COLORS.amber];

const barColors = [COLORS.blue, COLORS.blue, COLORS.purple, COLORS.purple, COLORS.green, COLORS.green];

function colorClasses(color: ImpactMetric["color"]) {
  switch (color) {
    case "blue":
      return {
        text: "text-brand-blue",
        bg: "bg-brand-blue/10",
        ring: "ring-brand-blue/20",
        glow: "shadow-glow-blue",
        gradient: "from-brand-blue/15 to-brand-blue/5",
      };
    case "purple":
      return {
        text: "text-brand-purple",
        bg: "bg-brand-purple/10",
        ring: "ring-brand-purple/20",
        glow: "shadow-glow-purple",
        gradient: "from-brand-purple/15 to-brand-purple/5",
      };
    case "green":
      return {
        text: "text-brand-green",
        bg: "bg-brand-green/10",
        ring: "ring-brand-green/20",
        glow: "",
        gradient: "from-brand-green/15 to-brand-green/5",
      };
  }
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg border border-border/60 px-3 py-2 text-xs shadow-soft">
      {label && <div className="mb-1 font-semibold text-foreground">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.color as string }}
          />
          <span className="capitalize">{p.name}:</span>
          <span className="font-semibold text-foreground">
            {Number(p.value).toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
}

function MetricCard({ metric }: { metric: ImpactMetric }) {
  const Icon = metric.icon;
  const c = colorClasses(metric.color);
  return (
    <StaggerItem>
      <Card
        className={cn(
          "group relative overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft",
          "ring-1", c.ring
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", c.gradient)} />
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
          style={{ background: metric.color === "blue" ? "var(--brand-blue)" : metric.color === "purple" ? "var(--brand-purple)" : "var(--brand-green)" }}
        />
        <CardContent className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl", c.bg)}>
              <Icon className={cn("h-5 w-5", c.text)} />
            </div>
            <Badge variant="outline" className={cn("border-dashed", c.text)}>
              {metric.color === "blue" ? "Reach" : metric.color === "purple" ? "Impact" : "Outcome"}
            </Badge>
          </div>
          <div className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
            <AnimatedCounter
              value={metric.value}
              suffix={metric.suffix}
              className={c.text}
            />
          </div>
          <div className="mt-1.5 text-sm font-semibold text-foreground">{metric.label}</div>
          <div className="mt-1 text-xs text-muted-foreground">{metric.description}</div>
        </CardContent>
      </Card>
    </StaggerItem>
  );
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title={
          <>
            Measurable change, <span className="text-gradient-brand">transparently reported</span>
          </>
        }
        description="Every number here represents a person, a community, a future reimagined. We track our work openly — because trust is built with data, not promises."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Impact" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="bg-gradient-brand text-white hover:opacity-90">
            <Link href="/volunteer">
              <Heart className="h-4 w-4" /> Support our mission
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/stories">
              Read stories <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Key metrics grid */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Key Metrics"
            title="Numbers that tell our story"
            description="Eight indicators we track quarter over quarter — from learners reached to placement outcomes."
            icon={Target}
          />
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {impactMetrics.map((m) => (
              <MetricCard key={m.label} metric={m} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Interactive charts section */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <FloatingParticles count={10} />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Dashboard"
            title="Impact, visualized"
            description="Explore how our reach, growth and demographics have evolved since 2019."
            icon={BarChart3}
          />

          <Tabs defaultValue="reach" className="mt-10">
            <div className="flex justify-center">
              <TabsList className="bg-background/70 backdrop-blur">
                <TabsTrigger value="reach" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" /> Reach
                </TabsTrigger>
                <TabsTrigger value="growth" className="gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Growth
                </TabsTrigger>
                <TabsTrigger value="demographics" className="gap-1.5">
                  <PieIcon className="h-3.5 w-3.5" /> Demographics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="reach" className="mt-8">
              <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                        <Users className="h-4 w-4" />
                      </span>
                      Students trained per year
                    </CardTitle>
                    <CardDescription>
                      Annual learner intake across AI, software, career & school programs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={studentsByYear} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                          <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                          <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                          <Bar dataKey="value" name="Students" radius={[6, 6, 0, 0]} maxBarSize={48}>
                            {studentsByYear.map((_, i) => (
                              <Cell key={i} fill={barColors[i % barColors.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      Quick highlights
                    </CardTitle>
                    <CardDescription>Year-on-year momentum.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "2024 vs 2023", value: "+48%", sub: "students trained growth", color: "text-brand-green" },
                      { label: "Avg cohort size", value: "60", sub: "learners per cohort", color: "text-brand-blue" },
                      { label: "Annual growth rate", value: "+63%", sub: "5-year CAGR", color: "text-brand-purple" },
                      { label: "Retention", value: "92%", sub: "course completion", color: "text-brand-green" },
                    ].map((h) => (
                      <div key={h.label} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-3">
                        <div>
                          <div className="text-xs text-muted-foreground">{h.label}</div>
                          <div className="text-[11px] text-muted-foreground/80">{h.sub}</div>
                        </div>
                        <div className={cn("font-poppins text-2xl font-800", h.color)}>
                          {h.value}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="growth" className="mt-8">
              <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                        <Activity className="h-4 w-4" />
                      </span>
                      Cumulative growth over time
                    </CardTitle>
                    <CardDescription>
                      Total learners, women empowered and schools reached, year by year.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cumulativeGrowth} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                          <defs>
                            <linearGradient id="g-blue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={COLORS.blue} stopOpacity={0.4} />
                              <stop offset="100%" stopColor={COLORS.blue} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="g-purple" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={COLORS.purple} stopOpacity={0.4} />
                              <stop offset="100%" stopColor={COLORS.purple} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={COLORS.green} stopOpacity={0.4} />
                              <stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                          <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                          <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                          <Tooltip content={<ChartTooltip />} />
                          <Area type="monotone" dataKey="total" name="Total learners" stroke={COLORS.blue} strokeWidth={2.5} fill="url(#g-blue)" />
                          <Area type="monotone" dataKey="women" name="Women empowered" stroke={COLORS.purple} strokeWidth={2.5} fill="url(#g-purple)" />
                          <Area type="monotone" dataKey="schools" name="Schools reached" stroke={COLORS.green} strokeWidth={2.5} fill="url(#g-green)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                        <Rocket className="h-4 w-4" />
                      </span>
                      The trajectory
                    </CardTitle>
                    <CardDescription>From 30 students to 30,000+ lives touched.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[5/3] w-full">
                      <GrowthLine />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-poppins text-xl font-800 text-brand-blue">
                          <AnimatedCounter value={30} />
                        </div>
                        <div className="text-[11px] text-muted-foreground">2019</div>
                      </div>
                      <div>
                        <div className="font-poppins text-xl font-800 text-brand-purple">
                          <AnimatedCounter value={5200} />
                        </div>
                        <div className="text-[11px] text-muted-foreground">2022</div>
                      </div>
                      <div>
                        <div className="font-poppins text-xl font-800 text-brand-green">
                          <AnimatedCounter value={29880} suffix="+" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">2024</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demographics" className="mt-8">
              <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-2 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                        <PieIcon className="h-4 w-4" />
                      </span>
                      Beneficiaries by program
                    </CardTitle>
                    <CardDescription>Who we serve across all our initiatives.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={beneficiariesByProgram}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={3}
                            stroke="none"
                          >
                            {beneficiariesByProgram.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {beneficiariesByProgram.map((b, i) => (
                        <div key={b.name} className="flex items-center gap-2 text-xs">
                          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: PIE_COLORS[i] }} />
                          <span className="text-muted-foreground">{b.name}</span>
                          <span className="ml-auto font-semibold">{b.value.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                        <Users className="h-4 w-4" />
                      </span>
                      Program mix
                    </CardTitle>
                    <CardDescription>Distribution of beneficiaries across program types.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-2">
                      {beneficiariesByProgram.map((b, i) => {
                        const total = beneficiariesByProgram.reduce((s, x) => s + x.value, 0);
                        const pct = Math.round((b.value / total) * 100);
                        const color = PIE_COLORS[i];
                        return (
                          <div key={b.name}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{b.name}</span>
                              <span className="text-muted-foreground">
                                {b.value.toLocaleString("en-IN")} ({pct}%)
                              </span>
                            </div>
                            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-4 text-center">
                      <div>
                        <div className="font-poppins text-2xl font-800 text-brand-blue">
                          <AnimatedCounter value={73} suffix="%" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">Students</div>
                      </div>
                      <div>
                        <div className="font-poppins text-2xl font-800 text-brand-purple">
                          <AnimatedCounter value={25} suffix="%" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">Women</div>
                      </div>
                      <div>
                        <div className="font-poppins text-2xl font-800 text-brand-green">
                          <AnimatedCounter value={2} suffix="%" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">Volunteers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Regional reach */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Regional Reach"
                title="32 districts across 9 states"
                description="From the metros to the most underserved districts, our community programs reach where opportunity rarely does."
                icon={MapPin}
              />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "States", value: 9, suffix: "", color: "text-brand-blue" },
                  { label: "Districts", value: 32, suffix: "", color: "text-brand-purple" },
                  { label: "Villages", value: 240, suffix: "+", color: "text-brand-green" },
                  { label: "Rural learners", value: 5600, suffix: "+", color: "text-brand-blue" },
                  { label: "Urban learners", value: 6850, suffix: "+", color: "text-brand-purple" },
                  { label: "Languages", value: 6, suffix: "", color: "text-brand-green" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4">
                    <div className={cn("font-poppins text-2xl font-800", s.color)}>
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Karnataka", "Tamil Nadu", "Maharashtra", "Telangana", "Andhra Pradesh", "Uttar Pradesh", "Rajasthan", "West Bengal", "Punjab"].map((state) => (
                  <Badge key={state} variant="secondary" className="rounded-full">{state}</Badge>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-brand-soft blur-2xl" />
                <Card className="relative overflow-hidden border-border/60 py-0">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold">Our reach map</div>
                          <div className="text-[11px] text-muted-foreground">Pins = active districts</div>
                        </div>
                      </div>
                      <AtomOrbits className="h-10 w-10 opacity-80" />
                    </div>
                    <IndiaReachMap className="h-72 w-full max-w-md mx-auto" />
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact timeline */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Milestones"
            title="Our journey, year by year"
            description="From a single workshop for 30 students to a movement reaching thousands of communities."
            icon={CalendarDays}
          />

          <div className="relative mt-16">
            {/* center line */}
            <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-blue via-brand-purple to-brand-green md:left-1/2 md:-translate-x-px" />

            <Stagger className="space-y-10" stagger={0.12}>
              {timeline.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <StaggerItem key={m.year}>
                    <div className={cn(
                      "relative flex items-center gap-6",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    )}>
                      {/* dot */}
                      <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                        <span className="relative flex h-4 w-4">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-purple/50" />
                          <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-brand ring-4 ring-background" />
                        </span>
                      </div>

                      {/* spacer */}
                      <div className="hidden md:block md:w-1/2" />

                      {/* content */}
                      <div className={cn("ml-10 md:ml-0 md:w-1/2", isLeft ? "md:pl-10" : "md:pr-10 md:text-right")}>
                        <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft">
                          <CardContent className="p-5 sm:p-6">
                            <div className={cn("flex items-center gap-3", !isLeft && "md:flex-row-reverse")}>
                              <span className="inline-flex h-12 items-center rounded-xl bg-gradient-brand px-3 font-poppins text-lg font-800 text-white">
                                {m.year}
                              </span>
                              <h3 className="font-poppins text-base font-700 sm:text-lg">{m.title}</h3>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Gallery / video preview */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:block">
                <ImpactIllustration className="h-full w-full" />
              </div>
              <SectionHeading
                align="left"
                eyebrow="In Pictures"
                title="Moments that moved us forward"
                description="A glimpse of bootcamps, graduations and outreach drives that became memories."
                icon={PlayCircle}
              />
            </div>
            <Button asChild variant="outline">
              <Link href="/gallery">
                View full gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: "AI Bootcamp 2024", g: "from-brand-blue to-brand-purple" },
              { title: "Women Cohort 4", g: "from-brand-purple to-pink-500" },
              { title: "Hackathon 2024", g: "from-brand-green to-emerald-500" },
              { title: "School Robotics", g: "from-brand-blue to-cyan-500" },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Link href="/gallery" className="group block">
                  <div className={cn("relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br", v.g)}>
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-foreground shadow-soft transition-transform group-hover:scale-110">
                        <PlayCircle className="h-7 w-7" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-sm font-semibold text-white drop-shadow">{v.title}</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-soft sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <Badge className="border-white/30 bg-white/15 text-white">Help us scale</Badge>
                  <h2 className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                    Help us reach more communities
                  </h2>
                  <p className="mt-3 text-white/85">
                    Every contribution, every volunteer hour, every partnership extends our reach to one more learner, one more woman, one more village. Join us.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                    <Link href="/volunteer">
                      <Heart className="h-4 w-4" /> Volunteer now
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/partners">
                      Partner with us <ArrowRight className="h-4 w-4" />
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
