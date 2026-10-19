"use client";

import { useEffect } from "react";

// ============================================================================
// PROGRESSIVE GLITCH CONTROLLER — single elapsed-time authority for the whole
// portfolio. Every glitch-capable component reads phase/armed state from here
// (via the <html> classes it sets), never from its own 30s timer.
//
// Timeline per browser tab (sessionStorage `nafis_exe_session_start`):
//   0-30s        NORMAL       fully clean, no glitch-capable effect fires
//   ~30s         FIRST_ANOMALY one short, subtle incident (< 2s)
//   >45s         UNSTABLE     intermittent disturbances, randomized quiet gaps
//   >90s         CORRUPTED    more frequent + slightly stronger, still bounded
//
// Elapsed time is computed from a stored epoch timestamp, so refresh, route
// change and background throttling are all honored: the 30s window does NOT
// restart and a backlog of missed effects is not replayed.
// ============================================================================

export const GLITCH = {
  normalMs: 30_000, // clean phase length — verified: nothing glitchy before this
  unstableMs: 45_000, // intermittent disturbances begin
  corruptedMs: 90_000, // stronger bound disturbances begin
  firstImpulseMs: 1_400, // first anomaly duration
  minQuietMs: 14_000, // quiet gap floor between impulses (base range)
  maxQuietMs: 38_000, // quiet gap ceiling (base range)
} as const;

export type GlitchPhase = "normal" | "first_anomaly" | "unstable" | "corrupted";

const SESSION_KEY = "nafis_exe_session_start";

function readSessionStart(): number | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null; // storage unavailable — degrade to in-memory session
  }
}

function writeSessionStart(ts: number) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, String(ts));
  } catch {
    /* non-fatal: session still tracked by closure for this tab */
  }
}

function phaseFor(elapsed: number): GlitchPhase {
  if (elapsed < GLITCH.normalMs) return "normal";
  if (elapsed < GLITCH.unstableMs) return "first_anomaly";
  if (elapsed < GLITCH.corruptedMs) return "unstable";
  return "corrupted";
}

/**
 * Applies the authoritative state to <html> so CSS + components can react
 * without extra subscriptions:
 *   glitch-armed            elapsed >= 30s (all glitch-capable effects gate on this)
 *   glitch-phase-unstable   intermittent disturbances enabled
 *   glitch-phase-corrupted  stronger disturbances + corrupted palette (html.corrupt-active)
 * The burst overlay / impulse classes are added transiently by the scheduler.
 */
function applyState(phase: GlitchPhase, armed: boolean) {
  const root = document.documentElement;
  root.classList.toggle("glitch-armed", armed);
  root.classList.toggle("glitch-phase-unstable", phase === "unstable" || phase === "corrupted");
  root.classList.toggle("glitch-phase-corrupted", phase === "corrupted");
  // Corruption Mode palette (existing feature) lights up only in CORRUPTED.
  root.classList.toggle("corrupt-active", phase === "corrupted");
}

/**
 * Fires one short anomaly. `kind` selects a single bounded effect, then cleans
 * up; `onComplete` lets the scheduler decide the next quiet gap.
 */
function fireImpulse(kind: string, onComplete: () => void) {
  const root = document.documentElement;
  root.classList.add(`glitch-impulse-${kind}`);
  const dur =
    kind === "first" ? GLITCH.firstImpulseMs : 420 + Math.random() * 700;
  window.setTimeout(() => {
    root.classList.remove(`glitch-impulse-${kind}`);
    onComplete();
  }, dur);
}

export default function GlitchController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- session start (per tab) ---
    let sessionStart = readSessionStart();
    const inMemoryStart = Date.now();
    if (sessionStart === null) {
      sessionStart = inMemoryStart;
      writeSessionStart(sessionStart);
    }

    let phase: GlitchPhase = "normal";
    let armed = false;
    let impulseTimer = 0;

    const setPhase = (p: GlitchPhase) => {
      if (p !== phase) {
        phase = p;
        applyState(p, armed);
      }
    };

    // ---- state progression from wall-clock elapsed time ----
    const check = () => {
      const elapsed = Date.now() - sessionStart!;
      const next = phaseFor(elapsed);
      applyState(next, elapsed >= GLITCH.normalMs);
      armed = elapsed >= GLITCH.normalMs;
      if (next === "first_anomaly" && phase !== "first_anomaly") {
        // First incident: exactly one short subtle burst, then back to calm.
        fireImpulse("first", () => {});
      }
      setPhase(next);
    };
    check();
    // Poll once per second; cheap, and we never set classes unless state changes.
    const interval = window.setInterval(check, 1000);

    // ---- UNSTABLE / CORRUPTED scheduler: controlled impulses with quiet gaps ----
    let loop = true;
    if (!reduced) {
      const impulses = ["text", "band", "tear", "status", "label"];
      const schedule = (minMs: number, maxMs: number) =>
        minMs + Math.random() * (maxMs - minMs);
      const tick = () => {
        if (!loop) return;
        if ((phase === "unstable" || phase === "corrupted") && armed) {
          // intensity: corrupted allows slightly faster cadence
          const baseGap =
            phase === "corrupted" ? 8_000 : 14_000;
          const kind = impulses[Math.floor(Math.random() * impulses.length)];
          fireImpulse(kind, () => {
            impulseTimer = window.setTimeout(
              tick,
              schedule(baseGap, baseGap + 12_000)
            );
          });
        } else {
          impulseTimer = window.setTimeout(tick, schedule(2_000, 4_000));
        }
      };
      tick();
    }

    return () => {
      loop = false;
      window.clearInterval(interval);
      window.clearTimeout(impulseTimer);
      // leave classes intact (session state lives on)
    };
  }, []);

  return null;
}
