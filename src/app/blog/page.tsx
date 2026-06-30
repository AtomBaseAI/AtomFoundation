"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Mail,
  Sparkles,
  Loader2,
  Rss,
  PenLine,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { BlogIllustration, EmptyIllustration } from "@/components/site/svg-illustrations";
import { blogPosts, type BlogPost } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories: ("All" | BlogPost["category"])[] = [
  "All",
  "AI",
  "Technology",
  "Career",
  "Education",
  "Women Empowerment",
  "Success Stories",
  "Research",
];

function categoryColor(category: BlogPost["category"]) {
  const map: Record<BlogPost["category"], string> = {
    AI: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    Technology:
      "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
    Career: "bg-brand-green/10 text-brand-green border-brand-green/20",
    Education:
      "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    "Women Empowerment":
      "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
    "Success Stories":
      "bg-brand-green/10 text-brand-green border-brand-green/20",
    Research:
      "bg-brand-blue/10 text-brand-purple border-brand-purple/20",
  };
  return map[category];
}

function formatNiceDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function initialsFor(name: string) {
  return name
    .replace(/^Dr\.?\s+|Prof\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <Card className="group overflow-hidden border-border/70 shadow-soft transition-shadow hover:shadow-glow-purple py-0">
        <div className="grid lg:grid-cols-2">
          <div
            className={cn(
              "relative min-h-[260px] overflow-hidden bg-gradient-to-br",
              post.gradient,
            )}
          >
            <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              <div className="flex items-center justify-between">
                <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </Badge>
                <Badge
                  variant="secondary"
                  className="border-white/30 bg-white/15 text-white backdrop-blur"
                >
                  {post.category}
                </Badge>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-poppins text-5xl font-800 leading-none tracking-tight opacity-90"
              >
                {initialsFor(post.author)}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatNiceDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PenLine className="h-3.5 w-3.5" />
                {post.author}
              </span>
            </div>
            <h2 className="font-poppins text-2xl font-800 leading-tight tracking-tight sm:text-3xl">
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {post.excerpt}
            </p>
            <div className="mt-2">
              <Button asChild className="bg-gradient-brand text-white shadow-glow-blue">
                <Link href="#">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border-border/70 shadow-soft transition-shadow hover:shadow-glow-blue py-0">
        <div
          className={cn(
            "relative h-40 overflow-hidden bg-gradient-to-br",
            post.gradient,
          )}
        >
          <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
          <div className="absolute inset-0 flex items-end justify-between p-4">
            <Badge
              variant="secondary"
              className={cn(
                "border-transparent bg-white/20 text-white backdrop-blur",
              )}
            >
              {post.category}
            </Badge>
            <span className="font-poppins text-3xl font-800 text-white/80">
              {initialsFor(post.author)}
            </span>
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-5 pt-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatNiceDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3 className="font-poppins text-lg font-700 leading-snug tracking-tight">
            {post.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-1 flex items-center justify-between border-t border-border/60 pt-3">
            <span className="text-xs font-medium text-foreground/80">
              {post.author}
            </span>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-xs font-600 text-primary transition-colors hover:text-primary/80"
            >
              Read
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      toast.success("You're on the list!", {
        description: "Watch your inbox for fresh insights every week.",
      });
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal>
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft p-8 shadow-soft sm:p-12">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-brand-purple/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Rss className="h-3.5 w-3.5" />
                Newsletter
              </span>
              <h2 className="mt-4 font-poppins text-3xl font-800 leading-tight tracking-tight sm:text-4xl">
                Get fresh insights on{" "}
                <span className="text-gradient-brand">AI, careers & community</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                Join 3,000+ readers getting our latest articles, program
                highlights and impact stories — straight to your inbox, no spam.
              </p>
            </div>
            <form
              onSubmit={onSubscribe}
              className="flex flex-col gap-3 sm:flex-row"
              aria-label="Newsletter subscribe form"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@email.com"
                  className="h-11 pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="h-11 bg-gradient-brand text-white shadow-glow-purple"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function BlogPage() {
  const [active, setActive] = React.useState<(typeof categories)[number]>(
    "All",
  );

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);
  const filtered =
    active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title={
          <>
            Ideas on{" "}
            <span className="text-gradient-brand">
              AI, careers, education & community
            </span>
          </>
        }
        description="Stories, frameworks and lessons from the Atom Foundation team and our community — written for educators, students, partners and the curious."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Featured post */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Featured"
              title="Editor's pick"
              icon={Sparkles}
            />
            <BlogIllustration className="hidden h-24 w-32 sm:block" />
          </div>
          <div className="mt-8">
            <FeaturedPost post={featured} />
          </div>
        </div>
      </section>

      {/* Category filter + grid */}
      <section className="border-t border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="All Articles"
            title="Browse by category"
            description="Filter our latest writing by what matters to you — from AI fundamentals to women empowerment journeys."
          />

          <Reveal className="mt-10" delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = active === cat;
                const count =
                  cat === "All"
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-600 transition-all sm:text-sm",
                      isActive
                        ? "border-transparent bg-gradient-brand text-white shadow-glow-blue"
                        : "border-border/70 bg-background text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    {cat}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-700",
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <Reveal className="mt-12">
              <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-border/70 bg-background/60 p-8 text-center">
                <EmptyIllustration className="h-32 w-40" />
                <p className="text-sm text-muted-foreground">
                  No articles in this category yet. Check back soon — we publish
                  new pieces every week.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 lg:py-24">
        <NewsletterCTA />
      </section>
    </>
  );
}
