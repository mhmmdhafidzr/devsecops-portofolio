"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { environments } from "@/lib/content";
import { Section, Label, Reveal } from "./primitives";

export function Promotion() {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();

  const promote = () => setStage((s) => Math.min(s + 1, environments.length - 1));
  const rollback = () => setStage(0);

  return (
    <Section
      id="promotion"
      index="05"
      title="PROMOTION & APPROVAL"
      code="FLOW · 3 ENVIRONMENTS"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="u-display max-w-[18ch] text-4xl md:text-6xl">
            Code earns its way to production, one gate at a time.
          </h2>
          <div className="flex gap-3">
            <button
              onClick={promote}
              disabled={stage >= environments.length - 1}
              className="u-mono px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors disabled:opacity-40"
              style={{ background: "var(--color-bone)", color: "var(--color-ink)" }}
            >
              {stage === 0 ? "Open merge → staging" : stage === 1 ? "Promote → production" : "Shipped"}
            </button>
            <button
              onClick={rollback}
              className="u-mono border border-[var(--color-rule-bright)] px-3 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-[var(--color-signal)]"
            >
              Reset
            </button>
          </div>
        </div>
      </Reveal>

      {/* rail */}
      <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-3">
        {environments.map((env, i) => {
          const active = i === stage;
          const done = i < stage;
          const isGate = i === 1;
          return (
            <Reveal key={env.code} delay={i * 0.08} className="h-full">
              <motion.article
                className="relative flex h-full flex-col bg-[var(--color-ink)] p-6"
                animate={{
                  backgroundColor: active
                    ? "var(--color-ink-2)"
                    : "var(--color-ink)",
                }}
              >
                <div className="flex items-center justify-between">
                  <Label style={{ color: active ? "var(--color-signal)" : undefined }}>
                    {env.code}
                  </Label>
                  <span
                    className="u-mono text-xs"
                    style={{
                      color: done
                        ? "var(--color-verify)"
                        : active
                          ? "var(--color-signal)"
                          : "var(--color-bone-faint)",
                    }}
                  >
                    {done ? "PASSED" : active ? "ACTIVE" : "WAITING"}
                  </span>
                </div>

                <h3 className="u-display mt-4 text-3xl lowercase">{env.name}</h3>

                {isGate && (
                  <span
                    className="u-mono mt-3 inline-flex w-fit items-center gap-2 px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em]"
                    style={{
                      background: "color-mix(in srgb, var(--color-signal) 14%, transparent)",
                      color: "var(--color-signal)",
                      border: "1px solid var(--color-signal)",
                    }}
                  >
                    ◈ Blocking SAST gate
                  </span>
                )}

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 u-hairline-top pt-3">
                    <dt className="u-label">GATE</dt>
                    <dd className="text-right text-bone-dim">{env.gate}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="u-label">APPROVER</dt>
                    <dd className="text-right text-bone-dim">{env.approver}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="u-label">SCAN</dt>
                    <dd className="text-right text-bone-dim">{env.scan}</dd>
                  </div>
                </dl>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-bone-dim">
                  {env.note}
                </p>

                <motion.span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ background: done ? "var(--color-verify)" : "var(--color-signal)" }}
                  initial={false}
                  animate={{ width: done || active ? "100%" : "0%" }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      {/* enforcement notes */}
      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-3">
          {[
            {
              k: "PROTECTED BRANCHES",
              v: "No direct pushes. Each environment branch is reachable only through a reviewed merge request from the one allowed source.",
            },
            {
              k: "TIERED APPROVALS",
              v: "Approval authority rises with risk — and the author can never approve their own change.",
            },
            {
              k: "DEVELOP PUBLIC, DEPLOY ON-PREM",
              v: "Work happens on a public host for remote convenience; the on-prem side that reaches production mirrors only the branches it should.",
            },
          ].map((n) => (
            <div key={n.k} className="bg-[var(--color-ink)] p-5">
              <Label className="block">{n.k}</Label>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">{n.v}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
