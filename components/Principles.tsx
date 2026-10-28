"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { principles } from "@/lib/content";
import { Section, Label, Reveal } from "./primitives";

type Mode = "self" | "cloud";

export function Principles() {
  const [mode, setMode] = useState<Mode>("self");
  const reduce = useReducedMotion();

  return (
    <Section
      id="principles"
      index="09"
      title="PRINCIPLES OVER TOOLS"
      code="REF · PORTABLE BY DESIGN"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="u-display text-4xl md:text-6xl lg:col-span-7">
            Same concept. Different tools. The model travels.
          </h2>
          <p className="text-lg leading-relaxed text-bone-dim lg:col-span-5">
            What I&apos;m selling is the security model, not a brand of tool. Every
            layer is a principle first. Already on a different toolchain — or on
            cloud? The design slots onto it with the same guarantees.
          </p>
        </div>
      </Reveal>

      {/* toggle */}
      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div
            className="inline-flex border border-[var(--color-rule-bright)]"
            role="tablist"
            aria-label="Deployment model"
          >
            <button
              role="tab"
              aria-selected={mode === "self"}
              onClick={() => setMode("self")}
              className="u-mono px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              style={{
                background: mode === "self" ? "var(--color-signal)" : "transparent",
                color: mode === "self" ? "var(--color-ink)" : "var(--color-bone-dim)",
              }}
            >
              Self-managed / air-gapped
            </button>
            <button
              role="tab"
              aria-selected={mode === "cloud"}
              onClick={() => setMode("cloud")}
              className="u-mono px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              style={{
                background: mode === "cloud" ? "var(--color-signal)" : "transparent",
                color: mode === "cloud" ? "var(--color-ink)" : "var(--color-bone-dim)",
              }}
            >
              Cloud-native equivalent
            </button>
          </div>
          <Label>
            {mode === "self" ? "WHAT I RUN TODAY" : "SAME PRINCIPLES · MANAGED SERVICES"}
          </Label>
        </div>
      </Reveal>

      {/* spec table */}
      <Reveal delay={0.08}>
        <div className="mt-6 u-plate overflow-hidden">
          <div className="hidden grid-cols-12 gap-4 u-hairline-bottom px-5 py-3 md:grid">
            <Label className="col-span-1">ID</Label>
            <Label className="col-span-6">PRINCIPLE</Label>
            <Label className="col-span-5">
              {mode === "self" ? "WHAT I USE" : "CLOUD EQUIVALENT"}
            </Label>
          </div>

          <ul>
            {principles.map((p, i) => (
              <li
                key={p.code}
                className="grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-[var(--color-ink-2)] md:grid-cols-12 md:items-center md:gap-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-rule)" }}
              >
                <span className="u-mono col-span-1 text-xs text-bone-faint">
                  {p.code}
                </span>
                <span className="col-span-6 text-base font-semibold text-bone">
                  {p.principle}
                </span>
                <span className="col-span-5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={mode}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                      className="u-mono inline-block border px-2 py-1 text-xs leading-relaxed"
                      style={{
                        borderColor:
                          mode === "self"
                            ? "var(--color-signal)"
                            : "var(--color-rule-bright)",
                        color:
                          mode === "self"
                            ? "var(--color-signal)"
                            : "var(--color-bone)",
                      }}
                    >
                      {mode === "self" ? p.mine : p.cloud}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* honest cloud note */}
      <AnimatePresence>
        {mode === "cloud" && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 flex items-start gap-3 border border-[var(--color-rule-bright)] p-4">
              <span
                className="mt-0.5 inline-block h-4 w-4 shrink-0"
                style={{ background: "var(--color-signal)" }}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-bone-dim">
                <span className="text-bone">Straight answer:</span> my hands-on
                production work is the self-managed, air-gapped stack on the left.
                The cloud column is the direction I&apos;m actively growing into —
                and the mapping is this clean precisely because I designed to the{" "}
                <span className="text-bone">security properties</span>, not to one
                vendor&apos;s tools. Isolation, a blocking SAST gate, signed provenance,
                an admission policy, pull-based GitOps, and IaC don&apos;t change in the
                cloud; the managed service behind each one does.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal delay={0.12}>
        <p className="mt-10 max-w-[62ch] text-xl leading-snug text-bone md:text-2xl">
          The principles are the product.{" "}
          <span className="text-bone-dim">
            The tools adapt to whatever you already run — on-prem or cloud.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
