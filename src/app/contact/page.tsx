"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Handshake,
  Users,
  HelpCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { IndiaReachMap } from "@/components/site/svg-illustrations";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

const subjectOptions = [
  "General Inquiry",
  "Partnership",
  "Volunteering",
  "Programs & Admissions",
  "Media & Press",
];

const contactFaqs = [
  {
    q: "How do I apply for a program or bootcamp?",
    a: "Visit our Programs page, pick the track you're interested in, and apply through the program card. You can also write to us using the contact form with the subject 'Programs & Admissions' — our team will share the next batch schedule and application steps.",
  },
  {
    q: "Can my organization partner with Atom Arc Foundation?",
    a: "Absolutely. We work with CSR teams, educational institutions, NGOs, government bodies and technology companies. Visit our Partners page and submit a partnership inquiry, or use the contact form with the subject 'Partnership'.",
  },
  {
    q: "How can I volunteer as a mentor or trainer?",
    a: "We're always looking for trainers, mentors, developers, organizers and career coaches. Head to the Volunteer page to choose a role and apply — most roles need 2–6 hours per week and many are fully remote.",
  },
  {
    q: "Can my company partner with Atom Arc Foundation?",
    a: "Absolutely. We run structured CSR, government and institutional partnerships — from co-branded programs and bootcamps to scholarship funds and community drives. Use the form above with subject 'Partnership' or visit our Partners page to learn more.",
  },
  {
    q: "Do you offer programs outside Coimbatore?",
    a: "Yes. We currently operate across 32 districts in India, in both rural and semi-urban regions. Many programs are also delivered online and can be joined from anywhere. Reach out and we'll help you find the right opportunity.",
  },
];

const contactCards = [
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
    color: "blue" as const,
    note: "We reply within 2 business days",
  },
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
    color: "purple" as const,
    note: "Mon–Fri, 10:00 AM – 6:00 PM IST",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: site.address,
    href: "#map",
    color: "green" as const,
    note: "Ganapathy, Coimbatore",
  },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

const colorMap = {
  blue: { text: "text-brand-blue", bg: "bg-brand-blue/10", ring: "ring-brand-blue/20", gradient: "from-brand-blue/15 to-brand-blue/5" },
  purple: { text: "text-brand-purple", bg: "bg-brand-purple/10", ring: "ring-brand-purple/20", gradient: "from-brand-purple/15 to-brand-purple/5" },
  green: { text: "text-brand-green", bg: "bg-brand-green/10", ring: "ring-brand-green/20", gradient: "from-brand-green/15 to-brand-green/5" },
};

function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.subject) next.subject = "Please choose a subject.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      toast.success("Message sent!", {
        description: "We'll get back to you within 2 business days.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden border-border/70 shadow-soft py-0">
      <CardHeader className="border-b border-border/60 bg-gradient-brand-soft">
        <CardTitle className="font-poppins text-xl font-700">
          Send us a message
        </CardTitle>
        <CardDescription>
          Fill the form and our team will reach out shortly. All fields marked
          with{" "}
          <span className="font-600 text-destructive">*</span> are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form
          onSubmit={onSubmit}
          className="grid gap-4 sm:grid-cols-2"
          aria-label="Contact form"
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="c-name">
              Full name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="c-name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="c-email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-phone">Phone (optional)</Label>
            <Input
              id="c-phone"
              type="tel"
              placeholder="+91 00000 00000"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.subject}
              onValueChange={(v) => update("subject", v)}
            >
              <SelectTrigger
                id="c-subject"
                className="w-full"
                aria-invalid={!!errors.subject}
              >
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-xs text-destructive">{errors.subject}</p>
            )}
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="c-message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="c-message"
              rows={5}
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full bg-gradient-brand text-white shadow-glow-purple"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  note,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  color: "blue" | "purple" | "green";
  note: string;
}) {
  const colors = colorMap[color];
  return (
    <Card className="group h-full overflow-hidden border-border/70 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow-blue py-0">
      <CardContent className="flex items-start gap-4 p-5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1",
            colors.bg,
            colors.text,
            colors.ring,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <Link
            href={href}
            className="mt-1 block break-words font-poppins text-base font-600 leading-snug transition-colors hover:text-primary"
          >
            {value}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{note}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function MapPlaceholder() {
  return (
    <Reveal>
      <Card
        id="map"
        className="relative overflow-hidden border-border/70 shadow-soft py-0"
      >
        <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-brand-green/10 sm:h-80">
          <IndiaReachMap className="h-full w-full" />

          {/* Address overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass rounded-xl border border-border/60 p-4 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-poppins text-sm font-700">Atom Arc Foundation HQ</p>
                  <p className="text-xs text-muted-foreground">{site.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s build{" "}
            <span className="text-gradient-brand">future-ready communities</span>{" "}
            together
          </>
        }
        description="Have a question about programs, partnerships or volunteering? We'd love to hear from you. Reach out and our team will get back within 2 business days."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Two-column form + info */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal delay={0.05}>
                <SectionHeading
                  align="left"
                  eyebrow="Reach Us"
                  title="Other ways to connect"
                  className="mb-2"
                />
              </Reveal>
              <Stagger className="grid gap-4" stagger={0.08}>
                {contactCards.map((c) => (
                  <StaggerItem key={c.label} className="h-full">
                    <ContactInfoCard {...c} />
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Office hours */}
              <Reveal delay={0.15}>
                <Card className="border-border/70 bg-gradient-brand-soft py-0">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/70 text-brand-purple ring-1 ring-brand-purple/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">
                        Office hours
                      </p>
                      <p className="font-poppins text-sm font-700">
                        Monday – Friday
                      </p>
                      <p className="text-xs text-muted-foreground">
                        10:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Social links */}
              <Reveal delay={0.2}>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">
                    Follow us
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Button
                          key={s.name}
                          asChild
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          aria-label={s.name}
                        >
                          <Link href={s.href} target="_blank" rel="noreferrer">
                            <Icon className="h-4 w-4" />
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Find Us"
            title="Our Coimbatore headquarters"
            description="Drop by for a coffee or schedule a visit — our doors are open to partners, volunteers and the community."
            icon={MapPin}
          />
          <div className="mt-10">
            <MapPlaceholder />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="FAQ"
                title="Frequently asked questions"
                description="Quick answers to the questions we hear most. Can't find what you're looking for? Use the contact form above."
                icon={HelpCircle}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/volunteer">
                    <Users className="h-4 w-4" />
                    Become a volunteer
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/partners">
                    <Handshake className="h-4 w-4" />
                    Become a partner
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="border-border/70 shadow-soft py-0">
                <CardContent className="p-6 sm:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {contactFaqs.map((faq, i) => (
                      <AccordionItem
                        key={faq.q}
                        value={`item-${i}`}
                        className="border-border/60"
                      >
                        <AccordionTrigger className="text-left font-poppins text-base font-600 hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 shadow-glow-purple sm:p-12">
              <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
              <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <h2 className="font-poppins text-3xl font-800 leading-tight text-white sm:text-4xl">
                    Ready to make an impact?
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
                    Volunteer your skills or partner with
                    us — every action creates ripples of opportunity in someone&apos;s
                    life.
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {[
                      "Volunteer from anywhere in India",
                      "Mentor 2–6 hrs/week",
                      "Co-branded partnership programs",
                      "CSR & government collaborations",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-white/90"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <Button
                    asChild
                    size="lg"
                    className="bg-background text-foreground shadow-soft hover:bg-background/90"
                  >
                    <Link href="/volunteer">
                      <Users className="h-4 w-4" />
                      Become a Volunteer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white/15 text-white shadow-soft backdrop-blur hover:bg-white/25"
                  >
                    <Link href="/partners">
                      <Handshake className="h-4 w-4" />
                      Partner With Us
                      <ArrowRight className="h-4 w-4" />
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
