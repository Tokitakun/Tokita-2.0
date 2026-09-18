"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, X, ChevronDown, MapPin } from "lucide-react";
import CustomCursor from "@/components/layout/cursor";
import Footer from "@/components/layout/footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Social {
  label: string;
  url: string;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  bio: string;
  location?: string;
  avatarUrl: string;
  githubUrl: string;
  zone: "sunlight" | "twilight" | "abyss";
  fishColor: string;
  fishAccent: string;
  socials?: Social[];
  posX: number;
  posY: number;
  fishSize: number;
  flipX?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FRIENDS: Friend[] = [
  {
    id: "barabr0",
    name: "Bara",
    username: "Barabr0",
    bio: "My daily life its usually @NLFTs @godotengine @laravel @blender",
    location: "Bandung",
    avatarUrl: "https://avatars.githubusercontent.com/u/228843429?v=4",
    githubUrl: "https://github.com/Barabr0",
    zone: "sunlight",
    fishColor: "#f97316",
    fishAccent: "#fdba74",
    posX: 18,
    posY: 35,
    fishSize: 1.1,
  },
  {
    id: "davingm",
    name: "Kinn",
    username: "davingm",
    bio: "Sure..... @nuxt @nlfts @vuejs",
    location: "Shenzhen, China",
    avatarUrl: "https://avatars.githubusercontent.com/u/228851591?v=4",
    githubUrl: "https://github.com/davingm",
    zone: "sunlight",
    fishColor: "#22c55e",
    fishAccent: "#86efac",
    posX: 72,
    posY: 55,
    fishSize: 0.95,
    flipX: true,
  },
  {
    id: "destkaa",
    name: "KakaViangi",
    username: "Destkaa",
    bio: "Orang terkuat adalah dia yang paling mampu berdiri sendiri. @NFLTs",
    location: "Bandung, Indonesia",
    avatarUrl: "https://avatars.githubusercontent.com/u/228332586?v=4",
    githubUrl: "https://github.com/Destkaa",
    zone: "twilight",
    fishColor: "#a855f7",
    fishAccent: "#d8b4fe",
    posX: 25,
    posY: 40,
    fishSize: 1.05,
    flipX: true,
  },
  {
    id: "nairha",
    name: "azunya",
    username: "nairha",
    bio: "Harum dan wangi @NLFTs @nuxt",
    location: "Indonesia, Yogyakarta",
    avatarUrl: "https://avatars.githubusercontent.com/u/204519754?v=4",
    githubUrl: "https://github.com/nairha",
    zone: "twilight",
    fishColor: "#ec4899",
    fishAccent: "#f9a8d4",
    posX: 65,
    posY: 62,
    fishSize: 0.9,
  },
  {
    id: "radiedtya",
    name: "Radiedtya",
    username: "Radiedtya",
    bio: "Just a Rocky",
    location: "Bandung",
    avatarUrl: "https://avatars.githubusercontent.com/u/226198461?v=4",
    githubUrl: "https://github.com/Radiedtya",
    zone: "abyss",
    fishColor: "#38bdf8",
    fishAccent: "#7dd3fc",
    posX: 30,
    posY: 45,
    fishSize: 1.0,
    flipX: true,
  },
  {
    id: "sidiktsq",
    name: "Siddiq",
    username: "sidiktsq",
    bio: "github brother in arms",
    location: "Kyoto",
    avatarUrl: "https://avatars.githubusercontent.com/u/230048582?v=4",
    githubUrl: "https://github.com/sidiktsq",
    zone: "abyss",
    fishColor: "#818cf8",
    fishAccent: "#c7d2fe",
    posX: 68,
    posY: 35,
    fishSize: 1.15,
  },
];

// ─── Pixel Fish ───────────────────────────────────────────────────────────────

interface PixelFishProps {
  color: string;
  accent: string;
  size?: number;
  flipX?: boolean;
  isSelected?: boolean;
  isAbyss?: boolean;
}

const PixelFish = ({ color, accent, size = 1, flipX = false, isSelected = false, isAbyss = false }: PixelFishProps) => {
  const sc = size * 36;
  const glowFilter = isAbyss
    ? `drop-shadow(0 0 8px ${color}88)`
    : isSelected
      ? `drop-shadow(0 0 12px ${color})`
      : "none";
  return (
    <svg
      width={sc * 2.8}
      height={sc * 1.6}
      viewBox="0 0 56 32"
      style={{ imageRendering: "pixelated", transform: flipX ? "scaleX(-1)" : "scaleX(1)", filter: glowFilter }}
    >
      {/* Tail */}
      <rect x="0" y="10" width="4" height="4" fill={color} opacity="0.7" />
      <rect x="0" y="6" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="0" y="14" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="4" y="8" width="4" height="8" fill={color} opacity="0.85" />
      {/* Body */}
      <rect x="8" y="6" width="4" height="12" fill={color} />
      <rect x="12" y="4" width="4" height="16" fill={color} />
      <rect x="16" y="4" width="4" height="16" fill={color} />
      <rect x="20" y="4" width="4" height="16" fill={color} />
      <rect x="24" y="6" width="4" height="12" fill={color} />
      <rect x="28" y="6" width="4" height="12" fill={color} />
      <rect x="32" y="6" width="4" height="12" fill={color} />
      {/* Head */}
      <rect x="36" y="8" width="4" height="10" fill={color} />
      <rect x="40" y="10" width="4" height="8" fill={color} />
      <rect x="44" y="12" width="4" height="6" fill={color} />
      <rect x="48" y="13" width="4" height="5" fill={color} />
      <rect x="52" y="15" width="4" height="3" fill={color} opacity="0.7" />
      {/* Eye */}
      <rect x="40" y="10" width="4" height="4" fill={accent} />
      <rect x="41" y="11" width="2" height="2" fill="#000" />
      <rect x="41" y="11" width="1" height="1" fill="#fff" opacity="0.8" />
      {/* Fins */}
      <rect x="16" y="0" width="4" height="4" fill={accent} opacity="0.7" />
      <rect x="20" y="0" width="8" height="4" fill={accent} opacity="0.7" />
      <rect x="20" y="20" width="8" height="4" fill={accent} opacity="0.6" />
      {/* Scales */}
      <rect x="14" y="8" width="2" height="2" fill={accent} opacity="0.4" />
      <rect x="20" y="8" width="2" height="2" fill={accent} opacity="0.4" />
      <rect x="26" y="8" width="2" height="2" fill={accent} opacity="0.4" />
      {/* Bioluminescence */}
      {isAbyss && (
        <>
          <rect x="16" y="12" width="2" height="2" fill={accent} />
          <rect x="24" y="10" width="2" height="2" fill={accent} opacity="0.8" />
          <rect x="32" y="12" width="2" height="2" fill={accent} />
        </>
      )}
    </svg>
  );
};

// ─── Jellyfish ────────────────────────────────────────────────────────────────

const PixelJellyfish = ({ color }: { color: string }) => (
  <svg width="48" height="56" viewBox="0 0 24 28" style={{ imageRendering: "pixelated" }}>
    <rect x="8" y="0" width="8" height="2" fill={color} opacity="0.7" />
    <rect x="6" y="2" width="12" height="2" fill={color} opacity="0.8" />
    <rect x="4" y="4" width="16" height="6" fill={color} />
    <rect x="4" y="10" width="16" height="2" fill={color} opacity="0.6" />
    <rect x="10" y="12" width="2" height="6" fill={color} opacity="0.4" />
    <rect x="14" y="12" width="2" height="4" fill={color} opacity="0.4" />
    <rect x="10" y="18" width="2" height="4" fill={color} opacity="0.3" />
    <rect x="14" y="16" width="2" height="6" fill={color} opacity="0.3" />
    <rect x="8" y="5" width="3" height="2" fill="#fff" opacity="0.25" />
  </svg>
);

// ─── Coral ────────────────────────────────────────────────────────────────────

const PixelCoral = ({ x, color }: { x: number; color: string }) => (
  <svg
    width="32" height="40" viewBox="0 0 16 20"
    style={{ imageRendering: "pixelated", position: "absolute", left: x, bottom: 0 }}
  >
    <rect x="6" y="14" width="4" height="6" fill={color} />
    <rect x="4" y="10" width="8" height="4" fill={color} />
    <rect x="2" y="6" width="4" height="6" fill={color} opacity="0.8" />
    <rect x="10" y="6" width="4" height="6" fill={color} opacity="0.8" />
    <rect x="0" y="4" width="4" height="4" fill={color} opacity="0.7" />
    <rect x="12" y="4" width="4" height="4" fill={color} opacity="0.7" />
    <rect x="4" y="0" width="4" height="6" fill={color} opacity="0.9" />
    <rect x="8" y="2" width="4" height="4" fill={color} opacity="0.9" />
  </svg>
);

// ─── Seaweed ──────────────────────────────────────────────────────────────────

const Seaweed = ({ x, height, color }: { x: number; height: number; color: string }) => {
  const segments = Math.floor(height / 8);
  return (
    <svg
      width="12" height={height} viewBox={`0 0 6 ${height}`}
      style={{ imageRendering: "pixelated", position: "absolute", left: x, bottom: 0 }}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <rect key={i} x={i % 2 === 0 ? 0 : 2} y={height - (i + 1) * 8}
          width="4" height="8" fill={color} opacity={0.6 + (i / segments) * 0.4} />
      ))}
    </svg>
  );
};

// ─── Depth Indicator ──────────────────────────────────────────────────────────

const DepthIndicator = ({ scrollProgress }: { scrollProgress: number }) => {
  const depth = Math.round(scrollProgress * 1000);
  const markers = [
    { label: "0m", p: 0 },
    { label: "200m", p: 0.3 },
    { label: "600m", p: 0.6 },
    { label: "1000m", p: 0.9 },
  ];
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-1 select-none pointer-events-none">
      <div className="relative" style={{ width: 2, height: 180 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/40 via-indigo-400/30 to-purple-900/20" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white"
          style={{ width: 10, height: 10, top: `${scrollProgress * 100}%`, boxShadow: "0 0 6px 2px rgba(255,255,255,0.5)" }}
        />
        {markers.map((m) => (
          <div key={m.label} className="absolute text-[9px] font-mono text-white/35 whitespace-nowrap"
            style={{ top: `${m.p * 100}%`, left: 6, transform: "translateY(-50%)" }}>
            {m.label}
          </div>
        ))}
      </div>
      <span className="text-[9px] font-mono text-white/40 mt-1">{depth}m</span>
    </div>
  );
};

// ─── Profile Dialogue ─────────────────────────────────────────────────────────

interface ProfileDialogueProps {
  friend: Friend;
  onClose: () => void;
}

const ProfileDialogue = ({ friend, onClose }: ProfileDialogueProps) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 max-w-sm w-full"
        initial={{ scale: 0.85, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby={`dlg-${friend.id}`}
      >
        <div
          className="bg-[#0d1b2a] border-2 overflow-hidden shadow-2xl"
          style={{ borderColor: `${friend.fishColor}88`, boxShadow: `0 0 24px 4px ${friend.fishColor}33` }}
        >
          {/* Top accent */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(to right,transparent,${friend.fishColor},transparent)` }} />
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: `${friend.fishColor}33` }}>
            <div className="flex items-center gap-3">
              <div style={{ width: 52, height: 30 }} className="flex items-center justify-center">
                <PixelFish color={friend.fishColor} accent={friend.fishAccent} size={0.5} isAbyss={friend.zone === "abyss"} />
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: friend.fishColor }}>
                  GitHub Friend Encountered
                </p>
                <h2 id={`dlg-${friend.id}`} className="text-white font-bold text-base leading-tight">{friend.name}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
              <X size={16} />
            </button>
          </div>
          {/* Body */}
          <div className="p-5 space-y-4">
            <div className="flex gap-4 items-start">
              {/* UPDATED: Round Avatar with GitHub Badge */}
              <div className="relative flex-shrink-0 overflow-hidden border-2 rounded-full"
                style={{ width: 64, height: 64, borderColor: `${friend.fishColor}66` }}>
                <Image src={friend.avatarUrl} alt={friend.name} fill className="object-cover" unoptimized />
                <div
                  className="absolute -bottom-1 -right-1 rounded-full p-1 border flex items-center justify-center bg-[#0d1b2a]"
                  style={{ borderColor: `${friend.fishColor}66` }}
                >
                  <Github size={12} color={friend.fishColor} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                  <Github size={10} /> @{friend.username}
                </p>
                {friend.location && (
                  <p className="text-[10px] text-white/40 font-mono mt-1 flex items-center gap-1">
                    <MapPin size={9} />{friend.location}
                  </p>
                )}
                {friend.bio && <p className="text-xs text-white/70 mt-2 leading-relaxed">{friend.bio}</p>}
              </div>
            </div>
            <a
              href={friend.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-medium transition-all group"
              style={{ background: `${friend.fishColor}18`, border: `1px solid ${friend.fishColor}33`, color: friend.fishColor }}
            >
              <span className="flex items-center gap-2"><Github size={14} />Visit GitHub Profile</span>
              <ExternalLink size={11} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            {friend.socials?.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all">
                {s.label}<ExternalLink size={11} />
              </a>
            ))}
          </div>
          {/* Footer */}
          <div className="px-5 py-2.5 border-t flex items-center justify-between" style={{ borderColor: `${friend.fishColor}22` }}>
            <p className="text-[9px] font-mono text-white/25 uppercase tracking-widest">Zone: {friend.zone}</p>
            <button onClick={onClose}
              className="text-[9px] font-mono px-3 py-1 border transition-all hover:bg-white/10"
              style={{ borderColor: `${friend.fishColor}55`, color: friend.fishColor }}>
              [ CLOSE ]
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Zone Fish ────────────────────────────────────────────────────────────────

interface ZoneFishProps {
  friend: Friend;
  onSelect: (f: Friend) => void;
  isSelected: boolean;
}

const ZoneFish = ({ friend, onSelect, isSelected }: ZoneFishProps) => (
  <motion.div
    className="absolute cursor-pointer group"
    style={{ left: `${friend.posX}%`, top: `${friend.posY}%`, transform: "translate(-50%,-50%)", zIndex: isSelected ? 30 : 10 }}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    onClick={() => onSelect(friend)}
    role="button" tabIndex={0}
    aria-label={`View ${friend.name} GitHub profile`}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(friend); }}
  >
    {/* UPDATED: Hover Round Profile Avatar with GitHub Badge */}
    <div
      className="absolute pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:-translate-y-2"
      style={{ left: "50%", top: "-4.5rem", transform: "translateX(-50%)" }}
    >
      <div className="relative">
        <Image
          src={friend.avatarUrl}
          alt={`${friend.name} GitHub Avatar`}
          width={48}
          height={48}
          className="rounded-full border-2 bg-[#0d1b2a] object-cover"
          style={{ borderColor: friend.fishColor, boxShadow: `0 0 15px ${friend.fishColor}66` }}
          unoptimized
        />
        <div
          className="absolute -bottom-1 -right-1 rounded-full p-1 border flex items-center justify-center bg-[#0d1b2a]"
          style={{ borderColor: friend.fishColor }}
        >
          <Github size={12} color={friend.fishColor} />
        </div>
      </div>
    </div>

    {/* UPDATED: Name tag with GitHub icon, always slightly visible */}
    <motion.div
      className="absolute whitespace-nowrap pointer-events-none z-20"
      style={{ left: "50%", top: "-1.5rem", transform: "translateX(-50%)" }}
      initial={{ opacity: 0.6, y: 0 }}
      animate={isSelected ? { opacity: 1, y: -2 } : { opacity: 0.6, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="px-2 py-1 text-[10px] font-bold font-mono border flex items-center gap-1.5 transition-all group-hover:opacity-100 group-hover:bg-white/5"
        style={{ background: "#0d1b2a", color: friend.fishColor, borderColor: `${friend.fishColor}66` }}
      >
        <Github size={10} />
        {friend.name}
      </div>
    </motion.div>

    {/* Fish sprite */}
    <div className="transition-transform duration-150 group-hover:scale-110"
      style={{ filter: isSelected ? `drop-shadow(0 0 10px ${friend.fishColor})` : undefined }}>
      <PixelFish color={friend.fishColor} accent={friend.fishAccent} size={friend.fishSize}
        flipX={friend.flipX} isSelected={isSelected} isAbyss={friend.zone === "abyss"} />
    </div>

    {/* Idle glow pulse */}
    {!isSelected && (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ scale: [1, 1.6], opacity: [0.25, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        style={{ background: `radial-gradient(circle,${friend.fishColor}44 0%,transparent 70%)` }}
      />
    )}
  </motion.div>
);

// ─── Ocean Zone ───────────────────────────────────────────────────────────────

interface OceanZoneProps {
  id: string;
  depth: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  friends: Friend[];
  onSelectFriend: (f: Friend) => void;
  selectedFriend: Friend | null;
  decorations?: React.ReactNode;
  minHeight?: string;
}

const OceanZone = ({
  id, depth, title, subtitle, bgGradient,
  friends, onSelectFriend, selectedFriend,
  decorations, minHeight = "600px",
}: OceanZoneProps) => (
  <motion.section
    id={id}
    className="relative w-full overflow-hidden"
    style={{ minHeight, background: bgGradient }}
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }} viewport={{ once: true }}
  >
    {decorations}
    <div className="absolute top-6 left-6 z-20 pointer-events-none">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase border border-white/10 px-2 py-0.5">{depth}</span>
        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">{title}</span>
      </div>
      <p className="text-xs text-white/20 font-mono mt-1 hidden md:block">{subtitle}</p>
    </div>
    <div className="relative w-full" style={{ minHeight }}>
      {friends.map((f) => (
        <ZoneFish key={f.id} friend={f} onSelect={onSelectFriend} isSelected={selectedFriend?.id === f.id} />
      ))}
    </div>
  </motion.section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => {
      const el = pageRef.current;
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSelect = useCallback((friend: Friend) => {
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));
  }, []);
  const handleClose = useCallback(() => setSelectedFriend(null), []);

  const sunlight = FRIENDS.filter((f) => f.zone === "sunlight");
  const twilight = FRIENDS.filter((f) => f.zone === "twilight");
  const abyss = FRIENDS.filter((f) => f.zone === "abyss");

  const bubbles = [
    { s: 8, l: 10, d: 0, dur: 9 },
    { s: 5, l: 25, d: 1.5, dur: 7 },
    { s: 12, l: 45, d: 0.8, dur: 11 },
    { s: 6, l: 62, d: 2.2, dur: 8 },
    { s: 9, l: 80, d: 0.4, dur: 10 },
    { s: 4, l: 90, d: 3.0, dur: 6 },
    { s: 7, l: 35, d: 4.1, dur: 9 },
    { s: 5, l: 55, d: 1.1, dur: 7 },
  ];

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-x-hidden" style={{ background: "#061021" }}>
      {mounted && <CustomCursor />}
      {mounted && <DepthIndicator scrollProgress={scrollProgress} />}

      {/* Global floating bubbles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {bubbles.map((b, i) => (
            <motion.div key={i}
              className="absolute rounded-full border border-white/20 bg-white/5"
              style={{ width: b.s, height: b.s, left: `${b.l}%`, bottom: 0 }}
              animate={{ y: [0, -1000], opacity: [0, 0.6, 0.3, 0] }}
              transition={{ duration: b.dur, delay: b.d, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg,#0ea5e9 0%,#0369a1 30%,#075985 60%,#0c1a35 100%)" }}
      >
        {/* Sun glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "200%", height: "80%", background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,200,0.15) 0%,transparent 70%)" }}
        />
        {/* Back nav */}
        <div className="absolute top-6 left-6 z-30">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-mono transition-colors group">
            <div className="p-1.5 border border-white/20 group-hover:border-white/50 transition-colors"><ArrowLeft size={12} /></div>
            Back to Portfolio
          </Link>
        </div>
        {/* Decorative fish */}
        <div className="absolute top-[25%] left-[15%] pointer-events-none opacity-40">
          <PixelFish color="#7dd3fc" accent="#e0f2fe" size={0.7} />
        </div>
        <div className="absolute top-[40%] right-[12%] pointer-events-none opacity-30">
          <PixelFish color="#bfdbfe" accent="#eff6ff" size={0.55} flipX />
        </div>
        {/* Hero text */}
        <div className="relative z-20 text-center px-6 max-w-2xl">
          <motion.p className="text-sky-300/70 text-xs font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            ◈ Ocean Depth ◈
          </motion.p>
          <motion.h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ textShadow: "0 0 40px rgba(14,165,233,0.4)" }}>
            Friends Beneath<br /><span className="text-sky-300">the Surface</span>
          </motion.h1>
          <motion.p className="text-sky-100/60 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Dive into the depths and discover the developers I call friends. Click any fish to learn who they are.
          </motion.p>
          <motion.a href="#sunlight-zone"
            className="inline-flex items-center gap-2 px-6 py-3 border border-sky-400/50 text-sky-300 font-mono text-sm hover:bg-sky-400/10 transition-all"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Dive In
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.a>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#0c2340" opacity="0.8" />
            <path d="M0,40 C150,20 350,50 600,40 C850,30 1050,50 1200,40 L1200,60 L0,60 Z" fill="#0c1a35" />
          </svg>
        </div>
      </section>

      {/* ── Sunlight Zone ─────────────────────────────────────────────────── */}
      <OceanZone
        id="sunlight-zone" depth="0–200m" title="Sunlight Zone" subtitle="Warm waters, bright companions"
        bgGradient="linear-gradient(180deg,#0c1a35 0%,#0f2744 40%,#0e2a52 80%,#0a2040 100%)"
        friends={sunlight} onSelectFriend={handleSelect} selectedFriend={selectedFriend} minHeight="620px"
        decorations={
          <>
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden">
              <PixelCoral x={40} color="#f97316" />
              <PixelCoral x={120} color="#ec4899" />
              <PixelCoral x={280} color="#f97316" />
              <PixelCoral x={500} color="#a855f7" />
              <Seaweed x={200} height={64} color="#22c55e" />
              <Seaweed x={350} height={48} color="#16a34a" />
              <Seaweed x={650} height={72} color="#15803d" />
            </div>
          </>
        }
      />

      {/* ── Twilight Zone ─────────────────────────────────────────────────── */}
      <OceanZone
        id="twilight-zone" depth="200–1000m" title="Twilight Zone" subtitle="Where light barely reaches"
        bgGradient="linear-gradient(180deg,#0a2040 0%,#071830 40%,#050e20 80%,#030a18 100%)"
        friends={twilight} onSelectFriend={handleSelect} selectedFriend={selectedFriend} minHeight="600px"
        decorations={
          <>
            <div className="absolute top-[20%] right-[10%] pointer-events-none opacity-50">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <PixelJellyfish color="#c084fc" />
              </motion.div>
            </div>
            <div className="absolute top-[55%] left-[5%] pointer-events-none opacity-35">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity }}>
                <PixelJellyfish color="#818cf8" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
              <Seaweed x={80} height={56} color="#1e1b4b" />
              <Seaweed x={220} height={44} color="#1e1b4b" />
              <Seaweed x={420} height={68} color="#1e1b4b" />
            </div>
          </>
        }
      />

      {/* ── Abyss Zone ────────────────────────────────────────────────────── */}
      {abyss.length > 0 && (
        <OceanZone
          id="abyss-zone" depth="1000m+" title="Midnight Zone" subtitle="The deepest connections"
          bgGradient="linear-gradient(180deg,#030a18 0%,#020810 50%,#010509 100%)"
          friends={abyss} onSelectFriend={handleSelect} selectedFriend={selectedFriend} minHeight="580px"
          decorations={
            <>
              <div className="absolute top-1/3 left-1/4 pointer-events-none"
                style={{ width: 192, height: 192, background: "radial-gradient(circle,rgba(56,189,248,0.04) 0%,transparent 70%)" }} />
              {mounted && [15, 38, 57, 76, 91].map((left, i) => (
                <motion.div key={i} className="absolute pointer-events-none"
                  style={{
                    width: 4, height: 4, borderRadius: "50%",
                    left: `${left}%`, top: `${20 + i * 12}%`,
                    background: ["#38bdf8", "#818cf8", "#c084fc", "#38bdf8", "#818cf8"][i],
                  }}
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.5 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </>
          }
        />
      )}

      {/* ── Sea Floor ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 px-6" style={{ background: "linear-gradient(180deg,#010509 0%,#000305 100%)" }}>
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <p className="text-[9px] font-mono text-white/20 tracking-[0.4em] uppercase mb-6">◈ Sea Floor — Depth Unknown ◈</p>
            <h2 className="text-2xl font-bold text-white/40 mb-4">End of the Dive</h2>
            <p className="text-white/25 text-sm leading-relaxed mb-8">
              These are the friends who make the journey worthwhile. More might surface in the future.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white/60 transition-colors border border-white/10 hover:border-white/25 px-4 py-2"
            >↑ Surface</button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Profile dialogue */}
      <AnimatePresence>
        {selectedFriend && <ProfileDialogue friend={selectedFriend} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
}