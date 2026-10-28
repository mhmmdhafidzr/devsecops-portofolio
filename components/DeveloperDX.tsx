"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Section, Label, Reveal } from "./primitives";

const log = [
  { t: "$ git push origin feature/new-report", kind: "cmd" },
  { t: "→ merge request opened · awaiting review", kind: "dim" },
  { t: "✓ approved · merged to development", kind: "ok" },
  { t: "◆ build · isolated runner (sysbox)", kind: "run" },
  { t: "◆ scan · code quality + SAST gate", kind: "run" },
  { t: "◆ sign · cosign (offline)", kind: "run" },
  { t: "◆ scan · registry vulnerability policy", kind: "run" },
  { t: "◆ deploy · edge agent pulled new image", kind: "run" },
  { t: "✓ live · zero-downtime rolling update", kind: "ok" },
];

const colorFor = (k: string) =>
  k === "cmd"
    ? "var(--color-bone)"
    : k === "ok"
      ? "var(--color-verify)"
      : k === "run"
        ? "var(--color-signal)"
        : "var(--color-bone-faint)";

export function DeveloperDX() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(log.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= log.length) clearInterval(id);
    }, 420);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <Section
      id="developer"
      index="07"
      title="DEVELOPER EXPERIENCE"
      code="DX · ONE COMMAND"
      className="py-16 md:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="u-display text-4xl md:text-6xl">
              The developer&apos;s whole job is{" "}
              <span className="text-signal">git push</span>.
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-bone-dim">
              No deploy scripts. No SSH into servers. No manual registry login,
              no hand-edited manifests. Security and delivery are the platform&apos;s
              job, not a checklist the developer has to remember.
            </p>
            <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-bone-faint">
              Rollback is just as cheap: every build is a unique, retained tag, so
              reverting is picking a previous one.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7" ref={ref}>
          <div className="u-plate overflow-hidden">
            <div className="flex items-center justify-between u-hairline-bottom px-4 py-2.5">
              <Label>PIPELINE LOG · ILLUSTRATIVE</Label>
              <Label>auto</Label>
            </div>
            <div className="p-5">
              <ul className="space-y-2 text-sm">
                {log.map((line, i) => (
                  <motion.li
                    key={i}
                    className="u-mono"
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={
                      i < shown
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -8 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ color: colorFor(line.kind) }}
                  >
                    {line.t}
                  </motion.li>
                ))}
                {shown < log.length && !reduce && (
                  <li
                    className="u-mono inline-block h-4 w-2 animate-pulse"
                    style={{ background: "var(--color-signal)" }}
                    aria-hidden
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
