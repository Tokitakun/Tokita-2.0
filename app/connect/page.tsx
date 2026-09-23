"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  X,
  ChevronDown,
  MapPin,
} from "lucide-react";
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
    fishColor: "#e07a3c",
    fishAccent: "#f6ad55",
    posX: 22,
    posY: 38,
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
    fishColor: "#38a169",
    fishAccent: "#68d391",
    posX: 74,
    posY: 58,
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
    fishColor: "#805ad5",
    fishAccent: "#b794f4",
    posX: 26,
    posY: 42,
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
    fishColor: "#d53f8c",
    fishAccent: "#fbb6ce",
    posX: 68,
    posY: 64,
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
    zone: "twilight",
    fishColor: "#3182ce",
    fishAccent: "#63b3ed",
    posX: 32,
    posY: 48,
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
    zone: "twilight",
    fishColor: "#5a67d8",
    fishAccent: "#9f7aea",
    posX: 70,
    posY: 38,
    fishSize: 1.15,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_FRIENDS_PER_ZONE = 6;

// Posisi khusus mobile.
// Maksimal 6 fish dalam satu zona.
const MOBILE_POSITIONS = [
  { x: 24, y: 27 },
  { x: 76, y: 27 },
  { x: 24, y: 49 },
  { x: 76, y: 49 },
  { x: 24, y: 71 },
  { x: 76, y: 71 },
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

const PixelFish = memo(function PixelFish({
  color,
  accent,
  size = 1,
  flipX = false,
  isSelected = false,
  isAbyss = false,
}: PixelFishProps) {
  const sc = size * 32;

  const glowFilter = isSelected
    ? `drop-shadow(0 2px 8px ${color}aa)`
    : isAbyss
      ? `drop-shadow(0 2px 4px ${color}66)`
      : "drop-shadow(0 2px 4px rgba(0,0,0,0.4))";

  return (
    <svg
      width={sc * 2.8}
      height={sc * 1.6}
      viewBox="0 0 56 32"
      style={{
        imageRendering: "pixelated",
        transform: flipX ? "scaleX(-1)" : "scaleX(1)",
        filter: glowFilter,
      }}
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
      <rect x="41" y="11" width="1" height="1" fill="#fff" opacity="0.9" />

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
          <rect
            x="24"
            y="10"
            width="2"
            height="2"
            fill={accent}
            opacity="0.8"
          />
          <rect x="32" y="12" width="2" height="2" fill={accent} />
        </>
      )}
    </svg>
  );
});

// ─── Environment Decorative Components ────────────────────────────────────────

const PixelJellyfish = memo(function PixelJellyfish({
  color,
}: {
  color: string;
}) {
  return (
    <svg
      width="36"
      height="42"
      viewBox="0 0 24 28"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="8" y="0" width="8" height="2" fill={color} opacity="0.4" />
      <rect x="6" y="2" width="12" height="2" fill={color} opacity="0.5" />
      <rect x="4" y="4" width="16" height="6" fill={color} opacity="0.6" />
      <rect x="4" y="10" width="16" height="2" fill={color} opacity="0.4" />
      <rect x="10" y="12" width="2" height="6" fill={color} opacity="0.3" />
      <rect x="14" y="12" width="2" height="4" fill={color} opacity="0.3" />
      <rect x="10" y="18" width="2" height="4" fill={color} opacity="0.2" />
      <rect x="14" y="16" width="2" height="6" fill={color} opacity="0.2" />
      <rect x="8" y="5" width="3" height="2" fill="#fff" opacity="0.2" />
    </svg>
  );
});

const PixelCoral = memo(function PixelCoral({
  x,
  color,
}: {
  x: number;
  color: string;
}) {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 16 20"
      style={{
        imageRendering: "pixelated",
        position: "absolute",
        left: x,
        bottom: 0,
      }}
    >
      <rect x="6" y="14" width="4" height="6" fill={color} opacity="0.8" />
      <rect x="4" y="10" width="8" height="4" fill={color} opacity="0.8" />
      <rect x="2" y="6" width="4" height="6" fill={color} opacity="0.6" />
      <rect x="10" y="6" width="4" height="6" fill={color} opacity="0.6" />
      <rect x="0" y="4" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="12" y="4" width="4" height="4" fill={color} opacity="0.5" />
    </svg>
  );
});

const Seaweed = memo(function Seaweed({
  x,
  height,
  color,
}: {
  x: number;
  height: number;
  color: string;
}) {
  const segments = Math.floor(height / 8);

  return (
    <svg
      width="10"
      height={height}
      viewBox={`0 0 6 ${height}`}
      style={{
        imageRendering: "pixelated",
        position: "absolute",
        left: x,
        bottom: 0,
      }}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <rect
          key={i}
          x={i % 2 === 0 ? 0 : 2}
          y={height - (i + 1) * 8}
          width="4"
          height="8"
          fill={color}
          opacity={0.4 + (i / segments) * 0.3}
        />
      ))}
    </svg>
  );
});

// ─── Depth Indicator ──────────────────────────────────────────────────────────

const DepthIndicator = memo(function DepthIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total =
            document.documentElement.scrollHeight - window.innerHeight;

          setScrollProgress(
            total > 0
              ? Math.min(1, Math.max(0, window.scrollY / total))
              : 0,
          );

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const depth = Math.round(scrollProgress * 1000);

  const markers = [
    { label: "0m", p: 0 },
    { label: "200m", p: 0.3 },
    { label: "600m", p: 0.6 },
    { label: "1000m", p: 0.9 },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-1 select-none pointer-events-none">
      <div
        className="relative"
        style={{ width: 2, height: 180 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/30 via-indigo-400/20 to-purple-900/20" />

        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white transition-all duration-75"
          style={{
            width: 8,
            height: 8,
            top: `${scrollProgress * 100}%`,
            boxShadow: "0 0 4px 1px rgba(255,255,255,0.4)",
          }}
        />

        {markers.map((m) => (
          <div
            key={m.label}
            className="absolute text-[9px] font-mono text-white/30 whitespace-nowrap"
            style={{
              top: `${m.p * 100}%`,
              left: 6,
              transform: "translateY(-50%)",
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      <span className="text-[9px] font-mono text-white/35 mt-1">
        {depth}m
      </span>
    </div>
  );
});

// ─── Profile Dialogue ─────────────────────────────────────────────────────────

interface ProfileDialogueProps {
  friend: Friend;
  onClose: () => void;
}

const ProfileDialogue = ({
  friend,
  onClose,
}: ProfileDialogueProps) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", fn);

    return () => {
      window.removeEventListener("keydown", fn);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 max-w-sm w-full my-auto"
        initial={{
          scale: 0.9,
          y: 16,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
          y: 16,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 340,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dlg-${friend.id}`}
      >
        <div
          className="bg-[#0b1626] border overflow-hidden shadow-2xl rounded-xl"
          style={{
            borderColor: `${friend.fishColor}66`,
          }}
        >
          {/* Top accent */}
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${friend.fishColor}, transparent)`,
            }}
          />

          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b bg-[#07111f]"
            style={{
              borderColor: `${friend.fishColor}22`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 44,
                  height: 26,
                }}
                className="flex items-center justify-center shrink-0"
              >
                <PixelFish
                  color={friend.fishColor}
                  accent={friend.fishAccent}
                  size={0.45}
                  isAbyss={friend.zone === "abyss"}
                />
              </div>

              <div>
                <p
                  className="text-[9px] font-mono uppercase tracking-widest"
                  style={{
                    color: friend.fishColor,
                  }}
                >
                  GitHub Friend Encountered
                </p>

                <h2
                  id={`dlg-${friend.id}`}
                  className="text-white font-bold text-base leading-tight"
                >
                  {friend.name}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close dialogue"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div className="flex gap-4 items-start">
              {/* GitHub Avatar */}
              <div
                className="relative flex-shrink-0 overflow-hidden border-2 rounded-full bg-[#07111f]"
                style={{
                  width: 60,
                  height: 60,
                  borderColor: `${friend.fishColor}88`,
                }}
              >
                <Image
                  src={friend.avatarUrl}
                  alt={friend.name}
                  fill
                  sizes="60px"
                  className="object-cover"
                />

                <div
                  className="absolute -bottom-1 -right-1 rounded-full p-1 border flex items-center justify-center bg-[#0b1626]"
                  style={{
                    borderColor: `${friend.fishColor}88`,
                  }}
                >
                  <Github
                    size={11}
                    color={friend.fishColor}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono text-white/60 flex items-center gap-1">
                  <Github size={11} />
                  @{friend.username}
                </p>

                {friend.location && (
                  <p className="text-[10px] text-white/45 font-mono mt-1 flex items-center gap-1">
                    <MapPin size={10} />
                    {friend.location}
                  </p>
                )}

                {friend.bio && (
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {friend.bio}
                  </p>
                )}
              </div>
            </div>

            <a
              href={friend.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-all group"
              style={{
                background: `${friend.fishColor}15`,
                border: `1px solid ${friend.fishColor}40`,
                color: friend.fishColor,
              }}
            >
              <span className="flex items-center gap-2">
                <Github size={14} />
                Visit GitHub Profile
              </span>

              <ExternalLink
                size={12}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>

            {friend.socials?.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3.5 py-2 text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
              >
                {s.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-5 py-2.5 border-t flex items-center justify-between bg-[#07111f]"
            style={{
              borderColor: `${friend.fishColor}22`,
            }}
          >
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              Zone: {friend.zone}
            </p>

            <button
              onClick={onClose}
              className="text-[10px] font-mono px-3 py-1 border rounded transition-all hover:bg-white/10"
              style={{
                borderColor: `${friend.fishColor}66`,
                color: friend.fishColor,
              }}
            >
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
  index: number;
  onSelect: (f: Friend) => void;
  isSelected: boolean;
}

const ZoneFish = memo(function ZoneFish({
  friend,
  index,
  onSelect,
  isSelected,
}: ZoneFishProps) {
  const shouldReduceMotion = useReducedMotion();

  const mobilePosition =
    MOBILE_POSITIONS[index] ?? MOBILE_POSITIONS[0];

  return (
    <motion.div
      className="absolute cursor-pointer group touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1.5"
      style={
        {
          left: `${friend.posX}%`,
          top: `${friend.posY}%`,
          "--mobile-x": `${mobilePosition.x}%`,
          "--mobile-y": `${mobilePosition.y}%`,
          transform: "translate(-50%, -50%)",
          zIndex: isSelected ? 30 : 10,
        } as React.CSSProperties
      }
      animate={
        shouldReduceMotion
          ? {}
          : {
            y: [0, -5, 0],
          }
      }
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={() => onSelect(friend)}
      role="button"
      tabIndex={0}
      aria-label={`Lihat profil GitHub ${friend.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(friend);
        }
      }}
    >
      {/* Friend Name */}
      <div
        className="absolute whitespace-nowrap pointer-events-none z-20 transition-all duration-200"
        style={{
          left: "50%",
          top: "-1.6rem",
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="px-2.5 py-1 text-[11px] font-bold font-mono border rounded-md shadow-md flex items-center gap-1.5 transition-all bg-[#0b1626]/90 group-hover:bg-[#0b1626]"
          style={{
            color: friend.fishColor,
            borderColor: `${friend.fishColor}88`,
            boxShadow: isSelected
              ? `0 0 10px ${friend.fishColor}44`
              : "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          <Github size={11} />
          <span>{friend.name}</span>
        </div>
      </div>

      {/* Hover Profile Avatar */}
      <div
        className="absolute pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out group-hover:-translate-y-1 hidden md:block"
        style={{
          left: "50%",
          top: "-4.6rem",
          transform: "translateX(-50%)",
        }}
      >
        <div className="relative">
          <Image
            src={friend.avatarUrl}
            alt={`${friend.name} Avatar`}
            width={42}
            height={42}
            className="rounded-full border-2 bg-[#0b1626] object-cover"
            style={{
              borderColor: friend.fishColor,
              boxShadow: `0 2px 10px ${friend.fishColor}55`,
            }}
          />

          <div
            className="absolute -bottom-1 -right-1 rounded-full p-0.5 border flex items-center justify-center bg-[#0b1626]"
            style={{
              borderColor: friend.fishColor,
            }}
          >
            <Github
              size={10}
              color={friend.fishColor}
            />
          </div>
        </div>
      </div>

      {/* Fish */}
      <div className="transition-transform duration-200 group-hover:scale-105 active:scale-95">
        <PixelFish
          color={friend.fishColor}
          accent={friend.fishAccent}
          size={friend.fishSize}
          flipX={friend.flipX}
          isSelected={isSelected}
          isAbyss={friend.zone === "abyss"}
        />
      </div>
    </motion.div>
  );
});

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

const OceanZone = memo(function OceanZone({
  id,
  depth,
  title,
  subtitle,
  bgGradient,
  friends,
  onSelectFriend,
  selectedFriend,
  decorations,
  minHeight = "580px",
}: OceanZoneProps) {
  useEffect(() => {
    if (friends.length > MAX_FRIENDS_PER_ZONE) {
      console.warn(
        `[Ocean Depth] ${title} memiliki ${friends.length} teman. ` +
        `Maksimal ${MAX_FRIENDS_PER_ZONE} teman per zona.`,
      );
    }
  }, [friends.length, title]);

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden"
      style={{
        minHeight,
        background: bgGradient,
      }}
    >
      {decorations}

      {/* Zone Label */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-white/35 tracking-widest uppercase border border-white/15 px-2 py-0.5 rounded">
            {depth}
          </span>

          <span className="text-[9px] font-mono text-white/25 tracking-widest uppercase">
            {title}
          </span>
        </div>

        <p className="text-xs text-white/25 font-mono mt-1 hidden md:block">
          {subtitle}
        </p>
      </div>

      {/* Fish Area */}
      <div
        className="relative w-full mx-auto max-w-6xl"
        style={{ minHeight }}
      >
        {friends.slice(0, MAX_FRIENDS_PER_ZONE).map(
          (friend, index) => (
            <ZoneFish
              key={friend.id}
              friend={friend}
              index={index}
              onSelect={onSelectFriend}
              isSelected={
                selectedFriend?.id === friend.id
              }
            />
          ),
        )}
      </div>

      {/* Mobile Positioning */}
      <style jsx>{`
        @media (max-width: 767px) {
          section#${id} .group {
            left: var(--mobile-x) !important;
            top: var(--mobile-y) !important;
          }
        }
      `}</style>
    </section>
  );
});

// ─── Main Connect Page ────────────────────────────────────────────────────────

export default function ConnectPage() {
  const [selectedFriend, setSelectedFriend] =
    useState<Friend | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = useCallback((friend: Friend) => {
    setSelectedFriend((prev) =>
      prev?.id === friend.id ? null : friend,
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedFriend(null);
  }, []);

  const sunlight = FRIENDS.filter(
    (f) => f.zone === "sunlight",
  );

  const twilight = FRIENDS.filter(
    (f) => f.zone === "twilight",
  );

  const abyss = FRIENDS.filter(
    (f) => f.zone === "abyss",
  );

  const ambientBubbles = [
    { s: 6, l: 12, d: 0, dur: 11 },
    { s: 4, l: 30, d: 2, dur: 9 },
    { s: 8, l: 52, d: 1, dur: 14 },
    { s: 5, l: 74, d: 3, dur: 10 },
    { s: 6, l: 88, d: 0.5, dur: 12 },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040a17]">
      {mounted && <CustomCursor />}

      {mounted && <DepthIndicator />}

      {/* Ambient Bubbles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {ambientBubbles.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/15 bg-white/5"
              style={{
                width: b.s,
                height: b.s,
                left: `${b.l}%`,
                bottom: 0,
              }}
              animate={{
                y: [0, -1100],
                opacity: [0, 0.4, 0.2, 0],
              }}
              transition={{
                duration: b.dur,
                delay: b.d,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        style={{
          background:
            "linear-gradient(180deg, #0284c7 0%, #0369a1 35%, #075985 65%, #071830 100%)",
        }}
      >
        {/* Sun Rays */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "180%",
            height: "75%",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,220,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Back */}
        <div className="absolute top-6 left-6 z-30">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono transition-colors group"
          >
            <div className="p-1.5 border border-white/20 rounded-md group-hover:border-white/50 transition-colors">
              <ArrowLeft size={12} />
            </div>

            Back to Portfolio
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-2xl py-16">
          <motion.p
            className="text-sky-200/80 text-xs font-mono tracking-[0.3em] uppercase mb-4"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            ◈ Ocean Depth ◈
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
            }}
          >
            Friends Beneath
            <br />
            <span className="text-sky-300">
              the Surface
            </span>
          </motion.h1>

          <motion.p
            className="text-sky-100/75 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
          >
            Dive into the depths and discover the
            developers I call friends. Select any
            friend fish to view their profile.
          </motion.p>

          <motion.a
            href="#sunlight-zone"
            className="inline-flex items-center gap-2 px-6 py-3 border border-sky-300/40 text-sky-200 font-mono text-xs sm:text-sm hover:bg-sky-400/15 rounded-lg transition-all"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
            }}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            Dive In

            <motion.span
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={15} />
            </motion.span>
          </motion.a>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            style={{
              width: "100%",
              height: 50,
              display: "block",
            }}
          >
            <path
              d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
              fill="#0c2340"
              opacity="0.6"
            />

            <path
              d="M0,40 C150,20 350,50 600,40 C850,30 1050,50 1200,40 L1200,60 L0,60 Z"
              fill="#071830"
            />
          </svg>
        </div>
      </section>

      {/* ── Sunlight Zone ────────────────────────────────────────────────── */}
      <OceanZone
        id="sunlight-zone"
        depth="0–200m"
        title="Sunlight Zone"
        subtitle="Warm waters, bright companions"
        bgGradient="linear-gradient(180deg, #071830 0%, #092244 50%, #081d3a 100%)"
        friends={sunlight}
        onSelectFriend={handleSelect}
        selectedFriend={selectedFriend}
        minHeight="560px"
        decorations={
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden opacity-60">
            <PixelCoral
              x={40}
              color="#e07a3c"
            />

            <PixelCoral
              x={160}
              color="#d53f8c"
            />

            <PixelCoral
              x={440}
              color="#805ad5"
            />

            <Seaweed
              x={220}
              height={56}
              color="#38a169"
            />

            <Seaweed
              x={580}
              height={64}
              color="#2f855a"
            />
          </div>
        }
      />

      {/* ── Twilight Zone ────────────────────────────────────────────────── */}
      <OceanZone
        id="twilight-zone"
        depth="200–1000m"
        title="Twilight Zone"
        subtitle="Where light barely reaches"
        bgGradient="linear-gradient(180deg, #081d3a 0%, #06152b 50%, #040e1d 100%)"
        friends={twilight}
        onSelectFriend={handleSelect}
        selectedFriend={selectedFriend}
        minHeight="540px"
        decorations={
          <>
            <div className="absolute top-[25%] right-[12%] pointer-events-none opacity-40">
              <PixelJellyfish color="#805ad5" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-50">
              <Seaweed
                x={100}
                height={48}
                color="#2b2d42"
              />

              <Seaweed
                x={380}
                height={56}
                color="#2b2d42"
              />
            </div>
          </>
        }
      />

      {/* ── Abyss Zone ──────────────────────────────────────────────────── */}
      {abyss.length > 0 && (
        <OceanZone
          id="abyss-zone"
          depth="1000m+"
          title="Midnight Zone"
          subtitle="The deepest connections"
          bgGradient="linear-gradient(180deg, #040e1d 0%, #030a17 50%, #020610 100%)"
          friends={abyss}
          onSelectFriend={handleSelect}
          selectedFriend={selectedFriend}
          minHeight="520px"
        />
      )}

      {/* ── Sea Floor ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-6"
        style={{
          background:
            "linear-gradient(180deg, #020610 0%, #000307 100%)",
        }}
      >
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="text-[9px] font-mono text-white/25 tracking-[0.4em] uppercase mb-5">
              ◈ Sea Floor — Depth Unknown ◈
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white/50 mb-3">
              End of the Dive
            </h2>

            <p className="text-white/30 text-xs sm:text-sm leading-relaxed mb-8">
              These are the friends who make the
              journey worthwhile. More might surface
              in the future.
            </p>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors border border-white/15 hover:border-white/30 px-4 py-2 rounded-md"
            >
              ↑ Surface
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Profile Dialogue */}
      <AnimatePresence>
        {selectedFriend && (
          <ProfileDialogue
            friend={selectedFriend}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}