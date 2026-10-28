"use client";

import { owner } from "@/lib/content";
import { Label, Reveal, Barcode } from "./primitives";

export function Contact() {
  return (
    <section id="contact" className="relative u-hairline-top py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <header className="flex items-baseline justify-between gap-4 pb-10">
          <div className="flex items-baseline gap-4">
            <Label className="text-signal">10</Label>
            <Label>CONTACT</Label>
          </div>
          <Label className="hidden sm:block">SIGN-OFF</Label>
        </header>

        <Reveal>
          <h2 className="u-display max-w-[22ch] text-5xl md:text-7xl lg:text-8xl">
            Let&apos;s ship something secure.
          </h2>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-bone-dim">
            If you&apos;re hiring for DevSecOps or platform engineering — or need a
            secure, air-gapped delivery pipeline built or hardened — I&apos;d like to
            talk.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-2">
            <a
              href={`mailto:${owner.email}`}
              className="group flex items-center justify-between bg-[var(--color-ink)] p-6 transition-colors hover:bg-[var(--color-ink-2)]"
            >
              <div>
                <Label className="block">EMAIL</Label>
                <span className="u-mono mt-2 block break-all text-base text-bone group-hover:text-signal md:text-lg">
                  {owner.email}
                </span>
              </div>
              <span className="text-2xl text-bone-faint transition-all group-hover:translate-x-1 group-hover:text-signal" aria-hidden>
                →
              </span>
            </a>
            <a
              href={owner.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-[var(--color-ink)] p-6 transition-colors hover:bg-[var(--color-ink-2)]"
            >
              <div>
                <Label className="block">LINKEDIN</Label>
                <span className="u-mono mt-2 block text-base text-bone group-hover:text-signal md:text-lg">
                  in/{owner.linkedin}
                </span>
              </div>
              <span className="text-2xl text-bone-faint transition-all group-hover:translate-x-1 group-hover:text-signal" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          <Barcode seed={29} bars={120} className="w-full" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Label>{owner.name.toUpperCase()} · {owner.role.toUpperCase()}</Label>
            <Label>DOC {owner.specCode} · END OF SHEET</Label>
          </div>
        </div>
      </div>
    </section>
  );
}
