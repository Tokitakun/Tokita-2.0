"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ============================================================================
// MAGNETIC — element terpikat kursor, spring balik saat lepas
// ============================================================================

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "elastic.out(1, 0.4)" });
    const ixTo = gsap.quickTo(inner, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    const iyTo = gsap.quickTo(inner, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
      ixTo(relX * strength * 0.4);
      iyTo(relY * strength * 0.4);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo(0);
      iyTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      <div ref={innerRef} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// SCROLL PROGRESS — bar tipis glow di atas layar (Kawaii Pink / Cyan)
// ============================================================================

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3.5px] z-[9997] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#FF75B9] via-[#F54DAD] to-[#79E7E5] shadow-[0_0_10px_rgba(245,77,173,0.7)]"
      />
    </div>
  );
}

// ============================================================================
// MARQUEE — strip teks jalan tanpa henti (NAFIS.EXE Kawaii Style)
// ============================================================================

export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative w-full overflow-hidden py-3 border-y-2 border-[#F0C8DF] bg-[#FFE3F1] select-none ${className}`}
    >
      <div
        className="flex w-max animate-marquee gap-0"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-6 text-xs md:text-sm font-mono font-bold uppercase tracking-[0.15em]"
          >
            <span className={i % 2 === 0 ? "text-[#F54DAD]" : "text-[#302432]"}>
              {item}
            </span>
            <span className="ml-8 text-[#79E7E5]">★</span>
          </span>
        ))}
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FFE3F1] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FFE3F1] to-transparent" />
    </div>
  );
}

// ============================================================================
// TILT CARD — 3D tilt + glare mengikuti kursor
// ============================================================================

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const glare = glareRef.current;
    if (!el || !glare) return;

    const rX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
    const rY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rY((px - 0.5) * 2 * maxTilt);
      rX((0.5 - py) * 2 * maxTilt);
      gsap.to(glare, {
        opacity: 0.3,
        duration: 0.3,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,117,185,0.4), transparent 60%)`,
      });
    };

    const onLeave = () => {
      rX(0);
      rY(0);
      gsap.to(glare, { opacity: 0, duration: 0.4 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      className={`will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 opacity-0 rounded-2xl z-30"
      />
    </div>
  );
}
