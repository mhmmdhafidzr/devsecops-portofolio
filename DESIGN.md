# Design — Secure Delivery Datasheet

<!-- impeccable:design-system 1 -->

The visual world is a **technical datasheet / component spec-sheet** (Swiss
editorial + brutalist-tech), raised with a **supply-chain provenance** motif.
The portfolio reads like the published spec sheet of an engineered security
product: every claim is a measured, stamped, verifiable line — not a marketing
adjective. Seed `56cf3005`, direction form #4 of 7 (roll-assigned, brief-pinned).

## Palette

Restrained strategy: a disciplined near-black ground, bone text, muted tinted
grays, and exactly **one** signal accent. A second color (verify-green) is
reserved strictly for admitted / VERIFIED / passed states — it is semantic, not
decorative.

| Token | Value | Role |
|-------|-------|------|
| `--color-ink` | `#0a0a0b` | page ground |
| `--color-ink-2` | `#121214` | raised panel / plate |
| `--color-ink-3` | `#1a1a1d` | hairline fill / meter track |
| `--color-bone` | `#e7e7e4` | primary text |
| `--color-bone-dim` | `#a4a49e` | secondary text (tinted off bone, never flat gray) |
| `--color-bone-faint` | `#6d6d67` | micro-labels |
| `--color-rule` | `#2a2a2e` | grid + hairline rules |
| `--color-rule-bright` | `#3a3a40` | stronger borders / inactive controls |
| `--color-signal` | `#ff4d1c` | THE accent — live, active, blocked/denied, emphasis word |
| `--color-verify` | `#41d18e` | reserved: VERIFIED / passed / admitted only |

Dark mode is chosen from the use scene (a security engineer's tooling, logs,
and terminals live dark; the signal accent and the live meter read as "on").

## Type

- **Display:** Archivo Variable (self-hosted, `@fontsource-variable/archivo`),
  weight ~800, width expanded (`font-stretch: 125%`), tracking `-0.035em`,
  line-height `0.92`. Used oversized as composition (hero up to ~11rem). This is
  the tegas Swiss grotesk voice; chosen over the banned Inter/Space-Grotesk
  defaults for genuine wide-grotesk character.
- **Mono:** JetBrains Mono Variable (self-hosted). Used for genuine measurement
  and code: spec codes (L-1, P-00, DSX-01), micro-labels, terminal/log content,
  tabular data. Not costume — it marks data and measurement.
- **Micro-label (`.u-label`):** mono, 0.6875rem, uppercase, tracking `0.22em`,
  faint. The datasheet's small tracked caps.
- Tabular numerals (`.tabular` / `tnum`) everywhere numbers appear.

## Structure & materials

- **Visible 12-column grid** (`.u-grid-lines`) as a faint ruled backdrop — a
  datasheet is ruled.
- **Hairline rules** (1px `--color-rule`) separate every region; section headers
  sit on a rule line carrying an index (01…10), a title, and a spec code.
- **Barcode dividers** (`Barcode`) — deterministic bar runs as section breaks.
- **Flat plates** (`.u-plate`): `--color-ink-2` with a 1px rule border. This
  world is brutalist, so flat borders and hard edges are earned, not costume.
  No soft drop-shadows; depth comes from the rule system and the ground steps.
- **Provenance stamps** (`Stamp`): UNVERIFIED → VERIFIED, the supply-chain motif
  made literal. Verified stamps rotate slightly and take the verify-green.

## Motion

- One authored entrance moment (`Reveal`): opacity + 16px rise + 6px blur,
  700ms exponential ease-out (`cubic-bezier(0.16,1,0.3,1)`), fired once when a
  region enters view. Resilient: an IntersectionObserver plus a mount-time
  viewport fallback guarantees content is never stranded invisible on an anchor
  jump or fast scroll.
- **The one live instrument:** `SignalStrip` — a metered strip with weighted,
  damped integration (true-ballistics feel), the only continuously moving
  element on the page.
- Interactive state changes are bound to events (deploy → chain evaluates →
  block; promote → environment advances; run check → stamp). Not hover sparkle.
- All motion collapses under `prefers-reduced-motion`.

## Browser surfaces (themed, not default)

Selection (signal on ink), custom scrollbar (rule-bright thumb on ink), focus
ring (2px signal, 2px offset), tabular numerals. Defined in `app/globals.css`.

## Components

`components/primitives.tsx` holds the reusable world: `Label`, `Barcode`,
`GridRules`, `Section`, `Stamp`, `Counter`, `SignalStrip`, `Reveal`. Each
section component composes these; content comes from `lib/content.ts`.

## Modes

Primary mode **Persuade** (a recruiter must act), carried by an **Experience**
spine — the architecture itself leads, and the visitor proves the security
claims by operating the demos (Sysbox UID map, supply-chain attack sim, 3-env
promotion, principles↔cloud toggle) rather than reading about them.

## Content integrity constraint

Anonymized by contract: no employer name, no repository names, no repo contents.
Generic industry tool names are allowed (they describe the stack). All logs,
UIDs, and metrics shown are illustrative, never presented as real production data
of any named organization.
