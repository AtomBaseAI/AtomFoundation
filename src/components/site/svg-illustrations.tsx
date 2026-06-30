"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SVG Illustrations library for Atom Foundation.
 * Each illustration uses the brand palette (blue/purple/green) via CSS variables
 * so they adapt to light/dark themes. All are decorative (aria-hidden).
 */

type IllustrationProps = { className?: string };

/* ------------------------------------------------------------------ */
/* Shared gradient defs (unique ids to avoid clashes)                  */
/* ------------------------------------------------------------------ */

function Defs({ id, variant = "brand" }: { id: string; variant?: "brand" | "blue" | "purple" | "green" }) {
  const stops = {
    brand: [
      { c: "var(--brand-blue)", op: 1 },
      { c: "var(--brand-purple)", op: 1 },
    ],
    blue: [
      { c: "var(--brand-blue)", op: 1 },
      { c: "var(--brand-blue)", op: 0.5 },
    ],
    purple: [
      { c: "var(--brand-purple)", op: 1 },
      { c: "var(--brand-purple)", op: 0.5 },
    ],
    green: [
      { c: "var(--brand-green)", op: 1 },
      { c: "var(--brand-green)", op: 0.5 },
    ],
  }[variant];

  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={stops[0].c} stopOpacity={stops[0].op} />
        <stop offset="100%" stopColor={stops[1].c} stopOpacity={stops[1].op} />
      </linearGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/* 1. AI Training — brain/neural network + sparkles                    */
/* ------------------------------------------------------------------ */

export function AIIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="ai" variant="brand" />
      {/* backdrop blob */}
      <ellipse cx="120" cy="100" rx="100" ry="76" fill="var(--brand-blue)" fillOpacity="0.08" />
      {/* neural nodes */}
      {[
        [50, 60], [50, 110], [50, 160],
        [110, 40], [110, 100], [110, 160],
        [180, 70], [180, 130],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="6"
          fill={`url(#ai-g)`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
        />
      ))}
      {/* connections */}
      {[
        [50, 60, 110, 40], [50, 60, 110, 100], [50, 110, 110, 100], [50, 110, 110, 160],
        [50, 160, 110, 160], [110, 40, 180, 70], [110, 100, 180, 70], [110, 100, 180, 130],
        [110, 160, 180, 130],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--brand-purple)" strokeWidth="1.5" strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.04 }}
        />
      ))}
      {/* central spark */}
      <motion.g
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "110px 100px" }}
      >
        <circle cx="110" cy="100" r="14" fill="var(--brand-purple)" fillOpacity="0.15" />
        <circle cx="110" cy="100" r="8" fill="url(#ai-g)" />
      </motion.g>
      {/* floating sparkles */}
      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <path d="M200 30 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" fill="var(--brand-green)" />
      </motion.g>
      <motion.g animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}>
        <path d="M30 30 l1.5 4.5 4.5 1.5 -4.5 1.5 -1.5 4.5 -1.5 -4.5 -4.5 -1.5 4.5 -1.5 z" fill="var(--brand-blue)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Software Development — code editor + brackets                    */
/* ------------------------------------------------------------------ */

export function SoftwareIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="sw" variant="purple" />
      <ellipse cx="120" cy="100" rx="100" ry="76" fill="var(--brand-purple)" fillOpacity="0.08" />
      {/* editor window */}
      <motion.rect
        x="50" y="50" width="140" height="100" rx="10"
        fill="var(--card)" stroke="var(--brand-purple)" strokeOpacity="0.3" strokeWidth="1.5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      {/* window dots */}
      <circle cx="62" cy="62" r="3" fill="var(--brand-blue)" />
      <circle cx="72" cy="62" r="3" fill="var(--brand-purple)" />
      <circle cx="82" cy="62" r="3" fill="var(--brand-green)" />
      {/* code lines */}
      {[
        { y: 80, w: 60, c: "var(--brand-blue)" },
        { y: 94, w: 90, c: "var(--brand-purple)" },
        { y: 108, w: 70, c: "var(--brand-green)" },
        { y: 122, w: 100, c: "var(--brand-purple)" },
        { y: 136, w: 50, c: "var(--brand-blue)" },
      ].map((l, i) => (
        <motion.rect
          key={i} x="64" y={l.y} width={l.w} height="6" rx="3"
          fill={l.c} fillOpacity="0.7"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          style={{ transformOrigin: "64px" }}
        />
      ))}
      {/* floating brackets */}
      <motion.text x="190" y="170" fill="url(#sw-g)" fontSize="28" fontWeight="700"
        animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>{`</>`}</motion.text>
      <motion.path
        d="M30 150 l-8 8 8 8" stroke="var(--brand-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Career Readiness — briefcase + upward arrow                      */
/* ------------------------------------------------------------------ */

export function CareerIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="cr" variant="green" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-green)" fillOpacity="0.08" />
      {/* briefcase */}
      <motion.g
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect x="60" y="90" width="120" height="70" rx="8" fill="var(--card)" stroke="var(--brand-green)" strokeWidth="1.5" />
        <path d="M95 90 v-10 a6 6 0 0 1 6 -6 h38 a6 6 0 0 1 6 6 v10" stroke="var(--brand-green)" strokeWidth="1.5" fill="none" />
        <rect x="112" y="118" width="16" height="10" rx="2" fill="url(#cr-g)" />
        <line x1="60" y1="115" x2="180" y2="115" stroke="var(--brand-green)" strokeOpacity="0.3" strokeWidth="1.5" />
      </motion.g>
      {/* upward trend arrow */}
      <motion.path
        d="M150 70 L175 45 L195 55"
        stroke="url(#cr-g)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M195 55 l-2 -10 -10 2"
        stroke="url(#cr-g)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      />
      {/* star */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "55px 55px" }}>
        <path d="M55 40 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z" fill="var(--brand-blue)" fillOpacity="0.7" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Women Empowerment — figure with raised hand / growth             */
/* ------------------------------------------------------------------ */

export function WomenIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="we" variant="purple" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-purple)" fillOpacity="0.08" />
      {/* sun/growth rays */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 60px" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="120" y1="60"
            x2={120 + Math.cos((deg * Math.PI) / 180) * 18}
            y2={60 + Math.sin((deg * Math.PI) / 180) * 18}
            stroke="var(--brand-green)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"
          />
        ))}
      </motion.g>
      <circle cx="120" cy="60" r="10" fill="url(#we-g)" />
      {/* figure - body */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* head */}
        <circle cx="120" cy="100" r="12" fill="var(--brand-purple)" fillOpacity="0.85" />
        {/* body/dress */}
        <path d="M120 114 L100 165 L140 165 Z" fill="var(--brand-purple)" fillOpacity="0.7" />
        {/* raised arm */}
        <motion.path
          d="M120 118 L138 92"
          stroke="var(--brand-purple)" strokeWidth="5" strokeLinecap="round"
          animate={{ rotate: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "120px 118px" }}
        />
        <circle cx="140" cy="90" r="5" fill="var(--brand-green)" />
      </motion.g>
      {/* hearts */}
      <motion.g animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>
        <path d="M180 120 c0 -4 6 -4 6 0 c0 -4 6 -4 6 0 c0 4 -6 8 -6 8 c0 0 -6 -4 -6 -8 z" fill="var(--brand-pink, var(--brand-purple))" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. School Programs — books + graduation cap                         */
/* ------------------------------------------------------------------ */

export function SchoolIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="sc" variant="blue" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-blue)" fillOpacity="0.08" />
      {/* graduation cap */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <path d="M60 80 L120 55 L180 80 L120 105 Z" fill="url(#sc-g)" />
        <path d="M85 92 L85 120 C85 128 155 128 155 120 L155 92" stroke="url(#sc-g)" strokeWidth="4" fill="none" />
        <line x1="180" y1="80" x2="180" y2="110" stroke="var(--brand-blue)" strokeWidth="2" />
        <circle cx="180" cy="113" r="4" fill="var(--brand-green)" />
      </motion.g>
      {/* books stack */}
      <motion.g
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ transformOrigin: "120px" }}
      >
        <rect x="70" y="150" width="100" height="12" rx="2" fill="var(--brand-purple)" fillOpacity="0.7" />
        <rect x="78" y="138" width="84" height="12" rx="2" fill="var(--brand-green)" fillOpacity="0.7" />
        <rect x="74" y="162" width="92" height="6" rx="2" fill="var(--brand-blue)" fillOpacity="0.5" />
      </motion.g>
      {/* floating star */}
      <motion.path
        d="M50 50 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z"
        fill="var(--brand-purple)"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 56px" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Hero collage — community / learning scene                        */
/* ------------------------------------------------------------------ */

export function HeroCommunityIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 320" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="hero" variant="brand" />
      <Defs id="hero-b" variant="blue" />
      <Defs id="hero-p" variant="purple" />
      <Defs id="hero-gr" variant="green" />

      {/* backdrop circles */}
      <circle cx="200" cy="160" r="150" fill="var(--brand-blue)" fillOpacity="0.05" />
      <circle cx="200" cy="160" r="110" fill="var(--brand-purple)" fillOpacity="0.05" />

      {/* central screen / laptop */}
      <motion.g
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <rect x="130" y="110" width="140" height="90" rx="8" fill="var(--card)" stroke="url(#hero-g)" strokeWidth="2" />
        <rect x="140" y="120" width="120" height="70" rx="4" fill="var(--brand-blue)" fillOpacity="0.08" />
        {/* screen content - chart */}
        <motion.path
          d="M150 175 L170 160 L190 168 L210 145 L230 150 L250 130"
          stroke="url(#hero-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <line x1="125" y1="200" x2="275" y2="200" stroke="url(#hero-g)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>

      {/* person left (student) */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <circle cx="80" cy="180" r="14" fill="url(#hero-b)" />
        <path d="M80 194 L66 230 L94 230 Z" fill="url(#hero-b)" />
        <motion.circle cx="80" cy="178" r="3" fill="var(--brand-green)"
          animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.g>

      {/* person right (woman) */}
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <circle cx="320" cy="180" r="14" fill="url(#hero-p)" />
        <path d="M320 194 L304 235 C304 245 336 245 336 235 Z" fill="url(#hero-p)" />
      </motion.g>

      {/* floating badges */}
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="80" width="56" height="32" rx="8" fill="var(--card)" stroke="var(--brand-blue)" strokeOpacity="0.3" />
        <circle cx="56" cy="96" r="6" fill="var(--brand-blue)" />
        <rect x="68" y="90" width="20" height="4" rx="2" fill="var(--brand-blue)" fillOpacity="0.5" />
        <rect x="68" y="98" width="14" height="3" rx="1.5" fill="var(--brand-blue)" fillOpacity="0.3" />
      </motion.g>
      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="310" y="70" width="56" height="32" rx="8" fill="var(--card)" stroke="var(--brand-green)" strokeOpacity="0.3" />
        <path d="M322 86 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="var(--brand-green)" transform="scale(0.6) translate(150 40)" />
        <rect x="338" y="80" width="20" height="4" rx="2" fill="var(--brand-green)" fillOpacity="0.5" />
        <rect x="338" y="88" width="14" height="3" rx="1.5" fill="var(--brand-green)" fillOpacity="0.3" />
      </motion.g>

      {/* graduation cap floating */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 60px" }}
      >
        <path d="M170 60 L200 48 L230 60 L200 72 Z" fill="url(#hero-gr)" />
        <line x1="230" y1="60" x2="230" y2="72" stroke="var(--brand-green)" strokeWidth="2" />
        <circle cx="230" cy="74" r="3" fill="var(--brand-green)" />
      </motion.g>

      {/* ground dots */}
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx={120 + i * 28} cy={260} r="2" fill="var(--brand-purple)" fillOpacity="0.4" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Impact / growth — bar chart scene                                */
/* ------------------------------------------------------------------ */

export function ImpactIllustration({ className }: IllustrationProps) {
  const bars = [
    { x: 50, h: 40, c: "var(--brand-blue)", delay: 0 },
    { x: 90, h: 70, c: "var(--brand-purple)", delay: 0.1 },
    { x: 130, h: 55, c: "var(--brand-green)", delay: 0.2 },
    { x: 170, h: 100, c: "var(--brand-blue)", delay: 0.3 },
    { x: 210, h: 85, c: "var(--brand-purple)", delay: 0.4 },
  ];
  return (
    <svg viewBox="0 0 260 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <ellipse cx="130" cy="170" rx="120" ry="22" fill="var(--brand-blue)" fillOpacity="0.06" />
      <line x1="30" y1="160" x2="240" y2="160" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="1.5" />
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={160 - b.h} width="28" height={b.h} rx="4"
          fill={b.c} fillOpacity="0.85"
          initial={{ height: 0, y: 160 }}
          whileInView={{ height: b.h, y: 160 - b.h }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: b.delay, ease: "easeOut" }}
        />
      ))}
      {/* trend line */}
      <motion.path
        d="M64 130 L104 100 L144 115 L184 70 L224 85"
        stroke="var(--brand-purple)" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      {bars.map((b, i) => (
        <motion.circle
          key={`d${i}`} cx={b.x + 14} cy={160 - b.h + 6} r="3.5" fill="var(--brand-purple)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Volunteer — helping hands                                        */
/* ------------------------------------------------------------------ */

export function VolunteerIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="vol" variant="brand" />
      <ellipse cx="120" cy="100" rx="100" ry="76" fill="var(--brand-green)" fillOpacity="0.08" />
      {/* heart center */}
      <motion.g
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "120px 100px" }}
      >
        <path
          d="M120 120 C100 100 90 80 105 70 C115 63 120 73 120 73 C120 73 125 63 135 70 C150 80 140 100 120 120 Z"
          fill="url(#vol-g)"
        />
      </motion.g>
      {/* left hand */}
      <motion.g
        initial={{ x: -15, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <path d="M55 110 Q50 100 60 95 L85 90 L85 130 L60 130 Q50 125 55 110 Z" fill="var(--brand-blue)" fillOpacity="0.7" />
        <path d="M60 95 L60 80 M68 92 L68 76 M76 90 L76 78" stroke="var(--brand-blue)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {/* right hand */}
      <motion.g
        initial={{ x: 15, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <path d="M185 110 Q190 100 180 95 L155 90 L155 130 L180 130 Q190 125 185 110 Z" fill="var(--brand-purple)" fillOpacity="0.7" />
        <path d="M180 95 L180 80 M172 92 L172 76 M164 90 L164 78" stroke="var(--brand-purple)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {/* sparkles */}
      <motion.g animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        <path d="M170 50 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" fill="var(--brand-green)" />
      </motion.g>
      <motion.g animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}>
        <path d="M60 50 l1.5 4.5 4.5 1.5 -4.5 1.5 -1.5 4.5 -1.5 -4.5 -4.5 -1.5 4.5 -1.5 z" fill="var(--brand-blue)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Partnership — handshake / connection                             */
/* ------------------------------------------------------------------ */

export function PartnershipIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="pt" variant="brand" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-blue)" fillOpacity="0.08" />
      {/* connecting nodes */}
      <motion.line x1="60" y1="110" x2="180" y2="110" stroke="url(#pt-g)" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} />
      {/* left node */}
      <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <circle cx="60" cy="110" r="22" fill="var(--brand-blue)" fillOpacity="0.15" />
        <circle cx="60" cy="110" r="14" fill="url(#pt-g)" />
        <path d="M52 110 a8 8 0 0 1 16 0" stroke="var(--card)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="104" r="4" fill="var(--card)" />
      </motion.g>
      {/* right node */}
      <motion.g initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <circle cx="180" cy="110" r="22" fill="var(--brand-purple)" fillOpacity="0.15" />
        <circle cx="180" cy="110" r="14" fill="url(#pt-g)" />
        <rect x="174" y="102" width="12" height="10" rx="2" fill="var(--card)" />
      </motion.g>
      {/* center clasp */}
      <motion.circle cx="120" cy="110" r="10" fill="var(--brand-green)"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      {/* orbiting dots */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "120px 110px" }}>
        <circle cx="120" cy="80" r="3" fill="var(--brand-green)" />
        <circle cx="150" cy="110" r="3" fill="var(--brand-blue)" />
        <circle cx="120" cy="140" r="3" fill="var(--brand-purple)" />
        <circle cx="90" cy="110" r="3" fill="var(--brand-green)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Empty / no-results — magnifying glass                           */
/* ------------------------------------------------------------------ */

export function EmptyIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="em" variant="purple" />
      <ellipse cx="100" cy="80" rx="80" ry="60" fill="var(--brand-purple)" fillOpacity="0.06" />
      <motion.g initial={{ rotate: -10 }} animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} style={{ transformOrigin: "100px 80px" }}>
        <circle cx="85" cy="70" r="28" stroke="url(#em-g)" strokeWidth="4" fill="var(--card)" />
        <line x1="105" y1="90" x2="130" y2="115" stroke="url(#em-g)" strokeWidth="6" strokeLinecap="round" />
      </motion.g>
      <motion.path
        d="M85 60 l0 16 M77 68 l16 0" stroke="var(--brand-purple)" strokeWidth="3" strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Map of India with reach pins                                    */
/* ------------------------------------------------------------------ */

export function IndiaReachMap({ className }: IllustrationProps) {
  const pins = [
    { x: 110, y: 130, label: "KA" },
    { x: 95, y: 100, label: "MH" },
    { x: 130, y: 95, label: "TG" },
    { x: 150, y: 80, label: "OD" },
    { x: 120, y: 70, label: "UP" },
    { x: 105, y: 55, label: "DL" },
    { x: 70, y: 110, label: "GJ" },
    { x: 175, y: 120, label: "TN" },
  ];
  return (
    <svg viewBox="0 0 220 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="in" variant="brand" />
      {/* simplified india silhouette */}
      <motion.path
        d="M100 30 L120 28 L135 40 L150 38 L160 55 L155 70 L170 75 L175 95 L165 115 L180 130 L170 155 L150 165 L140 155 L125 170 L115 160 L100 165 L90 150 L80 155 L70 140 L75 120 L65 100 L72 80 L60 65 L75 50 L85 45 Z"
        fill="var(--brand-blue)" fillOpacity="0.08"
        stroke="url(#in-g)" strokeWidth="1.5" strokeOpacity="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      {pins.map((p, i) => (
        <motion.g
          key={p.label}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <circle cx={p.x} cy={p.y} r="8" fill="var(--brand-purple)" fillOpacity="0.2" />
          <circle cx={p.x} cy={p.y} r="4" fill="url(#in-g)" />
          <motion.circle
            cx={p.x} cy={p.y} r="4" fill="none" stroke="var(--brand-purple)" strokeWidth="1.5"
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Certificate / verification badge                                */
/* ------------------------------------------------------------------ */

export function CertificateIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="cert" variant="brand" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-purple)" fillOpacity="0.08" />
      {/* document */}
      <motion.g
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect x="70" y="50" width="100" height="120" rx="6" fill="var(--card)" stroke="url(#cert-g)" strokeWidth="1.5" />
        <rect x="85" y="65" width="70" height="6" rx="3" fill="var(--brand-blue)" fillOpacity="0.7" />
        <rect x="85" y="80" width="50" height="4" rx="2" fill="var(--brand-purple)" fillOpacity="0.5" />
        <rect x="85" y="90" width="60" height="4" rx="2" fill="var(--brand-purple)" fillOpacity="0.4" />
        <rect x="85" y="100" width="40" height="4" rx="2" fill="var(--brand-purple)" fillOpacity="0.4" />
      </motion.g>
      {/* seal */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "140px 145px" }}
      >
        <circle cx="140" cy="145" r="18" fill="url(#cert-g)" />
        <path d="M140 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="var(--card)" transform="scale(0.7) translate(62 60)" />
      </motion.g>
      {/* ribbon */}
      <motion.path
        d="M140 160 L132 185 L140 178 L148 185 Z"
        fill="var(--brand-purple)" fillOpacity="0.7"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{ transformOrigin: "140px 160px" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Event / webinar — calendar with play                            */
/* ------------------------------------------------------------------ */

export function EventIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="ev" variant="brand" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-blue)" fillOpacity="0.08" />
      {/* calendar */}
      <motion.g
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect x="65" y="60" width="110" height="100" rx="8" fill="var(--card)" stroke="url(#ev-g)" strokeWidth="1.5" />
        <rect x="65" y="60" width="110" height="22" rx="8" fill="url(#ev-g)" />
        <line x1="90" y1="52" x2="90" y2="68" stroke="var(--brand-blue)" strokeWidth="4" strokeLinecap="round" />
        <line x1="150" y1="52" x2="150" y2="68" stroke="var(--brand-blue)" strokeWidth="4" strokeLinecap="round" />
        {/* date cells */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={75 + c * 24} y={92 + r * 18} width="16" height="10" rx="2"
              fill="var(--brand-blue)" fillOpacity={r === 1 && c === 2 ? 0.9 : 0.2} />
          ))
        )}
      </motion.g>
      {/* play badge */}
      <motion.circle
        cx="175" cy="145" r="16" fill="var(--brand-green)"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "175px 145px" }}
      />
      <path d="M170 138 L170 152 L183 145 Z" fill="var(--card)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Blog / writing — notebook with pen                              */
/* ------------------------------------------------------------------ */

export function BlogIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="bl" variant="purple" />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-purple)" fillOpacity="0.08" />
      {/* notebook */}
      <motion.g
        initial={{ rotate: -6, y: 12, opacity: 0 }}
        whileInView={{ rotate: -6, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect x="70" y="55" width="90" height="110" rx="6" fill="var(--card)" stroke="url(#bl-g)" strokeWidth="1.5" />
        <rect x="70" y="55" width="14" height="110" fill="url(#bl-g)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i} x="95" y={75 + i * 16} width={i === 2 ? 50 : 55} height="5" rx="2.5"
            fill="var(--brand-purple)" fillOpacity={0.4 + i * 0.05}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{ transformOrigin: "95px" }}
          />
        ))}
      </motion.g>
      {/* pen */}
      <motion.g
        initial={{ rotate: 30, x: 10, opacity: 0 }}
        whileInView={{ rotate: 30, x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ transformOrigin: "175px 90px" }}
      >
        <rect x="165" y="60" width="8" height="70" rx="2" fill="url(#bl-g)" transform="rotate(30 169 95)" />
        <path d="M165 60 L173 60 L169 50 Z" fill="var(--brand-blue)" transform="rotate(30 169 95)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 16. Generic placeholder illustration (when nothing specific fits)   */
/* ------------------------------------------------------------------ */

export function PlaceholderIllustration({ className, variant = "brand" }: IllustrationProps & { variant?: "brand" | "blue" | "purple" | "green" }) {
  return (
    <svg viewBox="0 0 240 200" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <Defs id="ph" variant={variant} />
      <ellipse cx="120" cy="110" rx="100" ry="76" fill="var(--brand-blue)" fillOpacity="0.06" />
      <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <circle cx="120" cy="100" r="30" fill="url(#ph-g)" fillOpacity="0.2" />
        <circle cx="120" cy="100" r="18" fill="url(#ph-g)" />
        <path d="M120 90 L120 110 M110 100 L130 100" stroke="var(--card)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={50 + i * 35} cy={160} r="3"
          fill={["var(--brand-blue)", "var(--brand-purple)", "var(--brand-green)", "var(--brand-blue)", "var(--brand-purple)"][i]}
          animate={{ scale: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Program illustration map (by program id)                            */
/* ------------------------------------------------------------------ */

export const programIllustrations: Record<string, React.ComponentType<IllustrationProps>> = {
  ai: AIIllustration,
  software: SoftwareIllustration,
  career: CareerIllustration,
  women: WomenIllustration,
  school: SchoolIllustration,
};
