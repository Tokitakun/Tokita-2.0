"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/fx";
import { CrtOverlay, Whisper } from "@/components/layout/glitch";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Footer />
      <Whisper />
    </div>
  );
}
