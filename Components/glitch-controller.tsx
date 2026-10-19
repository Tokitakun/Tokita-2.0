"use client";

import { useEffect } from "react";

// ============================================================================
// PROGRESSIVE GLITCH CONTROLLER — single elapsed-time authority for the whole
// portfolio. Every glitch-capable component reads phase/armed state from here
// (via the <html> classes it sets), never from its own timer.
//
// Timeline per browser tab (sessionStorage `nafis_exe_session_start`):
//   0-15s        NORMAL       fully clean, identical to the normal design
//   15s          FIRST_ANOMALY one short glitch burst (1-2s), then calm
//   >40s         UNSTABLE     intermittent disturbances, randomized quiet gaps
//   >80s         CORRUPTED    more frequent + varied, still bounded
//
// Corruption NEVER changes the page theme. Normal pink palette stays; red
// accents appear only on affected elements during impulses.
//
// Elapsed time is computed from a stored epoch timestamp, so refresh, route
// change and background throttling are all honored: the 15s window does NOT
// restart and a backlog of missed effects is not replayed.
// ============================================================================

export const GLITCH = {
  normalMs: 15_000, // clean phase: 0-15s, identical to current normal design
  unstableMs: 28_000, // intermittent disturbances begin right after first anomaly
  corruptedMs: 55_000, // stronger bound disturbances + dark NSO veil begin
  firstImpulseMs: 1_500, // first anomaly duration (1.5s) at second 15
  minQuietMs: 5_000, // quiet gap floor between impulses
  maxQuietMs: 12_000, // quiet gap ceiling (low = visible, still gapped)
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
 *   glitch-armed            elapsed >= 15s (all glitch-capable effects gate on this)
 *   glitch-phase-unstable   intermittent disturbances enabled
 *   glitch-phase-corrupted  more frequent, stronger disturbances
 * IMPORTANT: corruption NEVER changes the global palette. The normal pink
 * design stays intact; crimson/maroon accents appear only inside glitch
 * effects and status indicators (see CSS), never on the page theme.
 */
function applyState(phase: GlitchPhase, armed: boolean) {
  const root = document.documentElement;
  root.classList.toggle("glitch-armed", armed);
  root.classList.toggle("glitch-phase-unstable", phase === "unstable" || phase === "corrupted");
  root.classList.toggle("glitch-phase-corrupted", phase === "corrupted");
}

/**
 * Fires one short anomaly. `kind` selects a single bounded effect, then cleans
 * up; `onComplete` lets the scheduler decide the next quiet gap.
 */
function fireImpulse(kind: string, onComplete: () => void) {
  const root = document.documentElement;
  root.classList.add(`glitch-impulse-${kind}`);
  const dur =
    kind === "first"
      ? GLITCH.firstImpulseMs
      : kind === "stripe" || kind === "band" || kind === "tear"
        ? 700 + Math.random() * 500 // 0.7-1.2s, clearly visible
        : 420 + Math.random() * 700;
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
    // Impulses fire from 15s onward (all armed phases), never just before.
    let loop = true;
    if (!reduced) {
      const impulses = ["text", "band", "tear", "status", "label", "stripe"];
      const pick = () => {
        // corrupted favours the stronger ones
        const pool = phase === "corrupted"
          ? ["text", "band", "tear", "tear", "stripe", "stripe", "label"]
          : impulses;
        return pool[Math.floor(Math.random() * pool.length)];
      };
      const gapFor = (p: GlitchPhase) => {
        if (p === "corrupted") return 2_500 + Math.random() * 2_500; // 2.5-5s
        if (p === "unstable") return 4_000 + Math.random() * 4_000; // 4-8s
        return 6_000 + Math.random() * 5_000; // first_anomaly 6-11s
      };
      const tick = () => {
        if (!loop) return;
        if (armed && phase !== "normal") {
          fireImpulse(pick(), () => {
            impulseTimer = window.setTimeout(tick, gapFor(phase));
          });
        } else {
          impulseTimer = window.setTimeout(tick, 1_000);
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
