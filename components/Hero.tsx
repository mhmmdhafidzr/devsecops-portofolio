"use client";

import { motion, useReducedMotion } from "motion/react";
import { owner, headlineStats } from "@/lib/content";
import { Label, SignalStrip, Barcode, Counter, GridRules } from "./primitives";

export function Hero() {
  const reduce = useReducedMotion();

  const words = ["SECURE", "DELIVERY,", "PROVEN", "AT", "EVERY", "STEP."];

  return (
    <section id="top" className="relative overflow-hidden">
      <GridRules />

      {/* top spec strip */}
      <div className="relative mx-auto max-w-[1400px] px-5 pt-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-y-2 u-hairline-bottom pb-3">
          <Label>{owner.role.toUpperCase()}</Label>
          <Label className="hidden md:inline">{owner.location.toUpperCase()}</Label>
          <Label>DOC · {owner.specCode}</Label>
        </div>
      </div>

      {/* headline */}
      <div className="relative mx-auto max-w-[1400px] px-5 pt-10 md:px-10 md:pt-16">
        <h1 className="u-display text-[15vw] leading-[0.86] md:text-[11.5vw] lg:text-[9.5rem] xl:text-[11rem]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.05 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                marginRight: "0.22em",
                color: w === "PROVEN" ? "var(--color-signal)" : undefined,
              }}
            >
              {w}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* claim + signal strip */}
      <div className="relative mx-auto mt-10 grid max-w-[1400px] grid-cols-1 gap-8 px-5 pb-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="max-w-[52ch] text-xl leading-snug text-bone-dim md:text-2xl">
            {owner.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#architecture"
              className="group u-mono inline-flex items-center gap-2 bg-[var(--color-bone)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-signal)]"
            >
              Walk the pipeline
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#attack"
              className="u-mono inline-flex items-center gap-2 border border-[var(--color-rule-bright)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
            >
              Attack the chain
            </a>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <SignalStrip />
        </div>
      </div>

      {/* stat strip on a rule line */}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Barcode className="mb-3" />
        <dl className="grid grid-cols-2 u-hairline-top md:grid-cols-4">
          {headlineStats.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 ${i !== 0 ? "md:border-l md:pl-6" : ""} ${
                i % 2 !== 0 ? "border-l pl-6 md:border-l" : ""
              }`}
            >
              <dd className="u-display text-5xl text-bone md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="u-label mt-2 block">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
