"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, ChevronDown, MapPin } from "lucide-react";
import CustomCursor from "@/components/layout/cursor";
import Footer from "@/components/layout/footer";

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

// ─── Data (asli — isi manual di sini bila ada teman baru) ─────────────────────

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
  },
];

// Dialog TOKITA per karakter — hanya memakai fakta dari data asli
// (nama, bio, lokasi, zona). Tanpa fakta pribadi karangan.
const DIALOGUE: Record<string, string[]> = {
  barabr0: [
    "Eh, lo ketemu Bara.",
    "Dia suka ngulik Godot, Laravel, dan Blender tiap hari.",
    "Dari Bandung — teman ngoding yang solid.",
  ],
  davingm: [
    "Ini Kinn, rame banget sama Nuxt sama Vue.",
    "Base-nya jauh, di Shenzhen.",
    "Sering nimbrung di proyek bareng.",
  ],
  destkaa: [
    "KakaViangi, salah satu teman terkuat.",
    "Katanya, orang terkuat adalah dia yang paling mampu berdiri sendiri.",
    "Sama-sama dari Bandung.",
  ],
  nairha: [
    "Ini azunya.",
    "Asalnya dari Yogyakarta.",
    "Sering main di dunia Nuxt bareng.",
  ],
  radiedtya: [
    "Radiedtya. Just a Rocky, kata dia.",
    "Orangnya solid, dari Bandung.",
  ],
  sidiktsq: [
    "Siddiq, github brother in arms.",
    "Katanya sekarang dari Kyoto.",
    "Partner ngoprek repo.",
  ],
};

// ─── Character Select Grid ────────────────────────────────────────────────────

const CharacterCard = ({
  friend,
  onSelect,
}: {
  friend: Friend;
  onSelect: (f: Friend) => void;
}) => (
  <motion.button
    type="button"
    onClick={() => onSelect(friend)}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.97 }}
    className="group relative flex flex-col items-start text-left gap-3 p-4 bg-[#0b1626] border-2 rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    style={{ borderColor: `${friend.fishColor}55` }}
    aria-label={`Buka adegan ${friend.name}`}
  >
    <div
      className="relative w-16 h-16 rounded-full overflow-hidden border-2 bg-[#07111f] shrink-0"
      style={{ borderColor: friend.fishColor }}
    >
      <Image src={friend.avatarUrl} alt={friend.name} fill sizes="64px" className="object-cover" />
    </div>

    <div className="min-w-0 w-full">
      <p className="font-sora font-bold text-white text-sm truncate">{friend.name}</p>
      <p className="text-[11px] font-mono truncate" style={{ color: friend.fishColor }}>
        @{friend.username}
      </p>
      {friend.bio && (
        <p className="text-[11px] text-white/60 font-inter leading-snug mt-1 line-clamp-2">
          {friend.bio}
        </p>
      )}
      {friend.location && (
        <p className="text-[10px] font-mono text-white/40 flex items-center gap-1 mt-1 truncate">
          <MapPin size={9} /> {friend.location}
        </p>
      )}
    </div>

    <span
      className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border self-start"
      style={{ color: friend.fishColor, borderColor: `${friend.fishColor}55` }}
    >
      {friend.zone}
    </span>
  </motion.button>
);

// ─── Visual Novel Scene ───────────────────────────────────────────────────────

const VNScene = ({ friend, onBack }: { friend: Friend; onBack: () => void }) => {
  const lines = DIALOGUE[friend.id] ?? [
    `${friend.name}, salah satu teman dari GitHub.`,
    "Cek profil GitHub-nya lewat tombol di bawah.",
  ];
  const fullText = lines.join(" ");
  const [shown, setShown] = useState(0); // chars typed
  const prefersReducedMotion = useReducedMotion();
  const doneRef = useRef(false);

  const done = shown >= fullText.length;

  // typewriter (skippable: klik kotak dialog)
  useEffect(() => {
    if (prefersReducedMotion) { setShown(fullText.length); return; }
    if (shown >= fullText.length) return;
    const t = window.setInterval(() => {
      setShown((s) => Math.min(fullText.length, s + 1));
    }, 18);
    return () => window.clearInterval(t);
  }, [friend.id, fullText, shown]);

  const skip = () => setShown(fullText.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="vn-scene relative rounded-2xl border overflow-hidden"
      style={{ borderColor: `${friend.fishColor}66`, background: "linear-gradient(180deg, #071830 0%, #040e1d 100%)" }}
    >
      {/* Scene backdrop with avatar */}
      <div className="relative flex flex-col items-center pt-10 pb-4 px-6">
        <div
          className="relative w-28 h-28 rounded-full overflow-hidden border-4 bg-[#0b1626]"
          style={{ borderColor: friend.fishColor, boxShadow: `0 0 24px ${friend.fishColor}44` }}
        >
          <Image src={friend.avatarUrl} alt={friend.name} fill sizes="96px" className="object-cover" />
        </div>

        <p className="mt-3 font-sora font-bold text-white text-lg">{friend.name}</p>
        <p className="text-[11px] font-mono text-white/50 flex items-center gap-1">
          <Github size={11} /> @{friend.username}
          {friend.location && <span className="flex items-center gap-0.5"><MapPin size={10} /> {friend.location}</span>}
        </p>
        {friend.bio && <p className="text-xs text-white/70 mt-1 max-w-sm text-center">{friend.bio}</p>}
      </div>

      {/* Dialogue box */}
      <div
        className="mx-4 mb-4 p-4 bg-[#0b1626]/90 border rounded-xl cursor-pointer"
        style={{ borderColor: `${friend.fishColor}44` }}
        onClick={skip}
        role="presentation"
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#FF75B9] text-white"
          >
            TOKITA
          </span>
          <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
            Zone: {friend.zone}
          </span>
        </div>
        <p className="text-sm text-white/85 leading-relaxed min-h-[3.5rem] font-inter">
          {done ? fullText : fullText.slice(0, shown)}
          {!done && <span className="vn-caret" aria-hidden="true">▌</span>}
        </p>
        {!done && <p className="text-[9px] font-mono text-white/30 mt-1 text-right">klik untuk skip ▸</p>}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 px-4 pb-4">
        <a
          href={friend.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold font-mono rounded-xl transition-all"
          style={{ background: `${friend.fishColor}22`, border: `1px solid ${friend.fishColor}66`, color: friend.fishColor }}
        >
          <Github size={13} /> Visit GitHub Profile <ExternalLink size={11} />
        </a>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-bold font-mono rounded-xl transition-all"
        >
          ← Back to Character Selection
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Connect Page ────────────────────────────────────────────────────────

export default function ConnectPage() {
  const [selected, setSelected] = useState<Friend | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = useCallback((friend: Friend) => {
    setSelected(friend);
  }, []);

  const handleBack = useCallback(() => {
    setSelected(null);
    // keep scroll position: grid lives in the same spot; nudge back into view
    requestAnimationFrame(() => {
      document.getElementById("character-select")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040a17]">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ background: "linear-gradient(180deg, #0284c7 0%, #0369a1 35%, #075985 65%, #071830 100%)" }}
      >
        <div className="absolute top-6 left-6 z-30">
          <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono transition-colors group">
            <span className="p-1.5 border border-white/20 rounded-md group-hover:border-white/50 transition-colors">
              <ArrowLeft size={12} />
            </span>
            Back to Portfolio
          </a>
        </div>

        <div className="relative z-20 text-center px-4 max-w-2xl py-16">
          <motion.p className="text-sky-200/80 text-xs font-mono tracking-[0.3em] uppercase mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            ◈ Character Select ◈
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4 tracking-tight"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Connect
          </motion.h1>
          <motion.p
            className="text-sky-100/75 text-sm md:text-base leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Pilih satu karakter untuk membuka adegan singkat — lalu lanjut ke profil GitHub aslinya.
          </motion.p>
        </div>
      </section>

      {/* ── Character Select / VN Scene ───────────────────────────────────── */}
      <section
        id="character-select"
        className="relative py-14 px-4 md:px-8"
        style={{ background: "linear-gradient(180deg, #071830 0%, #040e1d 50%, #020610 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={`vn-${selected.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              >
                <VNScene friend={selected} onBack={handleBack} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <p className="text-[9px] font-mono text-white/35 tracking-[0.4em] uppercase mb-2">CHARACTER SELECT</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white/80 mb-6 font-sora">
                  Pilih Karakter <span className="text-sky-300">({FRIENDS.length})</span>
                </h2>

                <div ref={gridRef} role="list" className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {FRIENDS.map((friend) => (
                    <div key={friend.id} role="listitem">
                      <CharacterCard friend={friend} onSelect={handleSelect} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      {/* Back to top */}
      <div className="relative bg-[#000307] py-10 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })}
          className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors border border-white/15 hover:border-white/30 px-4 py-2 rounded-md"
        >
          ↑ Surface
        </button>
      </div>
    </div>
  );
}
