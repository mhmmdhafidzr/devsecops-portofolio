"use client";

import { useEffect, useState } from "react";
import { owner } from "@/lib/content";
import { Label } from "./primitives";

const nav = [
  { href: "#architecture", label: "ARCH" },
  { href: "#security", label: "SECURITY" },
  { href: "#isolation", label: "ISOLATION" },
  { href: "#attack", label: "ATTACK SIM" },
  { href: "#promotion", label: "PROMOTION" },
  { href: "#airgap", label: "AIR-GAP" },
  { href: "#principles", label: "ADAPT" },
];

export function RuleBar() {
  const [clock, setClock] = useState<string>("--:--:--");

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setClock(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 u-hairline-bottom bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-2.5 md:px-10">
        <a href="#top" className="flex items-baseline gap-3">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0"
            style={{ background: "var(--color-signal)" }}
            aria-hidden
          />
          <span className="u-mono text-xs font-bold tracking-tight text-bone">
            {owner.name.toUpperCase()}
          </span>
          <Label className="hidden md:inline">{owner.specCode}</Label>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="u-label transition-colors hover:text-bone"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Label className="hidden tabular sm:inline">{clock}</Label>
          <a
            href="#contact"
            className="u-mono border border-[var(--color-signal)] px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[var(--color-signal)] transition-colors hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)]"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
