"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Animated concentric atom orbits used as a hero decoration. */
export function AtomOrbits({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="orbit-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-blue)" />
          <stop offset="100%" stopColor="var(--brand-purple)" />
        </linearGradient>
        <linearGradient id="orbit-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-purple)" />
          <stop offset="100%" stopColor="var(--brand-green)" />
        </linearGradient>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <g style={{ transformOrigin: "200px 200px" }}>
        <motion.ellipse
          cx="200" cy="200" rx="180" ry="70"
          stroke="url(#orbit-g1)" strokeWidth="1.5" opacity="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.ellipse
          cx="200" cy="200" rx="180" ry="70"
          stroke="url(#orbit-g2)" strokeWidth="1.5" opacity="0.5"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px", transform: "rotate(60deg)" }}
        />
        <motion.ellipse
          cx="200" cy="200" rx="180" ry="70"
          stroke="url(#orbit-g1)" strokeWidth="1.5" opacity="0.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px", transform: "rotate(120deg)" }}
        />
      </g>

      <circle cx="200" cy="200" r="22" fill="url(#orbit-core)" />
      <motion.circle
        cx="200" cy="200" r="22"
        fill="none" stroke="var(--brand-blue)" strokeWidth="2"
        animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />

      {/* Electrons */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="380" cy="200" r="6" fill="var(--brand-blue)" />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px", transform: "rotate(60deg)" }}
      >
        <circle cx="380" cy="200" r="5" fill="var(--brand-purple)" />
      </motion.g>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px", transform: "rotate(120deg)" }}
      >
        <circle cx="380" cy="200" r="5" fill="var(--brand-green)" />
      </motion.g>
    </svg>
  );
}

/** Animated wave divider for section transitions. */
export function WaveDivider({
  className,
  color = "var(--background)",
  flip = false,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none w-full overflow-hidden leading-none", className)}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-20"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
        aria-hidden
      >
        <motion.path
          d="M0,40 C240,80 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z"
          fill={color}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
      </svg>
    </div>
  );
}

/** Animated growth line chart SVG (for impact sections). */
export function GrowthLine({ className }: { className?: string }) {
  const path = "M10,140 L60,120 L110,128 L160,90 L210,100 L260,60 L310,70 L360,30 L410,20";
  return (
    <svg viewBox="0 0 420 160" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <defs>
        <linearGradient id="growth-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-blue)" />
          <stop offset="50%" stopColor="var(--brand-purple)" />
          <stop offset="100%" stopColor="var(--brand-green)" />
        </linearGradient>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L410,160 L10,160 Z`}
        fill="url(#growth-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.path
        d={path}
        stroke="url(#growth-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Floating particles / dots background.
 *  Particle positions are generated on the client only (after mount) to avoid
 *  SSR hydration mismatches caused by Math.random(). */
export function FloatingParticles({ count = 14 }: { count?: number }) {
  const [particles, setParticles] = React.useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number; color: string }[]
  >([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        color: ["var(--brand-blue)", "var(--brand-purple)", "var(--brand-green)"][i % 3],
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.4,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Animated connected nodes network (for partners / community sections). */
export function NodeNetwork({ className }: { className?: string }) {
  const nodes = [
    { x: 50, y: 40 }, { x: 150, y: 80 }, { x: 250, y: 50 },
    { x: 340, y: 100 }, { x: 100, y: 160 }, { x: 220, y: 150 },
    { x: 300, y: 200 }, { x: 60, y: 220 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [1, 4], [2, 5], [3, 6], [4, 5], [5, 6], [4, 7], [0, 4],
  ];
  return (
    <svg viewBox="0 0 400 260" className={cn("h-full w-full", className)} fill="none" aria-hidden>
      <defs>
        <linearGradient id="nn-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#nn-line)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.05 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="6"
          fill={["var(--brand-blue)", "var(--brand-purple)", "var(--brand-green)"][i % 3]}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.06, type: "spring" }}
        />
      ))}
    </svg>
  );
}
