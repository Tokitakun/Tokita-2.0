"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function HeroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Hero />
      <Footer />
    </div>
  );
}
