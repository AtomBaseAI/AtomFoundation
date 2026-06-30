"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, isAfter } from "date-fns";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Video,
  Wifi,
  Building2,
  Code2,
  Brain,
  HeartHandshake,
  GraduationCap,
  Loader2,
  CheckCircle2,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EventIllustration } from "@/components/site/svg-illustrations";
import { events, type EventItem } from "@/lib/data";

type EventType = EventItem["type"];

const typeConfig: Record<EventType, { color: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  Workshop: { color: "blue", bg: "bg-brand-blue/10", text: "text-brand-blue", icon: Code2 },
  Hackathon: { color: "purple", bg: "bg-brand-purple/10", text: "text-brand-purple", icon: Sparkles },
  "AI Bootcamp": { color: "green", bg: "bg-brand-green/10", text: "text-brand-green", icon: Brain },
  "Community Program": { color: "purple", bg: "bg-brand-purple/10", text: "text-brand-purple", icon: HeartHandshake },
  Webinar: { color: "blue", bg: "bg-brand-blue/10", text: "text-brand-blue", icon: Video },
};

const modeConfig: Record<EventItem["mode"], { icon: React.ComponentType<{ className?: string }>; text: string }> = {
  Online: { icon: Wifi, text: "text-brand-blue" },
  Offline: { icon: MapPin, text: "text-brand-green" },
  Hybrid: { icon: Building2, text: "text-brand-purple" },
};

function DateBadge({ date, endDate }: { date: string; endDate?: string }) {
  const d = parseISO(date);
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-brand px-3 py-2 text-white min-w-[58px]">
      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-85">
        {format(d, "MMM")}
      </span>
      <span className="font-poppins text-xl font-800 leading-none">{format(d, "dd")}</span>
      {endDate && (
        <span className="mt-0.5 text-[9px] opacity-85">to {format(parseISO(endDate), "dd MMM")}</span>
      )}
    </div>
  );
}

function EventCard({ event, onRegister }: { event: EventItem; onRegister: (e: EventItem) => void }) {
  const tc = typeConfig[event.type];
  const mc = modeConfig[event.mode];
  const TypeIcon = tc.icon;
  const ModeIcon = mc.icon;
  const isUpcoming = event.status === "upcoming";
  const seatsFilled = event.seats && event.registered ? Math.round((event.registered / event.seats) * 100) : 0;

  return (
    <StaggerItem>
      <Card className="group relative flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
        <div className={cn("absolute inset-x-0 top-0 h-1", tc.bg.replace("/10", ""))} />
        <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <DateBadge date={event.date} endDate={event.endDate} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("gap-1 border-transparent", tc.bg, tc.text)}>
                  <TypeIcon className="h-3 w-3" />
                  {event.type}
                </Badge>
                <Badge variant="outline" className={cn("gap-1", mc.text)}>
                  <ModeIcon className="h-3 w-3" />
                  {event.mode}
                </Badge>
                {!isUpcoming && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </Badge>
                )}
              </div>
              <h3 className="mt-2 font-poppins text-lg font-700 leading-tight tracking-tight sm:text-xl">
                {event.title}
              </h3>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {format(parseISO(event.date), "EEE, dd MMM yyyy")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>

          {isUpcoming && event.seats && event.registered !== undefined && (
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/40 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Users className="h-3.5 w-3.5" />
                  {event.registered.toLocaleString("en-IN")} / {event.seats.toLocaleString("en-IN")} registered
                </span>
                <span className="font-semibold text-foreground">{seatsFilled}%</span>
              </div>
              <Progress value={seatsFilled} className="mt-2 h-1.5" />
              <div className="mt-1 text-[11px] text-muted-foreground">
                {event.seats - event.registered} seats left
              </div>
            </div>
          )}

          <div className="mt-auto pt-5">
            {isUpcoming ? (
              <Button
                className="w-full bg-gradient-brand text-white hover:opacity-90"
                onClick={() => onRegister(event)}
              >
                Register now <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full">
                <Link href="/gallery">
                  View highlights <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </StaggerItem>
  );
}

function RegistrationDialog({
  event,
  open,
  onOpenChange,
}: {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
      setLoading(false);
      setDone(false);
    }
  }, [open, event]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!event) return;
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/event-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          phone,
          role,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed");
      }
      setDone(true);
      toast.success(`You're registered for "${event.title}"!`, {
        description: "A confirmation email will arrive shortly.",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white">
              <CalendarDays className="h-4 w-4" />
            </span>
            {done ? "You're in!" : "Register for event"}
          </DialogTitle>
          <DialogDescription>
            {event ? event.title : ""}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="text-sm text-muted-foreground">
              Thanks for registering. We've sent the joining details to{" "}
              <span className="font-medium text-foreground">{email}</span>.
            </p>
            <Button className="mt-2 bg-gradient-brand text-white" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="reg-name">Full name <span className="text-destructive">*</span></Label>
              <Input
                id="reg-name"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone">Phone</Label>
                <Input
                  id="reg-phone"
                  placeholder="+91 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-role">I am a</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="reg-role" className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-brand text-white" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Registering...
                  </>
                ) : (
                  <>
                    Confirm registration <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function EventsPage() {
  const [registerEvent, setRegisterEvent] = React.useState<EventItem | null>(null);
  const [open, setOpen] = React.useState(false);

  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events
    .filter((e) => e.status === "past")
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

  function openRegister(e: EventItem) {
    setRegisterEvent(e);
    setOpen(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Workshops, bootcamps & <span className="text-gradient-brand">community programs</span>
          </>
        }
        description="Hands-on learning, real connections, and the energy of a community building the future together. Find your next event below."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="bg-gradient-brand text-white hover:opacity-90">
              <Link href="#upcoming">
                <CalendarDays className="h-4 w-4" /> See upcoming
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Host an event <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="hidden h-24 w-32 overflow-hidden rounded-xl sm:block">
            <EventIllustration className="h-full w-full" />
          </div>
        </div>
      </PageHero>

      {/* Event types legend */}
      <section className="py-12 sm:py-14">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="mr-2 text-sm text-muted-foreground">Event types:</span>
              {(Object.keys(typeConfig) as EventType[]).map((t) => {
                const tc = typeConfig[t];
                const Icon = tc.icon;
                return (
                  <Badge key={t} variant="outline" className={cn("gap-1.5 rounded-full py-1 pl-2 pr-3", tc.text)}>
                    <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full", tc.bg)}>
                      <Icon className="h-3 w-3" />
                    </span>
                    {t}
                  </Badge>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tabs: Upcoming / Past */}
      <section id="upcoming" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <div>
                <h2 className="font-poppins text-2xl font-800 tracking-tight sm:text-3xl">Browse events</h2>
                <p className="text-sm text-muted-foreground">
                  {upcoming.length} upcoming · {past.length} past events
                </p>
              </div>
              <TabsList className="bg-muted">
                <TabsTrigger value="upcoming" className="gap-1.5">
                  <PartyPopper className="h-3.5 w-3.5" /> Upcoming
                  <span className="ml-1 rounded-full bg-brand-blue/15 px-1.5 text-[10px] font-semibold text-brand-blue">
                    {upcoming.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="past" className="gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Past
                  <span className="ml-1 rounded-full bg-muted-foreground/15 px-1.5 text-[10px] font-semibold">
                    {past.length}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-8">
              <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
                {upcoming.map((e) => (
                  <EventCard key={e.id} event={e} onRegister={openRegister} />
                ))}
              </Stagger>
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
                {past.map((e) => (
                  <EventCard key={e.id} event={e} onRegister={openRegister} />
                ))}
              </Stagger>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured event band */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-brand-soft py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Flagship"
                title="Atom Hackathon: Code for Community"
                description="48 hours. Hundreds of builders. Real solutions for education, women empowerment and local community challenges. Online & open to all."
                icon={Sparkles}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-gradient-brand text-white" onClick={() => openRegister(events[2])}>
                  Reserve your spot <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Sponsor this event</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Card className="overflow-hidden border-border/60 py-0">
                <CardContent className="grid grid-cols-2 gap-4 p-6 sm:p-8">
                  {[
                    { label: "Duration", value: "48 hrs", icon: Clock, color: "text-brand-blue" },
                    { label: "Seats", value: "500", icon: Users, color: "text-brand-purple" },
                    { label: "Themes", value: "5", icon: Sparkles, color: "text-brand-green" },
                    { label: "Prizes", value: "₹2L+", icon: GraduationCap, color: "text-brand-blue" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="rounded-xl border border-border/60 bg-background/60 p-4">
                        <Icon className={cn("h-5 w-5", s.color)} />
                        <div className="mt-2 font-poppins text-2xl font-800">{s.value}</div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </Reveal>
          </div>
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
                  <Badge className="border-white/30 bg-white/15 text-white">Host with us</Badge>
                  <h2 className="mt-4 font-poppins text-3xl font-800 tracking-tight sm:text-4xl">
                    Want us to host an event at your institution?
                  </h2>
                  <p className="mt-3 text-white/85">
                    From school robotics workshops to corporate AI bootcamps — we co-design events that fit your community and goals.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                    <Link href="/contact">
                      Get in touch <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/programs">View programs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <RegistrationDialog event={registerEvent} open={open} onOpenChange={setOpen} />
    </>
  );
}
