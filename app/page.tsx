"use client";

import { useEffect, useRef } from "react";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import { ScrollProgress } from "@/Components/fx";
import { CrtOverlay, Whisper } from "@/Components/glitch";
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
