"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pipeline } from "@/lib/content";
import { Section, Label, Reveal } from "./primitives";

export function Pipeline() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stage = pipeline[active];

  return (
    <Section
      id="architecture"
      index="01"
      title="THE PIPELINE"
      code="FLOW · PUSH → LIVE"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="u-display text-4xl md:text-5xl">
              One push.
              <br />
              <span className="text-bone-dim">Eight guarded steps.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-bone-dim">
              A developer pushes code. Everything after that is automated and
              enforced — isolated build, two security scans, a cryptographic
              signature, a vulnerability policy, and a deploy that opens no
              inbound ports. Walk each step.
            </p>
            <div className="mt-6 u-hairline-top pt-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0"
                  style={{ background: "var(--color-signal)" }}
                  aria-hidden
                />
                <Label style={{ color: "var(--color-signal)" }}>
                  HARBOR IS THE HUB
                </Label>
              </div>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-bone-dim">
                The private registry holds every image, runs the Trivy scan,
                stores the Cosign signature, and enforces admission. Deploys pull
                only from Harbor.
              </p>
            </div>
          </div>

          {/* stepper */}
          <div className="lg:col-span-7">
            <ol className="flex flex-wrap gap-1.5" role="tablist" aria-label="Pipeline stages">
              {pipeline.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.key}>
                    <button
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className="group flex items-center gap-2 border px-3 py-2 text-left transition-colors"
                      style={{
                        borderColor: on
                          ? "var(--color-signal)"
                          : "var(--color-rule)",
                        background: on ? "var(--color-ink-2)" : "transparent",
                      }}
                    >
                      <span
                        className="u-mono text-[0.625rem] tabular"
                        style={{
                          color: on
                            ? "var(--color-signal)"
                            : "var(--color-bone-faint)",
                        }}
                      >
                        {p.code}
                      </span>
                      <span
                        className="text-sm font-semibold transition-colors"
                        style={{ color: on ? "var(--color-bone)" : "var(--color-bone-dim)" }}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 u-plate min-h-[180px] p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-signal">{stage.code}</Label>
                    <Label>{stage.actor}</Label>
                  </div>
                  <h3 className="u-display mt-3 text-3xl">{stage.title}</h3>
                  <p className="mt-3 max-w-[54ch] leading-relaxed text-bone-dim">
                    {stage.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* progress rail */}
            <div className="mt-4 flex items-center gap-2">
              <div className="relative h-1 flex-1 overflow-hidden bg-[var(--color-ink-3)]">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ background: "var(--color-signal)" }}
                  animate={{ width: `${((active + 1) / pipeline.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="u-label tabular">
                {String(active + 1).padStart(2, "0")} / {String(pipeline.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setActive((a) => (a + 1) % pipeline.length)}
                className="u-mono border border-[var(--color-rule-bright)] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-colors hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
