"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// ============================================================================
// GLITCH SYSTEM — art-directed instability layer (NSO-inspired)
// Level 1: chromatic aberration (hover, CSS only)
// Level 2: scanline interference + flicker (CRT overlay)
// Level 3: interface corruption (status text corrupts on interaction)
// Level 4: rare short-lived distortion (page transitions, special states)
// All effects respect prefers-reduced-motion and never block interaction.
// ============================================================================

const CORRUPT_CHARS = "▓▒░█<>/\\|#01ERROR_ERR_0x0F:?%";

const WHISPERS = [
  "DO YOU REMEMBER?",
  "SIGNAL LOST",
  "ERR_0X0F // DATA CORRUPTED",
  "SHE IS STILL ONLINE",
  "who is typing?",
  "connection lost... reconnecting",
  "0x0F: memory leak detected",
  "are you still watching?",
];

/** Text with RGB channel separation on hover / focus. Pure CSS class. */
export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  return (
    <Tag className={`glitch-rgb ${className}`} data-text={typeof children === "string" ? children : undefined}>
      {children}
    </Tag>
  );
}

/** Status line that occasionally corrupts for a beat, then heals. */
export function CorruptStatus({
  label = "STATUS",
  okText = "ONLINE",
  className = "",
}: {
  label?: string;
  okText?: string;
  className?: string;
}) {
  const [corrupted, setCorrupted] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let clear: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const base = okText.split("");
        const out = base
          .map((c) => (Math.random() < 0.35 ? CORRUPT_CHARS[Math.floor(Math.random() * CORRUPT_CHARS.length)] : c))
          .join("");
        setCorrupted(out);
        clear = setTimeout(() => setCorrupted(null), 220 + Math.random() * 300);
        schedule();
      }, 9000 + Math.random() * 15000);
    };
    schedule();
    return () => {
      clearTimeout(timer);
      clearTimeout(clear);
    };
  }, [okText]);

  return (
    <span className={`font-mono ${className}`} aria-live="off">
      <span className="opacity-60">{label}: </span>
      <span className={corrupted ? "text-[#F54DAD] glitch-flicker" : "text-[#63CBA8]"}>
        {corrupted ?? okText}
      </span>
    </span>
  );
}

/**
 * Whisper — microcopy unease. Renders a hidden string that flashes
 * briefly at rare intervals, positioned inside an existing element.
 * Purely decorative; aria-hidden so screen readers never see it.
 */
export function Whisper({
  phrases = WHISPERS,
  className = "",
  minDelayS = 25,
  maxDelayS = 70,
}: {
  phrases?: string[];
  className?: string;
  minDelayS?: number;
  maxDelayS?: number;
}) {
  const [text, setText] = useState<string | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    let show: ReturnType<typeof setTimeout>;
    let hide: ReturnType<typeof setTimeout>;
    let alive = true;
    const schedule = () => {
      if (!alive) return;
      show = setTimeout(() => {
        if (!alive) return;
        setText(phrases[Math.floor(Math.random() * phrases.length)]);
        hide = setTimeout(() => {
          setText(null);
          schedule();
        }, 900 + Math.random() * 700);
      }, Math.random() * (maxDelayS - minDelayS) * 1000 + minDelayS * 1000);
    };
    schedule();
    return () => {
      alive = false;
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [phrases, minDelayS, maxDelayS]);

  if (!text) return null;
  return (
    <span aria-hidden="true" className={`glitch-whisper font-mono ${className}`}>
      {text}
    </span>
  );
}

/**
 * CrtOverlay — fixed full-viewport layer: scanlines + film grain + occasional
 * horizontal tear (a single 120ms band sweep every ~20-40s). pointer-events-none,
 * opacity kept low so text stays readable. Disabled under reduced motion
 * (static scanlines remain, flicker/tear removed).
 */
export function CrtOverlay() {
  const [tearing, setTearing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let reset: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setTearing(true);
        reset = setTimeout(() => setTearing(false), 120);
        schedule();
      }, 18000 + Math.random() * 22000);
    };
    schedule();
    return () => {
      clearTimeout(timer);
      clearTimeout(reset);
    };
  }, []);

  return (
    <div aria-hidden="true" className="crt-overlay pointer-events-none fixed inset-0 z-[9990]">
      {tearing && <div className="crt-tear" />}
    </div>
  );
}

/** BootGlitch — one-shot 350ms distortion on first mount of a page shell. */
export function BootGlitch({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("boot-glitch");
    const t = setTimeout(() => el.classList.remove("boot-glitch"), 380);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
