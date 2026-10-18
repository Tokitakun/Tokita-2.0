"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Instagram,
  Github,
  Mail,
  Play,
  Pause,
  SkipForward,
  ChevronDown,
  Music2,
  Disc,
  ListMusic,
  Compass,
  ArrowRight,
  Sparkles,
  User,
} from "lucide-react";
import { FaReact } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import law from "@/img/ce.webp";
import { Magnetic, TiltCard } from "@/Components/fx";
import { GlitchText, BootGlitch } from "@/Components/glitch";

// ============================================================================
// PRO AUDIO PLAYER (WITH PLAYLIST DRAWER) — KAWAII CYBER DESKTOP VIBES
// ============================================================================
interface Track { title: string; file: string; }

const ProAudioPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/audio/playlist.json')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setTracks)
      .catch(() => setTracks([{ title: "Background Vibes", file: "/audio/Background.mp3" }]));
  }, []);

  useEffect(() => {
    if (!audioRef.current && tracks.length) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onEnd = () => {
      if (currentIndex + 1 < tracks.length) setCurrentIndex(i => i + 1);
      else setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [tracks.length]);

  useEffect(() => {
    if (!audioRef.current || !tracks.length) return;
    const audio = audioRef.current;
    if (audio.src !== tracks[currentIndex]?.file) {
      audio.src = tracks[currentIndex].file;
      audio.load();
      if (isPlaying) audio.play().catch(() => {});
    }
  }, [currentIndex, tracks, isPlaying]);

  useEffect(() => {
    if (audioRef.current) isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const selectTrack = (i: number) => { 
    setCurrentIndex(i); 
    setIsPlaying(true); 
    setShowPlaylist(false); 
  };

  if (!tracks.length) return null;

  return (
    <div className="absolute -bottom-10 right-0 md:right-2 z-30 flex flex-col items-end gap-2">
      {/* Playlist Drawer */}
      <div 
        className={`bg-white/95 backdrop-blur-xl border-2 border-[#FF75B9] rounded-2xl overflow-hidden transition-all duration-300 origin-bottom-right shadow-[0_12px_30px_rgba(245,77,173,0.2),_4px_4px_0px_#F0C8DF] ${
          showPlaylist ? "scale-100 opacity-100 mb-2 w-72 p-2" : "scale-90 opacity-0 pointer-events-none h-0 w-0 p-0"
        }`}
      >
        <div className="window-header -mx-2 -mt-2 mb-2 px-3 py-1.5 rounded-t-xl bg-[#FFE3F1] border-b-2 border-[#F0C8DF]">
          <span className="text-[10px] font-mono font-bold text-[#F54DAD]">PLAYLIST.EXE</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
            <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
          </div>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
          {tracks.map((t, i) => (
            <button 
              key={i} 
              onClick={() => selectTrack(i)} 
              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between gap-2 ${
                i === currentIndex 
                  ? "bg-[#FFE3F1] text-[#F54DAD] border border-[#FF75B9] font-semibold" 
                  : "text-[#302432] hover:bg-[#FFF4FA]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Music2 size={12} className={i === currentIndex ? "text-[#F54DAD]" : "text-[#806D7D]"} />
                <span className="truncate">{t.title}</span>
              </div>
              {i === currentIndex && isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F54DAD] animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Pill */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white/95 backdrop-blur-md border-2 border-[#FF75B9] rounded-full shadow-[0_8px_24px_rgba(245,77,173,0.15),_3px_3px_0px_#F0C8DF] hover:border-[#F54DAD] transition-all min-w-[270px]">
        <div className={`p-2 rounded-full ${isPlaying ? 'bg-[#FF75B9] text-white' : 'bg-[#FFE3F1] text-[#F54DAD]'}`}>
          <Disc size={15} className={isPlaying ? "animate-spin-slow" : ""} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-[#F54DAD] font-mono font-bold uppercase tracking-wider">
            {isPlaying ? "SOUNDTRACK PLAYING" : "AUDIO READY"}
          </p>
          <p className="text-xs text-[#302432] font-semibold truncate">{tracks[currentIndex]?.title}</p>
        </div>

        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => setShowPlaylist(!showPlaylist)} 
            className={`p-1.5 rounded-lg transition ${showPlaylist ? 'text-[#F54DAD]' : 'text-[#806D7D] hover:text-[#302432]'}`}
            aria-label="Toggle playlist"
          >
            {showPlaylist ? <ChevronDown size={14} /> : <ListMusic size={14} />}
          </button>
          <button 
            type="button"
            onClick={() => setIsPlaying(p => !p)} 
            className="p-1.5 text-[#302432] hover:text-[#F54DAD] transition-colors"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          <button 
            type="button"
            onClick={() => setCurrentIndex(i => (i + 1) % tracks.length)} 
            className="p-1.5 text-[#806D7D] hover:text-[#302432] transition-colors"
            aria-label="Next track"
          >
            <SkipForward size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN HERO COMPONENT — NAFIS.EXE
// ============================================================================
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const coreStack = [
    { icon: SiNextdotjs, name: "Next.js", color: "#302432" },
    { icon: FaReact, name: "React", color: "#00B8D9" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  ];

  const [displayText, setDisplayText] = useState("");
  const phrases = [
    "Front-End Developer & UI/UX Enthusiast",
    "Kawaii Cyber Creative Coder",
    "Interface Experimenter & Builder",
    "Next.js & TypeScript Crafter"
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];
    if (displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => setDisplayText(currentPhrase.slice(0, displayText.length + 1)), 65);
    } else {
      timeout = setTimeout(() => { 
        setDisplayText(""); 
        setPhraseIndex((prev) => (prev + 1) % phrases.length); 
      }, 2400);
    }
    return () => clearTimeout(timeout);
  }, [displayText, phraseIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" });
      if (textRef.current) gsap.fromTo(textRef.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[92vh] md:min-h-screen bg-[#FFF4FA] flex items-center justify-center">
      <BootGlitch>
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-[#FFE3F1] blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-[#79E7E5]/20 blur-3xl pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 pt-28 pb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">
        
        {/* LEFT CONTENT */}
        <div ref={textRef} className="flex-1 text-center md:text-left space-y-6">
          
          {/* Eyebrow / Terminal Greeting */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#FFE3F1]">
            <span className="w-2 h-2 rounded-full bg-[#79E7E5] border border-[#FF75B9] animate-pulse" />
            <span>WELCOME TO MY LITTLE CORNER OF THE INTERNET</span>
            <span className="text-[#79E7E5]">★</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#302432] leading-[1.08] tracking-tight font-sora">
            Hi, I{"'"}m{" "}
            <GlitchText as="span" className="text-[#F54DAD]">Nafis!</GlitchText>
          </h1>

          {/* Role Dynamic Typing */}
          <div className="h-8 md:h-10">
            <p className="text-lg md:text-2xl text-[#806D7D] font-medium flex items-center justify-center md:justify-start gap-1 font-mono">
              <span className="text-[#F54DAD]">★</span>
              <span className="text-[#302432]">{displayText}</span>
              <span className="text-[#FF75B9] animate-blink font-bold">_</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-[#806D7D] max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base font-inter">
            I build digital experiences, experiment with interfaces, and turn ideas into useful products.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Magnetic strength={0.25}>
              <Link 
                href="/project" 
                className="px-6 py-3.5 bg-[#FF75B9] hover:bg-[#F54DAD] text-white font-bold rounded-xl transition-all shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[2px_2px_0px_#F0C8DF] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-2 active:scale-95 text-sm md:text-base"
                data-cursor="hover"
              >
                <Compass size={18} />
                <span>Explore My Projects</span>
                <ArrowRight size={16} />
              </Link>
            </Magnetic>

            <Link 
              href="/about" 
              className="px-6 py-3.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#FF75B9] text-[#302432] hover:text-[#F54DAD] font-bold rounded-xl transition-all shadow-[4px_4px_0px_#FFE3F1] flex items-center gap-2 active:scale-95 text-sm md:text-base"
              data-cursor="hover"
            >
              <User size={18} className="text-[#FF75B9]" />
              <span>Get to Know Me</span>
            </Link>
          </div>

          {/* CORE STACK OVERVIEW: Kawaii Window Style */}
          <div className="border-2 border-[#F0C8DF] rounded-2xl bg-white overflow-hidden max-w-lg mx-auto md:mx-0 shadow-[3px_3px_0px_#FFE3F1]">
            <div className="window-header px-3.5 py-1.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider flex items-center gap-1">
                <span>★</span> CORE_TOOLBOX.SYS
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                <span className="w-2 h-2 rounded-full bg-[#A993FF]" />
              </div>
            </div>
            <ul className="flex flex-wrap divide-x divide-[#F0C8DF]">
              {coreStack.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2 px-3.5 py-2.5 flex-1 justify-center sm:justify-start"
                >
                  <tech.icon size={16} style={{ color: tech.color }} />
                  <span className="text-xs font-bold text-[#302432] font-mono">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Social Links Row */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
            {[
              { icon: Github, href: "https://github.com/Tokitakun", label: "GitHub" },
              { icon: Instagram, href: "https://www.instagram.com/_nafietzsche/", label: "Instagram" },
              { icon: Mail, href: "mailto:nafismuhammad277@gmail.com", label: "Email" },
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-3 rounded-xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] hover:text-[#F54DAD] transition-all duration-150 hover:-translate-y-0.5 shadow-[2px_2px_0px_#FFE3F1]"
                data-cursor="hover"
              >
                <item.icon size={17} />
              </a>
            ))}
          </div>

        </div>

        {/* RIGHT VISUAL: Desktop Window Frame + Avatar + Sound Player */}
        <div className="relative w-full max-w-sm md:max-w-md aspect-square flex items-center justify-center">
          
          <TiltCard maxTilt={6} className="relative z-20 w-full max-w-[320px]">
            <div ref={imageRef} className="relative w-full">
              
              {/* Window Container */}
              <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#FF75B9] shadow-[6px_6px_0px_#F0C8DF,_0_20px_40px_rgba(245,77,173,0.15)] bg-white">
                {/* Desktop Window Title Bar */}
                <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F54DAD] flex items-center gap-1.5">
                    <span>★</span> NAFIS_AVATAR.EXE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F54DAD]" />
                  </div>
                </div>

                {/* Avatar Visual */}
                <div className="relative aspect-[4/5] w-full bg-[#FFF4FA] overflow-hidden">
                  <Image 
                    src={law} 
                    alt="Nafis Avatar" 
                    fill 
                    className="object-cover object-top hover:scale-105 transition-transform duration-500" 
                    priority 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  
                  {/* Status Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-white/95 backdrop-blur-md border border-[#F0C8DF] rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#FFE3F1]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#63CBA8] animate-pulse" />
                      <span className="text-[11px] font-mono font-bold text-[#302432]">NAFIS // TOKITA</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FFE3F1] text-[#F54DAD] font-bold">
                      READY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Integrated Pro Audio Player */}
          <ProAudioPlayer />
        </div>

      </div>

      </BootGlitch>

      {/* Bottom Kawaii Divider */}
      <div className="omori-divider absolute bottom-0 left-0" />
    </section>
  );
}