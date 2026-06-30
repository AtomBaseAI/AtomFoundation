"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SVG-based partner "logos" — abstract geometric marks that vary by partner name.
 * Replaces plain initials with distinctive branded logo shapes.
 */

type Props = { name: string; logoText: string; className?: string };

const palettes = [
  { a: "var(--brand-blue)", b: "var(--brand-purple)" },
  { a: "var(--brand-purple)", b: "var(--brand-green)" },
  { a: "var(--brand-green)", b: "var(--brand-blue)" },
  { a: "var(--brand-blue)", b: "var(--brand-green)" },
  { a: "var(--brand-purple)", b: "var(--brand-blue)" },
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

const shapes = [
  // 0: overlapping circles
  (a: string, b: string, id: string) => (
    <>
      <circle cx="20" cy="20" r="12" fill={a} fillOpacity="0.85" />
      <circle cx="30" cy="20" r="12" fill={b} fillOpacity="0.85" />
    </>
  ),
  // 1: stacked chevrons
  (a: string, b: string) => (
    <>
      <path d="M10 14 L25 4 L40 14 L25 24 Z" fill={a} />
      <path d="M10 28 L25 18 L40 28 L25 38 Z" fill={b} fillOpacity="0.7" />
    </>
  ),
  // 2: hexagon split
  (a: string, b: string) => (
    <>
      <path d="M25 4 L42 14 L42 34 L25 44 L8 34 L8 14 Z" fill="none" stroke={a} strokeWidth="3" />
      <path d="M25 4 L42 14 L25 24 L8 14 Z" fill={b} fillOpacity="0.7" />
    </>
  ),
  // 3: rounded square + dot
  (a: string, b: string) => (
    <>
      <rect x="6" y="6" width="28" height="28" rx="7" fill={a} fillOpacity="0.85" />
      <circle cx="32" cy="32" r="8" fill={b} />
    </>
  ),
  // 4: triangle + bar
  (a: string, b: string) => (
    <>
      <path d="M8 38 L24 8 L40 38 Z" fill={a} fillOpacity="0.85" />
      <rect x="18" y="30" width="14" height="8" rx="2" fill={b} />
    </>
  ),
  // 5: interlocking rings
  (a: string, b: string) => (
    <>
      <circle cx="18" cy="22" r="12" fill="none" stroke={a} strokeWidth="4" />
      <circle cx="32" cy="22" r="12" fill="none" stroke={b} strokeWidth="4" />
    </>
  ),
];

export function PartnerLogo({ name, logoText, className }: Props) {
  const h = hash(name);
  const palette = palettes[h % palettes.length];
  const Shape = shapes[h % shapes.length];

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-full w-full", className)}
      fill="none"
      aria-label={`${name} logo`}
      role="img"
    >
      <defs>
        <linearGradient id={`pl-${h}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.a} />
          <stop offset="100%" stopColor={palette.b} />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        {Shape(palette.a, palette.b, `pl-${h}`)}
      </motion.g>
    </svg>
  );
}

/**
 * Avatar SVG — stylized person silhouette with brand-colored background.
 * Used for team members, advisors, story people, testimonials.
 */
export function AvatarSvg({
  initials,
  variant = "brand",
  className,
}: {
  initials: string;
  variant?: "brand" | "blue" | "purple" | "green";
  className?: string;
}) {
  const colors = {
    brand: { bg1: "var(--brand-blue)", bg2: "var(--brand-purple)" },
    blue: { bg1: "var(--brand-blue)", bg2: "var(--brand-blue)" },
    purple: { bg1: "var(--brand-purple)", bg2: "var(--brand-purple)" },
    green: { bg1: "var(--brand-green)", bg2: "var(--brand-green)" },
  }[variant];
  const id = `av-${initials}-${variant}`;
  return (
    <svg viewBox="0 0 80 80" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.bg1} />
          <stop offset="100%" stopColor={colors.bg2} />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="40" fill={`url(#${id})`} />
      {/* head */}
      <circle cx="40" cy="32" r="12" fill="var(--card)" fillOpacity="0.95" />
      {/* shoulders */}
      <path d="M18 70 C18 54 28 48 40 48 C52 48 62 54 62 70 Z" fill="var(--card)" fillOpacity="0.95" />
      {/* initials */}
      <text
        x="40" y="36" textAnchor="middle"
        fontSize="14" fontWeight="700" fill={colors.bg1}
        fontFamily="var(--font-poppins), sans-serif"
      >
        {initials.slice(0, 2)}
      </text>
    </svg>
  );
}
