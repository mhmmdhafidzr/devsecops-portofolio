# Muhammad Hafidz — DevSecOps Portfolio

An interactive portfolio that explains, and lets a visitor *try*, a bank-grade,
air-gapped CI/CD + DevSecOps delivery platform: VM-grade build isolation, a
five-layer supply-chain security chain, three-environment promotion with hard
gates, zero-inbound GitOps deployment, and Infrastructure-as-Code onboarding.

Built as a static site — no backend. Every interactive demo runs client-side.

## Stack

- Next.js 15 (App Router), static export (`output: "export"`)
- React 19, TypeScript
- Tailwind CSS v4
- `motion` (Framer Motion) for animation
- Self-hosted fonts: Archivo (display), JetBrains Mono (mono)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static)

```bash
npm run build      # outputs a static site to ./out
```

Deploy the contents of `out/` to any static host (Vercel, Netlify, GitHub Pages,
an S3 bucket, or an internal static server). No server runtime required.

## Edit the content

All copy lives in `lib/content.ts` — owner name/role/contact, the pipeline
stages, the five security layers, the attack scenarios, the environments, the
air-gap and secrets notes, the IaC steps, the bill of materials, and the
principles ↔ cloud mapping. Change text there; the sections render from it.

### Things to review / replace

- **Owner name** (`lib/content.ts` → `owner.name`) is set to `"Muhammad Hafidz"`.
  Replace with the exact full name you want shown in the hero and header.
- All pipeline logs, UID values, and metrics shown are **illustrative** — they
  demonstrate the concept and are not any organization's real production data.

## Design

The visual world is a "Secure Delivery Datasheet" — Swiss editorial / brutalist-
tech: oversized Archivo display type, a strict ruled grid, hairline rules,
barcode/spec-code dividers, a disciplined near-black palette with a single
signal-orange accent, and a reserved verify-green used only for admitted /
VERIFIED states. See `DESIGN.md` for the full system.
