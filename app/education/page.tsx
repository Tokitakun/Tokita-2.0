"use client";

import { useEffect, useRef } from "react";
import Timeline from "@/components/sections/timeline";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function EducationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <div className="pt-16">
        <Timeline />
      </div>
      <Footer />
    </div>
  );
}