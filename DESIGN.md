# DESIGN.md — NAFIS.EXE Design System & Guidelines

This document is the single source of truth for the **NAFIS.EXE** portfolio redesign: a personal developer portfolio inspired by NEEDY STREAMER OVERLOAD, retro internet culture, kawaii cyber aesthetics, and interactive desktop interfaces.

---

## 1. Visual Identity & Art Direction

### Core Identity: NAFIS.EXE
- **Concept**: A playful, expressive, yet technically rigorous digital corner of the internet. An interactive desktop operating system ("NAFIS.EXE OS v2.6") belonging to Muhammad Dzurunnafis Khairuddin (Nafis / Tokita).
- **Aesthetic Tone**:
  - **Kawaii Cyber**: Soft pastel pinks paired with high-voltage accent magenta, digital cyan highlights, and clean white application canvases.
  - **Retro Internet & Desktop Culture**: Window title bars with miniature control buttons (`_`, `□`, `×`), status pills (`ID: NAFIS.EXE`, `MEM_OK`, `PING: 24ms`), application panels, pixel decoration icons, and retro desktop taskbars.
  - **Internet Idol & Digital Shrine Vibes**: Heart badges (`♡`, `★`), status stickers, playful greeting banners, audio player integration, and expressive micro-interactions.
  - **Deliberate Restraint**: Not a messy parody or an unreadable novelty site. Tunnels of text use high-contrast deep plum on crisp white surfaces for pristine readability. Never use unreadable pixel fonts for paragraphs.

---

## 2. Color Palette & Design Tokens

Pink is a deliberate, defining core of the visual brand. The palette balances playful kawaii energy with WCAG AA/AAA compliant text contrast:

| Token CSS | Hex Value | Semantic Role | Contrast Against Surface |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#FFF4FA` | Main canvas backdrop (very soft warm pink) | Base backdrop |
| `--color-surface` | `#FFFFFF` | Main window cards, dialogs, application content | 1.05:1 vs bg |
| `--color-surface-pink` | `#FFE3F1` | Tinted window headers, subtle callout cards, active tabs | 1.15:1 vs bg |
| `--color-surface-soft` | `#FFF8FC` | Elevated card surfaces, hovered panels | 1.02:1 vs bg |
| `--color-primary-pink` | `#FF75B9` | Primary brand pink: primary buttons, badges, window borders | 3.2:1 vs white |
| `--color-accent-pink` | `#F54DAD` | High-energy accent pink: active borders, glows, primary icons | 3.8:1 vs white |
| `--color-deep-text` | `#302432` | Primary body and heading text (deep plum/violet black) | **14.2:1 vs white (AAA)** |
| `--color-secondary-text`| `#806D7D` | Secondary labels, descriptions, metadata | **4.9:1 vs white (AA)** |
| `--color-border` | `#F0C8DF` | Window borders, dividers, subtle outlines | UI boundary |
| `--color-cyber-cyan` | `#79E7E5` | Supporting cyber accent: terminal tags, sparkles, status dots | Contrast accent |
| `--color-pixel-purple` | `#A993FF` | Supporting retro accent: code badges, tag highlights | Contrast accent |
| `--color-success` | `#63CBA8` | System online indicators, completed project badges | Contrast accent |

### Token Rules:
- Primary button text over `#FF75B9` or `#F54DAD` must use `#FFFFFF` or `#302432` with minimum 4.5:1 ratio.
- Dark theme inversion is NOT applied: NAFIS.EXE is proudly, intentionally a light kawaii cyber desktop.
- No heavy dark-cyberpunk backdrops. Dark mode elements are reserved for small faux-terminal windows only.

---

## 3. Typography Hierarchy

Maximum 3 font families used strictly according to purpose:

1. **Display Font**: `Sora` (`sans-serif`, weights 600, 700, 800)
   - Used for main hero headline, section titles, window header labels.
   - Clean, rounded geometric curves that complement retro kawaii aesthetics without sacrificing polish.
2. **Body Font**: `Inter` (`sans-serif`, weights 400, 500, 600)
   - Used for all narrative text, project descriptions, blog articles, and timelines.
   - Set in `--color-deep-text` (`#302432`) with line-height 1.6 - 1.75 for maximum reading comfort.
3. **Pixel Accent Font**: `JetBrains Mono` / `Press Start 2P` (`monospace`, weight 400)
   - Used **only** for small technical labels (`SYS://ONLINE`), window titles, badge pills, and decorative status readouts.
   - **Strict Rule**: NEVER used for multi-line paragraphs or general UI copy.

---

## 4. Window-Based UI & Desktop Architecture

### Window Anatomy (`.kawaii-window`)
- **Title Bar (`.window-titlebar`)**:
  - Background: Tinted pink `#FFE3F1` or crisp white `#FFFFFF` with bottom border `#F0C8DF`.
  - Left: Decorative pixel or heart icon (`★`, `♥`, `💾`) + Window Title in monospace/bold (`APP://HERO_PROFILE`).
  - Right: Three window controls styled after retro 90s/00s OS:
    - Minimize `_` (pink hover)
    - Maximize `□` (purple hover)
    - Close `×` (hot pink `#F54DAD` hover)
- **Window Body (`.window-body`)**:
  - Background: Pure White `#FFFFFF` with subtle drop shadow `0 8px 24px rgba(245, 77, 173, 0.12), 4px 4px 0px #F0C8DF`.
  - Crisp border: `2px solid #F0C8DF` or `1.5px solid #FF75B9`.
- **Status Bar (`.window-statusbar`)**:
  - Bottom row with item count, status (`STATUS: READY ♡`), and memory usage.

### Desktop Navigation / Taskbar
- A floating top or bottom glassmorphism taskbar with:
  - "START" or "NAFIS.EXE" launcher badge with pulsing green/cyan indicator.
  - Active application shortcuts (`Home`, `About`, `Projects`, `Skills`, `Certificates`, `Stories`, `Contact`).
  - System tray with live clock, BGM lo-fi player toggle, and audio status.

---

## 5. Navigation & Page Architecture

- `/` (Home): Comprehensive interactive desktop featuring:
  - Desktop taskbar & header.
  - Hero Window: "Hi, I'm Nafis!" with interactive avatar, role badges, and primary action CTAs.
  - Marquee: Kawaii cyber status reel.
  - About Window: Bio, INFJ personality badge, core pillars, and creative values.
  - Education & Journey Timeline: Horizontal/vertical timeline framed as system logs.
  - Skills & Toolbox: Application cards categorized with proficiency gauges.
  - Featured Projects: Interactive 3D carousel or desktop folder explorer with live demo links.
  - Contact Section: Direct communication terminal, verified socials, and copy-email tool.
  - Desktop Taskbar / Footer: Retro system status, copyright, and quick links.
- `/about`: Dedicated biographical dossier and deep-dive story.
- `/project`: Standalone project explorer catalog with category filtering.
- `/serti`: Interactive certificate database with high-resolution lightbox modal.
- `/blog` & `/blog/[id]`: Personal fiction & log entries with reader settings and progress indicator.

---

## 6. Animation & Interaction Rules

- **Restrained Motion**: Subtle, smooth, and intentional. No dizzying camera shakes or constant screen-wide glitches.
- **Controlled Glitch**: Glitch effects are strictly triggered on rare micro-events (e.g. initial hero load or hovering the title badge) for no more than 300ms.
- **Tactile Feedback**:
  - Hover on windows: subtle elevation shift (`translate-y(-2px)` and deeper pink shadow).
  - Hover on buttons: active scale (`1.02`), soft glow `rgba(245, 77, 173, 0.3)`.
- **Reduced Motion Support**:
  - When `prefers-reduced-motion` is active, all 3D tilts, auto-scroll marquees, and scale transitions resolve to instantaneous clean opacity or static states.
- **Keyboard Navigation**:
  - Focus rings styled in high-visibility Cyber Cyan (`#79E7E5`) or Accent Pink (`#F54DAD`) with 2px offset.

---

## 7. Accessibility & Mobile Responsiveness

- **Contrast**: All body text achieves > 7:1 against light surfaces (AAA standard).
- **Mobile Reflow**:
  - Windows automatically reflow into stacked cards without horizontal overflow.
  - Window controls on mobile remain accessible and non-overlapping.
  - Touch targets maintain at least 44x44px.
- **Audio Autoplay**: Audio player NEVER autoplays without explicit user consent.

---

## 8. Definition of Done

1. `DESIGN.md` replaced and fully aligned with NAFIS.EXE.
2. Global styles in `globals.css` updated with new kawaii cyber pink palette and tokens.
3. `layout.tsx` updated with crisp theme metadata and font definitions.
4. Shared components (`Navbar`, `Footer`, `Cursor`, `fx.tsx`) restyled into retro desktop taskbars and window components.
5. All routes (`/`, `/about`, `/project`, `/serti`, `/blog`, `/blog/[id]`, `/contact`) restyled consistently.
6. TypeScript and Next.js production build (`pnpm run build`) pass cleanly with exit code 0.
7. Real verified project and certificate data preserved without fabrication.
