import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Hafidz — DevSecOps Engineer",
  description:
    "An interactive datasheet of a bank-grade, air-gapped CI/CD and DevSecOps delivery platform: VM-grade build isolation, a five-layer supply-chain security chain, three-environment promotion with hard gates, and zero-inbound GitOps deployment.",
  authors: [{ name: "Muhammad Hafidz" }],
  openGraph: {
    title: "Muhammad Hafidz — DevSecOps Engineer",
    description:
      "A secure delivery platform, explained interactively. Build isolation, supply-chain integrity, promotion gates, and air-gapped operation.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const DIRECTION_CONTRACT = `<!--
  DIRECTION CONTRACT — Secure Delivery Datasheet (seed 56cf3005, form #4 of 7, roll-assigned)
  THESIS: The platform read as one engineered component datasheet; every security property is a
    measured, stamped, verifiable spec — not a marketing adjective. Refuses the default engineer
    portfolio (dark theme + timeline + neon cards + skills grid).
  OWN-WORLD: Near-black ground (#0a0a0b), bone text (#e7e7e4), muted tinted gray, ONE signal-orange
    accent (#ff4d1c) + a reserved verify-green (#41d18e) for admitted/VERIFIED states only. Archivo
    expanded grotesk as oversized tegas display; JetBrains Mono for spec codes, data, log lines.
    Strict visible 12-col grid, hairline rule-lines, barcode/spec-code dividers, provenance stamps.
  STORY: A recruiter understands this person designed and runs a coherent, defense-in-depth secure
    delivery platform; believes it because they can TRY the security (UID mapping, attack sim,
    push->deploy flow); and acts by contacting via the rule-line CTA.
  FIRST VIEWPORT: near-black full-bleed; top rule carries name/role/spec-code/contact + primary
    action top-right; a giant expanded headline pinned to the visible 12-col grid; one live metered
    signal strip is the only moving element.
  FORM: Swiss technical datasheet / component spec-sheet + supply-chain provenance seal. #4 of 7.
    seed key 56cf3005. Raised by: provenance ritual (UNVERIFIED->VERIFIED), density tiers +
    certification marks (TDR), true metered signal strip (VU), event-bound state changes (film),
    tactile state feedback (skeuomorph).
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
    verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* DIRECTION CONTRACT emitted as a real HTML comment below so it survives
            the production build (JSX comments do not render to markup). */}
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
          style={{ display: "none" }}
        />
        {children}
      </body>
    </html>
  );
}
