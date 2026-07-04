"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  HeartHandshake,
  Users,
  Award,
  ArrowRight,
  ArrowDown,
  HandHeart,
  Clock,
  MapPin,
  Loader2,
  Send,
  GraduationCap,
  Code2,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  Heart,
  type LucideIcon,
  Lock,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { VolunteerIllustration } from "@/components/site/svg-illustrations";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { useContent, type ContentData } from "@/hooks/use-content";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { Icon } from "@/components/site/icon";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const benefitCards: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "blue" | "purple" | "green";
}[] = [
  {
    icon: HeartHandshake,
    title: "Make Real Impact",
    description:
      "Mentor a learner, build a tool, or run a drive — see your time translate directly into changed lives and new careers.",
    color: "blue",
  },
  {
    icon: Sparkles,
    title: "Grow Your Skills",
    description:
      "Sharpen your teaching, leadership and product skills by working on real projects with a diverse, mission-driven team.",
    color: "purple",
  },
  {
    icon: Users,
    title: "Join a Community",
    description:
      "Become part of a 320+ strong network of mentors, engineers, organisers and changemakers across 9 Indian states.",
    color: "green",
  },
  {
    icon: Award,
    title: "Get Certified",
    description:
      "Active volunteers earn an Atom Arc Foundation volunteer certificate and a letter of appreciation after each cohort cycle.",
    color: "blue",
  },
];

const colorMap: Record<
  "blue" | "purple" | "green",
  {
    text: string;
    bg: string;
    border: string;
    softBorder: string;
    gradient: string;
    solid: string;
  }
> = {
  blue: {
    text: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/40",
    softBorder: "border-brand-blue/30",
    gradient: "from-brand-blue/15 to-brand-blue/5",
    solid: "bg-brand-blue text-brand-blue-foreground",
  },
  purple: {
    text: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "border-brand-purple/40",
    softBorder: "border-brand-purple/30",
    gradient: "from-brand-purple/15 to-brand-purple/5",
    solid: "bg-brand-purple text-brand-purple-foreground",
  },
  green: {
    text: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/40",
    softBorder: "border-brand-green/30",
    gradient: "from-brand-green/15 to-brand-green/5",
    solid: "bg-brand-green text-brand-green-foreground",
  },
};

const availabilityOptions = [
  "Weekday evenings",
  "Weekends",
  "Flexible",
] as const;

/* -------------------------------------------------------------------------- */
/*  Volunteer page                                                            */
/* -------------------------------------------------------------------------- */

export default function VolunteerPage() {
  const { isFormVisible } = usePageVisibility();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    skills: "",
    availability: "",
    motivation: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const { data, loading } = useContent<
    Pick<ContentData, "volunteer-roles" | "volunteer-faqs" | "impact">
  >(["volunteer-roles", "volunteer-faqs", "impact"]);
  const volunteerRoles = data?.["volunteer-roles"] ?? [];
  const volunteerFaqs = data?.["volunteer-faqs"] ?? [];
  const impactMetrics = data?.impact ?? [];

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const volunteerStats = [
    { ...impactMetrics[3] }, // Active Volunteers 320+
    { ...impactMetrics[0] }, // Students Trained 12,450+
    { ...impactMetrics[4] }, // Training Hours 86,000+
  ];

  const roleOptions = [
    ...volunteerRoles.map((r) => r.title),
    "Other",
  ] as const;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRoleApply = (roleTitle: string) => {
    setForm((f) => ({ ...f, role: roleTitle }));
    scrollTo("apply");
    toast.info(`Role pre-selected: ${roleTitle}`, {
      description: "Just fill in your details below and submit.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.role) {
      toast.error("Please fill your name, email, phone and role.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Submission failed.");
      }
      toast.success("Application received — thank you!", {
        description:
          "Our volunteer coordinator will reach out within 2–3 working days.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        location: "",
        skills: "",
        availability: "",
        motivation: "",
      });
      scrollTo("apply");
    } catch (err) {
      toast.error("Couldn't submit your application", {
        description:
          err instanceof Error ? err.message : "Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <PageHero
        eyebrow="Volunteer"
        title={
          <>
            Give your time, <span className="text-gradient-brand">change a future</span>
          </>
        }
        description="Mentor a learner, build tools that scale, run a community drive — whatever your skill, there is a place for you at Atom Arc Foundation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Volunteer" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="bg-gradient-brand text-white shadow-soft hover:opacity-95"
            onClick={() => scrollTo("apply")}
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/70"
            onClick={() => scrollTo("roles")}
          >
            Explore Roles
            <ArrowDown className="h-4 w-4" />
          </Button>
          <div className="hidden sm:block">
            <VolunteerIllustration className="h-24 w-32" />
          </div>
        </div>
      </PageHero>

      {/* ---------------------------------------------------- Why Volunteer */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Why volunteer"
              title="Time you give. Impact you can see."
              description="Volunteering with us isn't a checkbox — it's a hands-on way to grow while creating measurable change in someone's life."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefitCards.map((b) => {
              const c = colorMap[b.color];
              return (
                <StaggerItem key={b.title}>
                  <Card className="group relative h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.gradient}`}
                    />
                    <CardHeader className="pb-3">
                      <div
                        className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-1 ${c.softBorder}`}
                      >
                        <b.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{b.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {b.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------------------------- Open Roles */}
      <section
        id="roles"
        className="scroll-mt-24 border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Open roles"
              icon={Briefcase}
              title="Find the role that fits you"
              description="Most roles need 2–6 hours a week. Click Apply on any role to pre-select it in the form below."
            />
          </Reveal>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {volunteerRoles.map((role) => {
              const color = (
                ["blue", "purple", "green", "blue"] as const
              )[volunteerRoles.indexOf(role) % 4];
              const c = colorMap[color];
              return (
                <StaggerItem key={role.title}>
                  <Card
                    className={`group flex h-full flex-col overflow-hidden border ${c.softBorder} bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft`}
                  >
                    <CardHeader className="pb-3">
                      <div
                        className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-1 ${c.softBorder}`}
                      >
                        <Icon name={role.icon} className="h-6 w-6" />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-lg leading-snug">
                          {role.title}
                        </CardTitle>
                      </div>
                      <div className="mt-2">
                        <Badge
                          variant="secondary"
                          className={`gap-1.5 ${c.bg} ${c.text} border ${c.softBorder}`}
                        >
                          <Clock className="h-3 w-3" />
                          {role.commitment}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {role.description}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className={`mt-5 w-full gap-1.5 border ${c.border} ${c.text} hover:${c.bg}`}
                        onClick={() => handleRoleApply(role.title)}
                      >
                        Apply for this role
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------------------- Volunteer Impact */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Volunteer impact"
              icon={Heart}
              title="A community 320+ strong — and growing"
              description="Our volunteers power every program we run. Here's what the collective has achieved together."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
            {volunteerStats.map((s) => {
              const c = colorMap[s.color];
              return (
                <StaggerItem key={s.label}>
                  <Card className="relative overflow-hidden border-border/60 bg-card/80 backdrop-blur">
                    <CardContent className="flex items-center gap-5 p-6">
                      <div
                        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.bg} ${c.text} ring-1 ${c.softBorder}`}
                      >
                        <Icon name={s.icon} className="h-7 w-7" />
                      </div>
                      <div>
                        <div className={`font-poppins text-3xl font-800 ${c.text}`}>
                          <AnimatedCounter
                            value={s.value}
                            suffix={s.suffix ?? ""}
                          />
                        </div>
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.description}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------------------- Application Form */}
      <section
        id="apply"
        className="scroll-mt-24 border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            {/* Left — heading + side info */}
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <SectionHeading
                  align="left"
                  eyebrow="Apply now"
                  icon={Send}
                  title="Tell us about you"
                  description="Fill the form — our volunteer coordinator will match you to a role and reach out within 2–3 working days."
                />
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" />
                    Free to join — no fees, ever.
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" />
                    Most roles are remote-friendly.
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" />
                    Certificate & appreciation letter provided.
                  </div>
                </div>
                <div className="relative mt-8 hidden h-44 overflow-hidden rounded-2xl border border-border/60 bg-card lg:block">
                  <VolunteerIllustration className="absolute inset-0 h-full w-full opacity-90" />
                  <div className="absolute bottom-3 left-3 text-xs font-medium text-muted-foreground">
                    Your skills fit somewhere here.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — the form */}
            <Reveal delay={0.1}>
              <Card className="relative overflow-hidden border-border/60 shadow-soft">
                <div className="h-1.5 w-full bg-gradient-brand" />
                <CardHeader>
                  <CardTitle className="font-poppins text-2xl">
                    Volunteer Application
                  </CardTitle>
                  <CardDescription>
                    All fields marked <span className="text-brand-purple">*</span> are
                    required. Your information stays private to our coordination team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isFormVisible("volunteer") ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">
                          Full name <span className="text-brand-purple">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Priya Sharma"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">
                          Email <span className="text-brand-purple">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">
                          Phone <span className="text-brand-purple">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 90000 00000"
                          required
                          autoComplete="tel"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="role">
                          Preferred role <span className="text-brand-purple">*</span>
                        </Label>
                        <Select
                          value={form.role}
                          onValueChange={(v) =>
                            setForm((f) => ({ ...f, role: v }))
                          }
                        >
                          <SelectTrigger id="role" className="w-full">
                            <SelectValue placeholder="Choose a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="availability">Availability</Label>
                        <Select
                          value={form.availability}
                          onValueChange={(v) =>
                            setForm((f) => ({ ...f, availability: v }))
                          }
                        >
                          <SelectTrigger id="availability" className="w-full">
                            <SelectValue placeholder="When can you volunteer?" />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilityOptions.map((a) => (
                              <SelectItem key={a} value={a}>
                                {a}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="skills">
                        Skills &amp; experience
                      </Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="e.g. Python, curriculum design, event coordination, public speaking…"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="motivation">
                        Why do you want to volunteer with us?
                      </Label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        value={form.motivation}
                        onChange={handleChange}
                        placeholder="A sentence or two about what excites you and how you'd like to contribute."
                        rows={4}
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            role: "",
                            location: "",
                            skills: "",
                            availability: "",
                            motivation: "",
                          })
                        }
                        disabled={submitting}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-gradient-brand text-white shadow-soft hover:opacity-95"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Submit application
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/60 bg-muted/30 px-6 py-10 text-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-poppins text-lg font-700">Form temporarily disabled</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Volunteer applications are currently turned off. Please check back later.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- FAQs */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="FAQs"
              icon={HelpCircle}
              title="Questions, answered"
              description="Everything you might want to know before you hit submit."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Card className="overflow-hidden border-border/60">
                <CardContent className="p-2 sm:p-4">
                  <Accordion type="single" collapsible defaultValue="faq-0">
                    {volunteerFaqs.map((faq, i) => (
                      <AccordionItem
                        key={faq.question}
                        value={`faq-${i}`}
                        className="px-2 sm:px-3"
                      >
                        <AccordionTrigger className="text-left text-base font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-center shadow-soft sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
                  <HandHeart className="h-7 w-7" />
                </div>
                <h2 className="font-poppins text-3xl font-800 text-white sm:text-4xl">
                  Want to do more? Partner with us.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-white/90">
                  CSR teams, NGOs, educational institutions and government bodies —
                  partner with Atom Arc Foundation to scale community impact together.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-brand-blue hover:bg-white/90"
                  >
                    <Link href="/partners">
                      Explore partnerships
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link href="/contact">Talk to us</Link>
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
