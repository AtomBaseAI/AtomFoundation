"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Cpu,
  ArrowRight,
  Send,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Quote,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PartnershipIllustration } from "@/components/site/svg-illustrations";
import { PartnerLogo } from "@/components/site/svg-logos";
import { partners, testimonials, type Partner } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PartnerType = Partner["type"];

const partnerTypeMeta: Record<
  PartnerType,
  {
    icon: typeof Building2;
    color: "blue" | "purple" | "green";
    description: string;
  }
> = {
  CSR: {
    icon: Building2,
    color: "blue",
    description:
      "CSR collaborations funding scholarships, bootcamps and community tech labs.",
  },
  "Educational Institution": {
    icon: GraduationCap,
    color: "purple",
    description:
      "Colleges and universities co-hosting cohorts, internships and certifications.",
  },
  NGO: {
    icon: HeartHandshake,
    color: "green",
    description:
      "Community NGOs extending our reach into rural and underserved regions.",
  },
  Government: {
    icon: Landmark,
    color: "blue",
    description:
      "Skill-development missions and digital India programs at state and national level.",
  },
  Technology: {
    icon: Cpu,
    color: "purple",
    description:
      "Tech companies providing credits, mentorship and hiring pathways.",
  },
};

const colorMap: Record<
  "blue" | "purple" | "green",
  { text: string; bg: string; ring: string; gradient: string }
> = {
  blue: {
    text: "text-brand-blue",
    bg: "bg-brand-blue/10",
    ring: "ring-brand-blue/20",
    gradient: "from-brand-blue/15 to-brand-blue/5",
  },
  purple: {
    text: "text-brand-purple",
    bg: "bg-brand-purple/10",
    ring: "ring-brand-purple/20",
    gradient: "from-brand-purple/15 to-brand-purple/5",
  },
  green: {
    text: "text-brand-green",
    bg: "bg-brand-green/10",
    ring: "ring-brand-green/20",
    gradient: "from-brand-green/15 to-brand-green/5",
  },
};

const partnerTypes: PartnerType[] = [
  "CSR",
  "Educational Institution",
  "NGO",
  "Government",
  "Technology",
];

const benefits = [
  {
    icon: TrendingUp,
    color: "blue" as const,
    title: "Amplify Impact",
    description:
      "Combine your resources with our delivery engine to reach thousands of learners across 32 districts — measurable, multi-state, multiplier effect.",
  },
  {
    icon: Sparkles,
    color: "purple" as const,
    title: "Co-branded Programs",
    description:
      "Launch jointly-branded bootcamps, hackathons and community drives with your team as mentors, judges and hiring partners.",
  },
  {
    icon: ShieldCheck,
    color: "green" as const,
    title: "Transparent Reporting",
    description:
      "Quarterly impact reports with attendance, outcomes, placements and audited financials — 80G & 12A compliant for CSR claims.",
  },
];

function partnerCountByType(type: PartnerType) {
  return partners.filter((p) => p.type === type).length;
}

function gradientForType(type: PartnerType) {
  const map: Record<PartnerType, string> = {
    CSR: "from-brand-blue/20 via-brand-blue/10 to-transparent",
    "Educational Institution":
      "from-brand-purple/20 via-brand-purple/10 to-transparent",
    NGO: "from-brand-green/20 via-brand-green/10 to-transparent",
    Government: "from-brand-blue/20 via-brand-purple/10 to-transparent",
    Technology: "from-brand-purple/20 via-brand-green/10 to-transparent",
  };
  return map[type];
}

function PartnerCard({ partner }: { partner: Partner }) {
  const meta = partnerTypeMeta[partner.type];
  const colors = colorMap[meta.color];
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border-border/70 shadow-soft transition-shadow hover:shadow-glow-blue py-0">
        <div className="flex items-center gap-4 p-4">
          <div
            className={cn(
              "relative flex aspect-square h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ring-1",
              gradientForType(partner.type),
              colors.ring,
            )}
          >
            <div className="absolute inset-0 dot-pattern opacity-30" />
            <PartnerLogo
              name={partner.name}
              logoText={partner.logoText}
              className="relative h-14 w-14"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-poppins text-base font-600 leading-tight">
              {partner.name}
            </h3>
            <Badge
              variant="secondary"
              className={cn("mt-2 gap-1 border-transparent", colors.bg, colors.text)}
            >
              <meta.icon className="h-3 w-3" />
              {partner.type}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function PartnerTypeCard({ type }: { type: PartnerType }) {
  const meta = partnerTypeMeta[type];
  const colors = colorMap[meta.color];
  const Icon = meta.icon;
  const count = partnerCountByType(type);
  return (
    <Card className="group relative overflow-hidden border-border/70 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow-blue py-0">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-24 bg-gradient-to-br opacity-70",
          colors.gradient,
        )}
      />
      <CardContent className="relative p-6">
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl ring-1",
            colors.bg,
            colors.text,
            colors.ring,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-poppins text-3xl font-800">{count}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            partner{count === 1 ? "" : "s"}
          </span>
        </div>
        <h3 className="mt-3 font-poppins text-lg font-600">{type}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {meta.description}
        </p>
      </CardContent>
    </Card>
  );
}

function BenefitCard({
  icon: Icon,
  color,
  title,
  description,
  index,
}: {
  icon: typeof TrendingUp;
  color: "blue" | "purple" | "green";
  title: string;
  description: string;
  index: number;
}) {
  const colors = colorMap[color];
  return (
    <StaggerItem className="h-full">
      <Card className="relative h-full overflow-hidden border-border/70 py-0">
        <div
          className={cn(
            "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl",
            colors.gradient,
          )}
        />
        <CardHeader className="relative pb-2">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
              colors.bg,
              colors.text,
              colors.ring,
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="mt-3 font-poppins text-xs font-600 uppercase tracking-widest text-muted-foreground">
            0{index + 1}
          </span>
          <CardTitle className="font-poppins text-xl font-700">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </StaggerItem>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const colors = colorMap[testimonial.color];
  return (
    <StaggerItem className="h-full">
      <Card className="relative flex h-full flex-col gap-4 overflow-hidden border-border/70 py-0">
        <div
          className={cn(
            "absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-40 blur-2xl",
            colors.gradient,
          )}
        />
        <CardContent className="relative flex flex-1 flex-col gap-4 p-6">
          <Quote
            className={cn("h-7 w-7 shrink-0", colors.text)}
            strokeWidth={2}
          />
          <p className="flex-1 text-sm leading-relaxed text-foreground/90">
            “{testimonial.quote}”
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full font-poppins text-sm font-700 ring-1",
                colors.bg,
                colors.text,
                colors.ring,
              )}
            >
              {testimonial.initials}
            </div>
            <div>
              <p className="text-sm font-600 leading-tight">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </StaggerItem>
  );
}

function PartnershipForm() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    organization: "",
    name: "",
    email: "",
    type: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.organization ||
      !form.name ||
      !form.email ||
      !form.type ||
      !form.message
    ) {
      toast.error("Please fill in all the fields before submitting.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.name} (${form.organization})`,
          email: form.email,
          subject: `Partnership Inquiry — ${form.type}`,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      toast.success("Thank you! Our partnerships team will reach out shortly.", {
        description: "We typically respond within 2 business days.",
      });
      setForm({
        organization: "",
        name: "",
        email: "",
        type: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
      aria-label="Partnership inquiry form"
    >
      <div className="space-y-1.5">
        <Label htmlFor="p-org">Organization name</Label>
        <Input
          id="p-org"
          placeholder="Acme Corp / Institute / NGO"
          value={form.organization}
          onChange={(e) => update("organization", e.target.value)}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="p-name">Contact name</Label>
        <Input
          id="p-name"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="p-email">Work email</Label>
        <Input
          id="p-email"
          type="email"
          placeholder="you@organization.org"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="p-type">Partnership type</Label>
        <Select value={form.type} onValueChange={(v) => update("type", v)}>
          <SelectTrigger id="p-type" className="w-full" aria-label="Partnership type">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {partnerTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="p-message">How would you like to partner?</Label>
        <Textarea
          id="p-message"
          rows={4}
          placeholder="Tell us about your goals, timelines and the communities you'd like to impact together."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          required
        />
      </div>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          disabled={loading}
          className="group w-full bg-gradient-brand text-white shadow-glow-purple hover:opacity-95"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit partnership inquiry
            </>
          )}
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          By submitting, you agree to be contacted by our partnerships team.
        </p>
      </div>
    </form>
  );
}

export default function PartnersPage() {
  const marqueePartners = [...partners, ...partners];

  return (
    <>
      <PageHero
        eyebrow="Our Partners"
        title={
          <>
            Impact is a <span className="text-gradient-brand">team sport</span>
          </>
        }
        description="We partner with CSR leaders, educational institutions, NGOs, government bodies and technology companies to multiply access, opportunity and outcomes for the communities we serve."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="bg-gradient-brand text-white shadow-glow-blue">
            <Link href="#become-partner">
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#why-partner">Why partner with us</Link>
          </Button>
        </div>
      </PageHero>

      {/* Partner type breakdown */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Partner Ecosystem"
            title="Five ways organizations partner with us"
            description="Each partner type plays a distinct role in our mission — combining capital, expertise, reach and credibility."
            icon={Building2}
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {partnerTypes.map((type) => (
              <StaggerItem key={type} className="h-full">
                <PartnerTypeCard type={type} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Partner grid */}
      <section className="relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="Our Network"
            title="Organizations we proudly work with"
            description="A snapshot of the 45+ partners helping us build future-ready communities across India."
            icon={HeartHandshake}
          />
          <Stagger
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            stagger={0.06}
          >
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
          </Stagger>

          {/* Marquee row */}
          <Reveal className="relative mt-14" delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 py-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
              <div className="flex w-max animate-marquee items-center gap-10 px-6">
                {marqueePartners.map((p, i) => {
                  const meta = partnerTypeMeta[p.type];
                  const colors = colorMap[meta.color];
                  return (
                    <div
                      key={`${p.name}-${i}`}
                      className="flex shrink-0 items-center gap-3"
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg bg-muted/40 ring-1",
                          colors.ring,
                        )}
                      >
                        <PartnerLogo
                          name={p.name}
                          logoText={p.logoText}
                          className="h-9 w-9"
                        />
                      </div>
                      <span className="font-poppins text-sm font-600 text-foreground/80">
                        {p.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why partner with us */}
      <section id="why-partner" className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Why Partner With Us"
            title="Three reasons organizations choose Atom Foundation"
            description="We bring delivery rigor, measurable outcomes and reporting transparency — the foundations of a partnership that lasts."
            icon={Sparkles}
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} {...b} index={i} />
            ))}
          </Stagger>

          <Reveal className="mt-12" delay={0.1}>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/15 blur-3xl" />
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="font-poppins text-xl font-700">
                    Our partnership model in numbers
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {[
                      "45+ active partners across CSR, NGO, govt & tech",
                      "32 districts reached in rural and semi-urban India",
                      "12,450+ students & 4,200+ women impacted",
                      "Quarterly reports with audited financials",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden sm:block">
                  <PartnershipIllustration className="h-32 w-40" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partnership CTA */}
      <section
        id="become-partner"
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      >
        <div className="absolute inset-0 bg-gradient-brand opacity-95" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <HeartHandshake className="h-3.5 w-3.5" />
                Become a Partner
              </span>
              <h2 className="mt-4 max-w-xl font-poppins text-3xl font-800 leading-tight text-white sm:text-4xl lg:text-5xl">
                Let&apos;s build future-ready communities together
              </h2>
              <p className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
                Tell us a little about your organization and goals. Our
                partnerships team will design a co-branded program aligned to
                your CSR, talent or community objectives.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Co-branded bootcamps & events",
                  "CSR-aligned impact programs",
                  "Hiring & internship pipelines",
                  "Volunteer engagement drives",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/20 bg-background p-6 shadow-glow-purple sm:p-8">
                <h3 className="font-poppins text-xl font-700">
                  Partnership inquiry
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill the form and our team will reach out within 2 business
                  days.
                </p>
                <div className="mt-6">
                  <PartnershipForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What Partners Say"
            title="Trusted by educators, CSR leaders and technologists"
            description="Real voices from the organizations walking this journey with us."
            icon={Quote}
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
