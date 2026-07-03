"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowRight as ArrowRightIcon,
  Quote,
  Sparkles,
  Heart,
  Users,
  Briefcase,
  Rocket,
  GraduationCap,
  Star,
  X,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AvatarSvg } from "@/components/site/svg-logos";
import { HeroCommunityIllustration, EmptyIllustration } from "@/components/site/svg-illustrations";
import { stories, type Story } from "@/lib/data";

type Category = "All" | Story["category"];

const categories: Category[] = ["All", "Student", "Women Entrepreneur", "Placement", "Volunteer"];

const categoryConfig: Record<Story["category"], { color: string; bg: string; text: string; gradient: string }> = {
  Student: { color: "blue", bg: "bg-brand-blue/10", text: "text-brand-blue", gradient: "from-brand-blue to-brand-purple" },
  "Women Entrepreneur": { color: "purple", bg: "bg-brand-purple/10", text: "text-brand-purple", gradient: "from-brand-purple to-pink-500" },
  Placement: { color: "green", bg: "bg-brand-green/10", text: "text-brand-green", gradient: "from-brand-green to-emerald-500" },
  Volunteer: { color: "blue", bg: "bg-brand-blue/10", text: "text-brand-blue", gradient: "from-brand-blue to-cyan-500" },
};

const avatarVariant: Record<Story["category"], "blue" | "purple" | "green" | "brand"> = {
  Student: "blue",
  "Women Entrepreneur": "purple",
  Placement: "green",
  Volunteer: "brand",
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const stats = [
  { label: "Placements in 2024", value: 480, suffix: "+", icon: Briefcase, color: "text-brand-green" },
  { label: "Women entrepreneurs", value: 320, suffix: "+", icon: Rocket, color: "text-brand-purple" },
  { label: "Active mentors", value: 65, suffix: "+", icon: Users, color: "text-brand-blue" },
  { label: "Avg package", value: 4.8, suffix: " LPA", icon: Star, color: "text-brand-green", decimals: 1 },
];

function StoryCard({ story, onOpen }: { story: Story; onOpen: (s: Story) => void }) {
  const cc = categoryConfig[story.category];
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(story)}
      className="group text-left"
    >
      <Card className="flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
        {/* gradient header */}
        <div className={cn("relative h-28 bg-gradient-to-br", cc.gradient)}>
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute -bottom-7 left-5 h-16 w-16 overflow-hidden rounded-full shadow-soft ring-1 ring-border/60">
            <AvatarSvg initials={initialsOf(story.name)} variant={avatarVariant[story.category]} className="h-full w-full" />
          </div>
          <div className="absolute right-3 top-3">
            <Badge className={cn("border-transparent bg-white/20 text-white backdrop-blur")}>
              {story.category}
            </Badge>
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-5 pt-9">
          <h3 className="font-poppins text-lg font-700 leading-tight tracking-tight">{story.name}</h3>
          <div className={cn("mt-0.5 text-xs font-medium", cc.text)}>{story.role}</div>

          <div className="mt-3 flex items-start gap-2">
            <Quote className={cn("h-4 w-4 shrink-0", cc.text)} />
            <p className="text-sm italic text-muted-foreground line-clamp-3">"{story.quote}"</p>
          </div>

          {/* before → after */}
          <div className="mt-4 rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">Before</div>
                <p className="text-xs text-foreground/80 line-clamp-2">{story.before}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-brand-purple">
                <span className="h-px w-6 bg-brand-purple/40" />
                <ChevronRight className="h-3 w-3" /> After
              </div>
              <div>
                <p className="text-xs text-foreground/80 line-clamp-2">{story.after}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 text-xs">
            <span className="text-muted-foreground">Read full journey</span>
            <ArrowRightIcon className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", cc.text)} />
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

function FeaturedStory({ story, onOpen }: { story: Story; onOpen: (s: Story) => void }) {
  const cc = categoryConfig[story.category];
  return (
    <Reveal>
      <Card className="overflow-hidden border-border/60 py-0">
        <div className="grid lg:grid-cols-5">
          {/* left visual */}
          <div className={cn("relative min-h-[260px] bg-gradient-to-br p-8 text-white lg:col-span-2", cc.gradient)}>
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <Badge className="w-fit border-white/30 bg-white/15 text-white">Featured story</Badge>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-full shadow-soft ring-2 ring-white/50">
                  <AvatarSvg initials={initialsOf(story.name)} variant={avatarVariant[story.category]} className="h-full w-full" />
                </div>
                <div>
                  <div className="font-poppins text-2xl font-800 tracking-tight">{story.name}</div>
                  <div className="text-sm text-white/85">{story.role}</div>
                </div>
              </div>
              <div className="mt-6 h-32 w-full max-w-[240px]">
                <HeroCommunityIllustration className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* right content */}
          <CardContent className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("border-transparent", cc.bg, cc.text)}>{story.category}</Badge>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" /> Transformation journey
              </Badge>
            </div>
            <p className="mt-4 font-poppins text-xl font-600 italic leading-relaxed sm:text-2xl">
              "{story.quote}"
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{story.journey}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">Before</div>
                <p className="mt-1 text-sm text-foreground/85">{story.before}</p>
              </div>
              <div className="rounded-lg border border-brand-green/30 bg-brand-green/5 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-green">After</div>
                <p className="mt-1 text-sm text-foreground/85">{story.after}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-gradient-brand text-white" onClick={() => onOpen(story)}>
                Read full journey <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline">
                <Link href="/programs">Join a program</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Reveal>
  );
}

function StoryDialog({ story, open, onOpenChange }: { story: Story | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!story) return null;
  const cc = categoryConfig[story.category];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className={cn("relative -m-6 mb-2 h-32 bg-gradient-to-br p-6", cc.gradient)}>
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full shadow-soft ring-2 ring-white/50">
                <AvatarSvg initials={initialsOf(story.name)} variant={avatarVariant[story.category]} className="h-full w-full" />
              </div>
              <div>
                <DialogTitle className="text-white">{story.name}</DialogTitle>
                <DialogDescription className="text-white/85">{story.role}</DialogDescription>
              </div>
            </div>
            <DialogClose className="absolute right-4 top-4 rounded-full bg-white/15 p-1.5 text-white transition-colors hover:bg-white/25">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="space-y-4 px-1 pb-2">
          <div className="flex flex-wrap gap-2">
            <Badge className={cn("border-transparent", cc.bg, cc.text)}>{story.category}</Badge>
          </div>
          <div className="flex items-start gap-2">
            <Quote className={cn("h-5 w-5 shrink-0", cc.text)} />
            <p className="text-base italic text-muted-foreground">"{story.quote}"</p>
          </div>
          <p className="text-sm text-foreground/90">{story.journey}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">Before</div>
              <p className="mt-1 text-sm text-foreground/85">{story.before}</p>
            </div>
            <div className="rounded-lg border border-brand-green/30 bg-brand-green/5 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-green">After</div>
              <p className="mt-1 text-sm text-foreground/85">{story.after}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function StoriesPage() {
  const [active, setActive] = React.useState<Category>("All");
  const [selected, setSelected] = React.useState<Story | null>(null);
  const [open, setOpen] = React.useState(false);

  const featured = stories[0];
  const rest = stories.slice(1);
  const filtered = active === "All" ? rest : rest.filter((s) => s.category === active);

  function openStory(s: Story) {
    setSelected(s);
    setOpen(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title={
          <>
            Real journeys of <span className="text-gradient-brand">transformation</span>
          </>
        }
        description="Behind every metric is a person whose life changed course. Meet the students, women, and mentors who make Atom Arc Foundation what it is."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Stories" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="bg-gradient-brand text-white hover:opacity-90">
            <Link href="/programs">
              <GraduationCap className="h-4 w-4" /> Join a program
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/volunteer">
              Become a mentor <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Stats strip */}
      <section className="border-b border-border/60 py-12 sm:py-14">
        <div className="container mx-auto px-4">
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.08}>
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.label}>
                  <Card className="py-0">
                    <CardContent className="flex items-center gap-4 p-5">
                      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted", s.color)}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className={cn("font-poppins text-2xl font-800 sm:text-3xl", s.color)}>
                          <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                        </div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Featured story */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <FeaturedStory story={featured} onOpen={openStory} />
        </div>
      </section>

      {/* Filter + grid */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="More Stories"
            title="Lives, transformed"
            description="Filter by category to see the kind of change that resonates with you."
            icon={Heart}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                  active === c
                    ? "border-transparent bg-gradient-brand text-white shadow-soft"
                    : "border-border/60 bg-background hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {c}
                {c !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    {stories.filter((s) => s.category === c).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <StoryCard key={s.id} story={s} onOpen={openStory} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 p-12 text-center">
              <div className="h-32 w-40">
                <EmptyIllustration className="h-full w-full" />
              </div>
              <p className="text-sm text-muted-foreground">No stories in this category yet — check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-soft sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <Badge className="border-white/30 bg-white/15 text-white">Your turn</Badge>
                  <h2 className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                    Start your story with us
                  </h2>
                  <p className="mt-3 text-white/85">
                    Every transformation above started with one decision: to show up. Whether you're a learner or a mentor, your next chapter could be next.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                    <Link href="/programs">
                      Explore programs <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/volunteer">Volunteer with us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StoryDialog story={selected} open={open} onOpenChange={setOpen} />
    </>
  );
}
