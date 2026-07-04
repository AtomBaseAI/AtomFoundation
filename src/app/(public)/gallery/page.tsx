"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Images,
  Play,
  X,
  Calendar,
  Tag,
  Maximize2,
  BarChart3,
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
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HeroCommunityIllustration, EmptyIllustration } from "@/components/site/svg-illustrations";
import { type GalleryItem } from "@/lib/data";
import { useContent, type ContentData } from "@/hooks/use-content";

type Category = "All" | GalleryItem["category"];

const categories: Category[] = ["All", "Events", "Training Sessions", "Certificates", "Community Outreach", "Videos"];

const categoryColors: Record<GalleryItem["category"], string> = {
  Events: "text-brand-blue",
  "Training Sessions": "text-brand-purple",
  Certificates: "text-brand-green",
  "Community Outreach": "text-brand-purple",
  Videos: "text-brand-blue",
};

const galleryStats = (count: number) => [
  { label: "Items captured", value: count * 380, suffix: "+", color: "text-brand-blue" },
  { label: "Programs documented", value: 48, suffix: "", color: "text-brand-purple" },
  { label: "Communities featured", value: 32, suffix: "", color: "text-brand-green" },
];

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: (i: GalleryItem) => void }) {
  const isVideo = item.category === "Videos";
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(item)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-xl text-left",
        item.span ? "sm:col-span-2 sm:row-span-2" : ""
      )}
    >
      <div className={cn("relative h-full min-h-[200px] bg-gradient-to-br", item.gradient)}>
        <div className="absolute inset-0 dot-pattern opacity-25" />
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/30" />

        {/* play / zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 translate-y-1 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {isVideo ? <Play className="h-6 w-6" /> : <Maximize2 className="h-5 w-5" />}
          </span>
        </div>

        {/* top-right category pill */}
        <div className="absolute right-3 top-3">
          <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">
            {isVideo && <Play className="h-3 w-3" />}
            {item.category}
          </Badge>
        </div>

        {/* bottom label */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-sm font-700 text-white drop-shadow sm:text-base">{item.title}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80">
            <Tag className="h-3 w-3" />
            {item.category}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Lightbox({ item, open, onOpenChange }: { item: GalleryItem | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <DialogTitle className="sr-only">{item?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {item?.category} — {item?.title}
        </DialogDescription>
        <div className="relative">
          <div className={cn("relative aspect-video bg-gradient-to-br", item?.gradient)}>
            <div className="absolute inset-0 dot-pattern opacity-25" />
            {item?.category === "Videos" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-soft">
                  <Play className="h-8 w-8" />
                </span>
              </div>
            )}
            <DialogClose className="absolute right-3 top-3 rounded-full bg-white/15 p-1.5 text-white backdrop-blur transition-colors hover:bg-white/25">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("gap-1", item ? categoryColors[item.category] : "")}>
                  <Tag className="h-3 w-3" />
                  {item?.category}
                </Badge>
                {item?.category === "Videos" && (
                  <Badge variant="outline" className="gap-1">
                    <Play className="h-3 w-3" /> Video highlight
                  </Badge>
                )}
              </div>
              <h3 className="mt-2 font-poppins text-xl font-800 tracking-tight sm:text-2xl">{item?.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Captured during one of our community programs across India.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/impact">
                <BarChart3 className="h-4 w-4" /> See impact
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GalleryPage() {
  const [active, setActive] = React.useState<Category>("All");
  const [selected, setSelected] = React.useState<GalleryItem | null>(null);
  const [open, setOpen] = React.useState(false);

  const { data, loading } = useContent<Pick<ContentData, "gallery">>(["gallery"]);
  const galleryItems = data?.gallery ?? [];

  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  function openItem(item: GalleryItem) {
    setSelected(item);
    setOpen(true);
  }

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const stats = galleryStats(galleryItems.length);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments from our <span className="text-gradient-brand">programs & events</span>
          </>
        }
        description="Bootcamps, graduations, hackathons and outreach drives — captured one frame at a time. Tap any moment to enlarge."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="bg-gradient-brand text-white hover:opacity-90">
            <Link href="/impact">
              <BarChart3 className="h-4 w-4" /> See impact in numbers
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/events">
              <Calendar className="h-4 w-4" /> Upcoming events
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Stats strip */}
      <section className="border-b border-border/60 py-12 sm:py-14">
        <div className="container mx-auto px-4">
          <Stagger className="mx-auto grid max-w-3xl grid-cols-3 gap-4" stagger={0.1}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center">
                  <div className={cn("font-poppins text-3xl font-800 sm:text-4xl", s.color)}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Filter + masonry */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:block">
                <HeroCommunityIllustration className="h-full w-full" />
              </div>
              <SectionHeading
                align="left"
                eyebrow="Browse"
                title="A picture of community"
                description="Filter by category to explore specific moments from our work."
                icon={Images}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {galleryItems.length}
            </div>
          </div>

          {/* filter pills */}
          <div className="mt-8 flex flex-wrap gap-2">
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
                <span className="ml-1.5 text-[10px] opacity-70">
                  {c === "All" ? galleryItems.length : galleryItems.filter((g) => g.category === c).length}
                </span>
              </button>
            ))}
          </div>

          {/* masonry-like grid using auto-rows + span */}
          <motion.div
            layout
            className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryTile key={item.id} item={item} onOpen={openItem} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 p-12 text-center">
              <div className="h-32 w-40">
                <EmptyIllustration className="h-full w-full" />
              </div>
              <p className="text-sm text-muted-foreground">No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white shadow-soft sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <Badge className="border-white/30 bg-white/15 text-white">Beyond pictures</Badge>
                  <h2 className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                    See the impact in numbers
                  </h2>
                  <p className="mt-3 text-white/85">
                    Every photo tells a story, and every story adds up to measurable change. Explore our impact dashboard for the full picture.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                    <Link href="/impact">
                      View impact dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/stories">Read stories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox item={selected} open={open} onOpenChange={setOpen} />
    </>
  );
}
