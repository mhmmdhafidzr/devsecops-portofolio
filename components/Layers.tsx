"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { layers } from "@/lib/content";
import { Section, Label, Stamp, Reveal } from "./primitives";

export function Layers() {
  const [verified, setVerified] = useState<boolean[]>(
    () => layers.map(() => false)
  );
  const reduce = useReducedMotion();
  const allVerified = verified.every(Boolean);

  const verify = (i: number) =>
    setVerified((v) => v.map((x, j) => (j === i ? true : x)));

  const verifyAll = () => setVerified(layers.map(() => true));
  const reset = () => setVerified(layers.map(() => false));

  return (
    <Section
      id="security"
      index="02"
      title="DEFENSE IN DEPTH"
      code="SPEC · 5 LAYERS"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="u-display max-w-[16ch] text-4xl md:text-6xl">
            Five layers. Each one a spec you can verify.
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={allVerified ? reset : verifyAll}
              className="u-mono border border-[var(--color-signal)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-signal)] transition-colors hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)]"
            >
              {allVerified ? "Reset stamps" : "Verify all layers"}
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-5">
        {layers.map((l, i) => (
          <Reveal key={l.code} delay={i * 0.06} className="h-full">
            <article className="group relative flex h-full flex-col bg-[var(--color-ink)] p-5 transition-colors hover:bg-[var(--color-ink-2)]">
              <div className="flex items-center justify-between">
                <Label className="text-signal">{l.code}</Label>
                <Stamp verified={verified[i]} />
              </div>

              <h3 className="u-display mt-5 text-2xl leading-tight">{l.name}</h3>
              <p className="u-mono mt-1 text-xs text-bone-faint">{l.tool}</p>

              <p className="mt-4 text-[0.95rem] font-semibold leading-snug text-bone">
                {l.claim}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
                {l.detail}
              </p>

              <div className="mt-5 u-hairline-top pt-4">
                <Label className="mb-2 block">PROVES</Label>
                <p className="text-sm leading-snug text-bone-dim">{l.proves}</p>
              </div>

              <button
                onClick={() => verify(i)}
                disabled={verified[i]}
                className="u-mono mt-4 w-full border px-3 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors disabled:cursor-default"
                style={{
                  borderColor: verified[i]
                    ? "var(--color-verify)"
                    : "var(--color-rule-bright)",
                  color: verified[i]
                    ? "var(--color-verify)"
                    : "var(--color-bone)",
                }}
              >
                {verified[i] ? "✓ Verified" : "Run check"}
              </button>

              {/* bottom progress mark */}
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ background: "var(--color-verify)" }}
                initial={false}
                animate={{ width: verified[i] ? "100%" : "0%" }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
