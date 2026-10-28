"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { attacks, layers } from "@/lib/content";
import { Section, Label, Reveal } from "./primitives";

type Phase = "idle" | "running" | "blocked";

export function AttackSim() {
  const [selected, setSelected] = useState(attacks[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [reached, setReached] = useState(-1);
  const reduce = useReducedMotion();

  const attack = attacks.find((a) => a.id === selected)!;
  const blockIndex = layers.findIndex((l) => l.code === attack.stoppedBy);

  const run = useCallback(() => {
    if (phase === "running") return;
    setPhase("running");
    setReached(-1);
    const stepDelay = reduce ? 1 : 420;
    let i = 0;
    const tick = () => {
      setReached(i);
      if (i >= blockIndex) {
        setTimeout(() => setPhase("blocked"), reduce ? 1 : 500);
        return;
      }
      i += 1;
      setTimeout(tick, stepDelay);
    };
    setTimeout(tick, stepDelay);
  }, [phase, blockIndex, reduce]);

  const reset = () => {
    setPhase("idle");
    setReached(-1);
  };

  const pick = (id: string) => {
    setSelected(id);
    reset();
  };

  return (
    <Section
      id="attack"
      index="04"
      title="ATTACK SIMULATION"
      code="DEMO · SUPPLY CHAIN"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="max-w-[60ch]">
          <h2 className="u-display text-4xl md:text-6xl">
            Try to get something bad into production.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone-dim">
            Pick an attack, then press deploy. The chain runs the same checks it
            runs for real and refuses the artifact at the first layer that catches
            it. Nothing bad ships.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* attack picker */}
        <div className="lg:col-span-4">
          <Label className="mb-3 block">SELECT PAYLOAD</Label>
          <div className="flex flex-col gap-2">
            {attacks.map((a) => {
              const on = a.id === selected;
              return (
                <button
                  key={a.id}
                  onClick={() => pick(a.id)}
                  className="group border p-4 text-left transition-colors"
                  style={{
                    borderColor: on ? "var(--color-signal)" : "var(--color-rule)",
                    background: on ? "var(--color-ink-2)" : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-bone">{a.name}</span>
                    <span
                      className="u-mono text-[0.625rem]"
                      style={{ color: on ? "var(--color-signal)" : "var(--color-bone-faint)" }}
                    >
                      {a.stoppedBy}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-bone-dim">
                    {a.story}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* chain visual */}
        <div className="lg:col-span-8">
          <div className="u-plate p-6">
            <div className="flex items-center justify-between">
              <Label>ADMISSION CHAIN</Label>
              <div className="flex items-center gap-3">
                <button
                  onClick={run}
                  disabled={phase === "running"}
                  className="u-mono px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors disabled:opacity-50"
                  style={{ background: "var(--color-bone)", color: "var(--color-ink)" }}
                >
                  {phase === "running" ? "Running…" : "Deploy payload ▶"}
                </button>
                <button
                  onClick={reset}
                  className="u-mono border border-[var(--color-rule-bright)] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-[var(--color-signal)]"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* the 5 gates */}
            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
              {layers.map((l, i) => {
                const isBlock = i === blockIndex;
                const passed = phase !== "idle" && reached > i && !(isBlock && reached >= i);
                const blockedHere = isBlock && phase === "blocked" && reached >= i;
                const activeNow = phase === "running" && reached === i;

                let state: "pending" | "pass" | "block" | "active" = "pending";
                if (blockedHere) state = "block";
                else if (passed) state = "pass";
                else if (activeNow) state = "active";

                const color =
                  state === "block"
                    ? "var(--color-signal)"
                    : state === "pass"
                      ? "var(--color-verify)"
                      : state === "active"
                        ? "var(--color-bone)"
                        : "var(--color-rule-bright)";

                return (
                  <li key={l.code} className="relative">
                    <motion.div
                      className="flex h-full flex-col border p-3"
                      animate={{
                        borderColor: color,
                        backgroundColor:
                          state === "block"
                            ? "color-mix(in srgb, var(--color-signal) 12%, transparent)"
                            : state === "pass"
                              ? "color-mix(in srgb, var(--color-verify) 8%, transparent)"
                              : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="u-mono text-[0.625rem]" style={{ color }}>
                          {l.code}
                        </span>
                        <span className="u-mono text-sm" style={{ color }}>
                          {state === "pass" ? "✓" : state === "block" ? "✕" : state === "active" ? "…" : "·"}
                        </span>
                      </div>
                      <span className="mt-2 text-xs font-semibold leading-tight text-bone">
                        {l.tool.split(" ")[0]}
                      </span>
                      <span className="u-label mt-1">{l.name}</span>
                    </motion.div>
                  </li>
                );
              })}
            </ol>

            {/* verdict */}
            <div className="mt-6 min-h-[92px] u-hairline-top pt-5">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.p
                    key="idle"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-bone-faint"
                  >
                    Press <span className="text-bone">Deploy payload</span> to send “{attack.name}” down the chain.
                  </motion.p>
                )}
                {phase === "running" && (
                  <motion.p
                    key="run"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="u-mono text-sm text-bone-dim"
                  >
                    Evaluating admission policy…
                  </motion.p>
                )}
                {phase === "blocked" && (
                  <motion.div
                    key="blocked"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="u-mono px-2 py-1 text-xs font-bold uppercase tracking-[0.18em]"
                        style={{ background: "var(--color-signal)", color: "var(--color-ink)" }}
                      >
                        Blocked at {attack.stoppedBy} · {attack.stoppedTool}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-bone-dim">
                      {attack.outcome}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
