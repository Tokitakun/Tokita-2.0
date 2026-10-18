"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import About from "@/Components/abu";
import Skills from "@/Components/skills";
import { ProjectShowcase } from "@/app/project/page";
import EducationTimeline from "@/Components/timeline";
import { ContactSection } from "@/app/contact/page";
import Footer from "@/Components/footer";
import { ScrollProgress, Marquee } from "@/Components/fx";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <div id="hero" ref={heroRef}><Hero /></div>
      <Marquee items={[
        "Front-End Developer", 
        "UI/UX Enthusiast", 
        "Next.js & React", 
        "TypeScript", 
        "Kawaii Cyber Aesthetics", 
        "Needy Streamer Overload Inspired", 
        "Tactile Digital Experiences"
      ]} />
      <div id="about"><About /></div>
      <div id="education"><EducationTimeline /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><ProjectShowcase /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  );
}
