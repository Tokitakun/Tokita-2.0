"use client";

<<<<<<< HEAD:app/hero/page.tsx
import { useEffect, useRef } from "react";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import { ScrollProgress } from "@/Components/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";
=======
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  Award,
  Instagram,
  Github,
  Mail,
  MessageCircle,
  Play,
  Pause,
  SkipForward,
  ChevronDown,
  Music2,
  Disc,
  ListMusic,
} from "lucide-react";
import { SiMyanimelist, SiRobloxstudio } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { PiGameControllerDuotone } from "react-icons/pi";
import law from "@/public/images/ce.webp";
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/sections/hero.tsx

export default function HeroPage() {
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
    </div>
  );
<<<<<<< HEAD:app/hero/page.tsx
}
=======
};

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState("");
  const phrases = ["Front End Developer", "UI/UX Enthusiast", "Creative Problem Solver"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];
    if (displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => setDisplayText(currentPhrase.slice(0, displayText.length + 1)), 100);
    } else {
      timeout = setTimeout(() => { setDisplayText(""); setPhraseIndex((prev) => (prev + 1) % phrases.length); }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [displayText, phraseIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" });
      if (orbitRef.current) gsap.to(orbitRef.current, { rotate: 360, duration: 30, repeat: -1, ease: "linear" });
      if (textRef.current) gsap.fromTo(textRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.3 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-screen bg-[#2A2A2A] flex items-center justify-center">
      
      {/* --- BACKGROUND LAYERS --- */}
      {/* Clean background with organic wave accents below */}
      
      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-20 pb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* LEFT CONTENT */}
        <div ref={textRef} className="flex-1 text-center md:text-left space-y-6">
         

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Hello, I'm <br />
            <span className="text-[#6B9FBF]">Nafis.</span>
          </h1>

          <div className="h-8 md:h-10">
            <p className="text-xl md:text-2xl text-gray-400 font-light">
              {displayText}<span className="animate-blink">|</span>
            </p>
          </div>

          <p className="text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Seorang pengembang frontend yang berfokus pada menciptakan pengalaman digital yang interaktif, responsif, dan estetis menggunakan teknologi modern.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
            {[
              { icon: Github, href: "https://github.com/Tokitakun" },
              { icon: Instagram, href: "https://www.instagram.com/_nafietzsche/" },
              { icon: Mail, href: "mailto:nafismuhammad277@gmail.com" },
              { icon: MessageCircle, href: "#contact" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-[#6B9FBF] hover:border-[#6B9FBF] hover:text-white text-gray-400 transition-all duration-300 hover:-translate-y-1">
                <item.icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
            <Link href="/serti" className="group relative px-6 py-3 bg-white text-[#2A2A2A] font-semibold rounded-xl overflow-hidden transition-all hover:bg-gray-100 hover:shadow-lg">
              <span className="relative z-10 flex items-center gap-2"><Award size={18} /> Certificates</span>
            </Link>
            <a href="#" className="px-6 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2">
              <Download size={18} /> Download CV
            </a>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative w-full max-w-md md:max-w-lg aspect-square flex items-center justify-center">
          <div ref={imageRef} className="relative z-20 w-64 h-80 md:w-80 md:h-96">
             <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#2D2D2D]">
               <Image src={law} alt="Nafis Profile" fill className="object-cover hover:scale-105 transition-transform duration-700" priority />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             </div>
          </div>

          <div ref={orbitRef} className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-[-40px] border border-dashed border-white/10 rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-[#2A2A2A] p-3 rounded-xl border border-white/10 shadow-lg"><SiMyanimelist className="text-[#6B9FBF] text-3xl" /></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 bg-[#2A2A2A] p-3 rounded-xl border border-white/10 shadow-lg"><FaReact className="text-[#61DAFB] text-3xl" /></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-[#2A2A2A] p-3 rounded-xl border border-white/10 shadow-lg"><PiGameControllerDuotone className="text-[#B06C6C] text-3xl" /></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-[#2A2A2A] p-3 rounded-xl border border-white/10 shadow-lg"><SiRobloxstudio className="text-white text-3xl" /></div>
          </div>

          {/* INTEGRATED PRO AUDIO PLAYER */}
          <ProAudioPlayer />
        </div>
      </div>

      {/* Custom Styles for Wave Animation */}
      <style jsx>{`
        @keyframes wave-1 {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
          100% { transform: translateX(0); }
        }
        @keyframes wave-2 {
          0% { transform: translateX(0); }
          50% { transform: translateX(25px); }
          100% { transform: translateX(0); }
        }
        @keyframes wave-3 {
          0% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
          100% { transform: translateX(0); }
        }
        .animate-wave-1 { animation: wave-1 10s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-2 15s ease-in-out infinite; }
        .animate-wave-3 { animation: wave-3 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/sections/hero.tsx
