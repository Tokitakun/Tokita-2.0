"use client";

import { useEffect, useRef } from "react";
import Timeline from "@/Components/timeline";
import Navbar from "@/Components/Navbar";
import { ScrollProgress } from "@/Components/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#1A1A1A] text-[#F0EEE9] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Timeline />
    </div>
  );
}
