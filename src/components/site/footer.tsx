"use client";

import * as React from "react";
import Link from "next/link";
import { Atom, Mail, Phone, MapPin, Send, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { footerNav, socialLinks } from "@/lib/nav";
import { site } from "@/lib/data";

export function SiteFooter() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Subscribed!", {
        description: "You'll receive our latest impact stories and event invites.",
      });
      setEmail("");
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
                <Atom className="h-5 w-5" />
              </span>
              <span className="font-poppins text-lg font-700">
                Atom<span className="text-gradient-brand"> Arc Foundation</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Empowering every student and woman with future-ready technology
              skills, enabling sustainable careers and inclusive growth through
              education, AI, innovation and community development.
            </p>

            <form onSubmit={onSubscribe} className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Subscribe to our newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-background"
                />
                <Button type="submit" disabled={loading} className="bg-gradient-brand">
                  {loading ? <Send className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-poppins text-sm font-700 uppercase tracking-wider">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-3">
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue"><Mail className="h-4 w-4" /></span>
            {site.email}
          </a>
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-purple/10 text-brand-purple"><Phone className="h-4 w-4" /></span>
            {site.phone}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-green/10 text-brand-green"><MapPin className="h-4 w-4" /></span>
            {site.addressShort}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> for future-ready communities
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = "h-4 w-4";
  switch (name) {
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}
