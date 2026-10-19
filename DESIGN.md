# DESIGN.md — NAFIS.EXE Design System v3 — NSO × Disturbing Glitch

Single source of truth for the **NAFIS.EXE** portfolio: a pink-dominant retro Japanese computer desktop inspired by NEEDY STREAMER OVERLOAD, with an art-directed "disturbing glitch" layer beneath a cute, functional surface.

## 1. Visual Identity & Art Direction

- **Concept**: NAFIS.EXE OS — a personal desktop OS belonging to Nafis (Tokita). Kawaii cyber desktop surface; beneath it, an unsettling digital instability (glitch layer).
- **Tone**: cute and functional on the surface, subtly wrong underneath.
- **Never**: generic cyberpunk, generic kawaii landing, SaaS dashboard, or copy of the game's assets/screens.

### Aesthetic pillars
1. Pink dominant: `#FF75B9` primary, `#F54DAD` accent, `#FFE3F1` tinted surfaces, `#FFF4FA` canvas.
2. Deep plum text on white/pink surfaces for AAA readability.
3. Dense retro Japanese computer interface: compact mono labels (`SYS://NAV`, `ERR_0X0F`), status pills, pixel-ish details, precise 2px borders, hard offset shadows (3px 3px 0px).
4. Sharp/minimally rounded panels (`border-radius: 4px`, `.kawaii-sharp`) — round only where the kawaii cue matters (pills, dots, player).
5. CRT texture: scanlines + grain overlay (`.crt-overlay`), occasional tear sweep (`.crt-tear`).
6. Original microcopy: `SYS://`, `DIR`, `LOG`, `ERR_0X0F`, "DO YOU REMEMBER?" — original strings, no game text.

## 2. Color Tokens (globals.css `:root`)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#FFF4FA` | Canvas (soft pink paper) |
| `--color-surface` | `#FFFFFF` | Window bodies |
| `--color-surface-pink` | `#FFE3F1` | Title bars, callouts, active tabs |
| `--color-primary-pink` | `#FF75B9` | Primary brand pink: buttons, borders, badges |
| `--color-accent-pink` | `#F54DAD` | High-energy accent: active states, glitch magenta channel |
| `--color-deep-text` | `#302432` | All body/heading text (14.2:1 on white) |
| `--color-secondary-text` | `#806D7D` | Secondary labels, metadata |
| `--color-border` | `#F0C8DF` | Window borders, dividers |
| `--color-cyber-cyan` | `#79E7E5` | Cyan glitch channel, status dots |
| `--color-pixel-purple` | `#A993FF` | Purple glitch channel, tags |
| `#63CBA8` | — | Success/online indicators |

Rules:
- Body text always `#302432` on `#FFFFFF`/`#FFF4FA` — never low-contrast.
- Pink text only on ≥ 14px bold mono labels or large headings.
- Dark backdrops only inside faux-terminal windows (e.g. blog reader dark mode).
- No full-dark theme. Pink stays dominant.

### Corrupted palette (applied when `html.corrupt-active` ← CORRUPTED phase)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#2A0F1C` | Canvas (dark maroon paper) |
| `--color-surface` | `#3B1A29` | Window bodies |
| `--color-surface-pink` | `#4A2035` | Title bars, callouts |
| `--color-primary-pink` | `#B0395B` | Buttons, borders, accents |
| `--color-accent-pink` | `#C81E4A` | Crimson accent, glitch magenta |
| `--color-deep-text` | `#F5DCE7` | Reading text (pale blush, AAA on paper) |
| `--color-secondary-text` | `#D9A8BE` | Secondary labels |
| `--color-border` | `#5C2C40` | Borders, dividers |
| `--color-cyber-cyan` | `#55606B` | Muted cyan (desaturated) |
| `--color-pixel-purple` | `#7A6B8F` | Muted purple |
| `--color-success` | `#4E9A7D` | Online indicators |

Contrast retained: `#F5DCE7` on `#2A0F1C` ≈ 12:1, `#D9A8BE` on `#2A0F1C` ≈ 7.5:1. Hard-coded hex card surfaces are dimmed via a CSS filter pass (`.corrupt-active :where(...)`) so panels stay readable without per-component edits.

## 3. Typography (3 families, strict roles)

| Family | Role | Usage |
|---|---|---|
| `Sora` 400/600/700/800 | Display: headings, window titles, brand | H1–H4, buttons |
| `Inter` (`--font-inter`) | Body: paragraphs, descriptions, articles | 1.6–1.75 line-height |
| `JetBrains Mono` | System text: labels, tags, status, logs, whispers | NEVER paragraphs |

## 4. Layout, Responsive, Navigation

- Left fixed taskbar ≥md (`Components/Navbar.tsx`): window-grip titlebar, start button, nav stack with tags (USR/DIR/SYS/CRT/LOG/MSG), CorruptStatus tray + clock.
- Mobile: bottom floating taskbar + start-menu drawer (window with titlebar + controls).
- Body padding compensates taskbar (`pl-20 lg:pl-48`), mobile bottom pad `pb-20`.
- Pages: `/` (Hero + Footer + whisper), `/about`, `/project` (skills+projects), `/skills`, `/education`, `/serti`, `/blog`, `/blog/[id]`, `/contact`.
- Mobile = intentionally designed stack; no draggable windows, no horizontal overflow.

## 5. Shared Components

- `Components/glitch.tsx` — GlitchText (chromatic aberration), CorruptStatus, Whisper, CrtOverlay, BootGlitch.
- `Components/fx.tsx` — Magnetic, ScrollProgress, Marquee, TiltCard.
- Window primitives: `.kawaii-window`, `.window-header`, `.kawaii-sharp` (sharp retro variant).
- `Components/Navbar.tsx`, `footer.tsx`, `cursor.tsx`, `Hero.tsx` (audio player integrated).
- Pages wrap content: `<ScrollProgress/> <Navbar/> <section/> <Footer/>` (+ `<Whisper/>` on `/`).

## 6. Animation & Interaction Rules

Progressive instability is driven by ONE controller: `components/glitch-controller.tsx` mounted in `app/layout.tsx`. No component owns its own glitch timer; every effect reads state classes set on `<html>` by the controller.

### Timeline (config in `GLITCH` constant, single source)

| Phase | Elapsed | Behaviour |
|---|---|---|
| `NORMAL` | 0–30s | Fully clean. No glitch, flicker, RGB split, scanline interference, corrupted text or message. Pink identity, crisp type. |
| `FIRST_ANOMALY` | ~30s | One short subtle incident (RGB split on a heading + tiny offset), then calm. |
| `UNSTABLE` | >45s | Intermittent disturbances with quiet gaps (chromatic aberration, bands, tear, status label flicker, whispers). |
| `CORRUPTED` | >90s | More frequent but still bounded events; corrupted palette token set lights up (`html.corrupt-active`). |

### Per-tab session persistence
- Session epoch stored in `sessionStorage` (`nafis_exe_session_start`).
- Route change / refresh keeps elapsed time; a new tab = new session = clean again.
- Timestamps, not interval counting, so backgrounded/throttled tabs restore correct phase without replaying missed effects.

### Effect rules
- Impulse classes (`glitch-impulse-*`) are added transiently by the controller and removed after their duration; recovery always returns to a valid state.
- Gate: `html:not(.glitch-armed)` hard-disables all glitch CSS — the 30s clean window is enforced structurally.
- `prefers-reduced-motion`: theme still progresses, glitch motion disabled, statics only.
- Hover on windows/buttons: translate + pink shadow; active scale .95. No endless loops, no full-screen strobe.

### Reduced motion
All glitch animations disabled; scanlines become static lighter lines; CorruptStatus/Whisper/CRT tear never fire. Global `prefers-reduced-motion` kill-switch in globals.css.

## 7. Accessibility

- Body text AAA on white; secondary text ≥ 4.5:1.
- Focus ring: 2px `#F54DAD`, offset 2px, always visible.
- Glitch/whisper decor `aria-hidden`; status corruption `aria-live="off"` so screen readers don't hear garbage.
- Touch targets ≥ 44px; no hover-only information.
- Audio never autoplays.

## 8. Technical Constraints

- Next.js 16 App Router, React 19, Tailwind v4 (@theme inline), no new animation libs (gsap + framer-motion already present, use sparingly).
- No DB writes. No secrets in client code. Data stays in `public/data/*.json`.
- Fonts via next/font (Inter) + Google Fonts link (Sora, JetBrains Mono) — max 3 families.
- Build must pass: `npm run build` (tsc strict) — exit 0.

## 9. Anti-patterns

- Pixel font for paragraphs; constant random screen shake; seizure-inducing strobe; hover-only information; every element rounded-2xl generic kawaii; generic cyberpunk dark theme; gradient soup; fake stats/visitor counts; copying the game's screens/characters/logos.
- Do not turn every section into a floating draggable window; mobile collapses windows to stacked cards.

## 10. Definition of Done

1. DESIGN.md (this file) matches implementation.
2. Glitch layer live: chromatic aberration on hero name, CRT overlay global, corrupting status in taskbar, whisper unease on home.
3. All routes build clean (tsc + next build, exit 0), lint 0 errors.
4. Existing content/links/data preserved; no fabricated data.
5. Mobile: taskbar bottom bar, windows stack, no overflow.
6. Reduced-motion: glitch layer fully disabled gracefully.
7. No new runtime dependencies.
