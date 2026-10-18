"use client";

import { useEffect, useRef } from "react";
<<<<<<< HEAD
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import { ScrollProgress } from "@/Components/fx";
import { CrtOverlay, Whisper } from "@/Components/glitch";
import { useReducedMotion } from "@/lib/useReducedMotion";
=======
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "@/components/layout/cursor";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import EducationTimeline from "@/components/sections/timeline";
import About from "@/components/about";
import Projects from "@/components/sections/projects";
import ContactSection from "@/app/contact/page";

gsap.registerPlugin(ScrollTrigger);
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
<<<<<<< HEAD
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
=======
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />  {/* ← PINDAHKAN KE SINI, di atas hero */}
      <div id="hero" ref={heroRef}><Hero /></div>
      <About />
      <div id="education"><EducationTimeline /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><ContactSection /></div>
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
      <Footer />
      <Whisper />
    </div>
  );
}
