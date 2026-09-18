"use client";

import { useEffect, useRef } from "react";
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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    if (heroRef.current) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />  {/* ← PINDAHKAN KE SINI, di atas hero */}
      <div id="hero" ref={heroRef}><Hero /></div>
      <About />
      <div id="education"><EducationTimeline /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  );
}