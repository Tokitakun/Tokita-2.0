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

/**
 * Gate helper shared by effect components: true once the controller crosses
 * the 30s threshold (glitch-armed class on <html>). Tiny MutationObserver.
 */
function useGlitchArmed(): boolean {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setArmed(el.classList.contains("glitch-armed"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return armed;
}

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

/** Status line that occasionally corrupts for a beat, then heals.
 *  30s gate: while glitch-armed is absent (first 30s) it stays clean. */
export function CorruptStatus({
  label = "STATUS",
  okText = "ONLINE",
  className = "",
}: {
  label?: string;
  okText?: string;
  className?: string;
}) {
  const armed = useGlitchArmed();
  const [corrupted, setCorrupted] = useState<string | null>(null);

  useEffect(() => {
    if (!armed) return; // strict 30s gate
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
  }, [armed, okText]);

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
  const armed = useGlitchArmed();
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!armed) return; // strict 30s gate
    if (reduced.current) return;
    const root = document.documentElement;
    const isUnstable = () => root.classList.contains("glitch-phase-unstable");
    if (!isUnstable()) return; // whisper starts only at UNSTABLE (45s+)
    let show: ReturnType<typeof setTimeout>;
    let hide: ReturnType<typeof setTimeout>;
    let alive = true;
    const schedule = () => {
      if (!alive || !isUnstable()) return;
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
  }, [armed, phrases, minDelayS, maxDelayS]);

  if (!text) return null;
  return (
    <span aria-hidden="true" className={`glitch-whisper font-mono ${className}`}>
      {text}
    </span>
  );
}

/**
 * CrtOverlay — static scanline/grain layer. Part of the NORMAL pink aesthetic
 * (not a glitch), so it stays visible from the start. Tear sweeps are driven
 * by the controller's impulse classes (glitch-impulse-tear), never by a
 * component-owned timer — this keeps the 30s gate absolute.
 */
export function CrtOverlay() {
  return (
    <div aria-hidden="true" className="crt-overlay pointer-events-none fixed inset-0 z-[9990]">
      <div aria-hidden="true" className="crt-tear-layer" />
    </div>
  );
}

/** BootGlitch — inert pass-through. The 30s gate forbids any glitch on first
 *  mount, so the old boot distortion is no longer scheduled. */
export function BootGlitch({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
