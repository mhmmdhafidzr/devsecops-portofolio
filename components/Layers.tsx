"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { layers, evidence, type EvidenceLine } from "@/lib/content";
import { Section, Label, Stamp, Reveal } from "./primitives";

const lineColor = (k: EvidenceLine["k"]) =>
  k === "ok"
    ? "var(--color-verify)"
    : k === "deny"
      ? "var(--color-signal)"
      : k === "warn"
        ? "#e0a53a"
        : k === "cmd"
          ? "var(--color-bone)"
          : k === "dim"
            ? "var(--color-bone-faint)"
            : "var(--color-bone-dim)";

/* Streams evidence lines in one at a time like a running check. */
function EvidenceStream({ lines }: { lines: EvidenceLine[] }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) {
      setShown(lines.length);
      return;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) clearInterval(id);
    }, 160);
    return () => clearInterval(id);
  }, [lines, reduce]);

  return (
    <div className="space-y-1.5">
      {lines.slice(0, shown).map((ln, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="u-mono text-[0.8125rem] leading-relaxed"
          style={{ color: lineColor(ln.k) }}
        >
          {ln.t}
        </motion.div>
      ))}
      {!reduce && shown < lines.length && (
        <span
          className="inline-block h-3.5 w-2 animate-pulse align-middle"
          style={{ background: "var(--color-signal)" }}
          aria-hidden
        />
      )}
    </div>
  );
}

function Drawer({ code, onClose }: { code: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [showFail, setShowFail] = useState(false);
  const ev = evidence[code];
  const layer = layers.find((l) => l.code === code)!;
  const ref = useRef<HTMLDivElement>(null);

  // reset the fail toggle whenever the layer changes
  useEffect(() => setShowFail(false), [code]);

  if (!ev) return null;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-px bg-[var(--color-ink-2)] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <Label className="text-signal">{code}</Label>
            <Label>{layer.tool.toUpperCase()} · RUN CHECK</Label>
          </div>
          <button
            onClick={onClose}
            aria-label="Close check output"
            className="u-mono text-xs text-bone-faint transition-colors hover:text-bone"
          >
            CLOSE ✕
          </button>
        </div>

        <h3 className="u-display mt-4 max-w-[36ch] text-2xl md:text-3xl">
          {ev.heading}
        </h3>
        <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-bone-dim">
          {ev.sub}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* the running check */}
          <div className="u-plate p-5">
            <div className="mb-3 flex items-center justify-between">
              <Label>CHECK OUTPUT</Label>
              <span className="relative flex h-2 w-2">
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--color-verify)" }}
                />
              </span>
            </div>
            <EvidenceStream lines={ev.lines} />
          </div>

          {/* what if it fails */}
          <div className="u-plate flex flex-col p-5">
            <button
              onClick={() => setShowFail((v) => !v)}
              aria-expanded={showFail}
              className="flex items-center justify-between text-left"
            >
              <Label style={{ color: "var(--color-signal)" }}>
                {ev.whatIfFails.label.toUpperCase()}
              </Label>
              <span
                className="u-mono text-xs transition-transform"
                style={{
                  color: "var(--color-signal)",
                  transform: showFail ? "rotate(45deg)" : "none",
                }}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {showFail ? (
                <motion.div
                  key="fail"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-1.5">
                    {ev.whatIfFails.lines.map((ln, i) => (
                      <div
                        key={i}
                        className="u-mono text-[0.8125rem] leading-relaxed"
                        style={{ color: lineColor(ln.k) }}
                      >
                        {ln.t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={false}
                  className="mt-4 text-sm leading-relaxed text-bone-faint"
                >
                  The gate has teeth. Expand to see what happens when this layer
                  catches something — the same check, failing closed.
                </motion.p>
              )}
            </AnimatePresence>

            {ev.seeAlso && (
              <a
                href={ev.seeAlso.href}
                className="u-mono mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:text-signal"
              >
                {ev.seeAlso.label}
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Layers() {
  const [verified, setVerified] = useState<boolean[]>(() => layers.map(() => false));
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const allVerified = verified.every(Boolean);

  const runCheck = (i: number) => {
    const code = layers[i].code;
    setVerified((v) => v.map((x, j) => (j === i ? true : x)));
    setOpen((cur) => (cur === code ? cur : code));
  };

  const verifyAll = () => setVerified(layers.map(() => true));
  const reset = () => {
    setVerified(layers.map(() => false));
    setOpen(null);
  };

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
          <button
            onClick={allVerified ? reset : verifyAll}
            className="u-mono border border-[var(--color-signal)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-signal)] transition-colors hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)]"
          >
            {allVerified ? "Reset" : "Verify all layers"}
          </button>
        </div>
        <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-bone-faint">
          Run a layer&apos;s check to see the real decision it makes — the output,
          the threshold, and what it does when something fails.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-5">
        {layers.map((l, i) => {
          const isOpen = open === l.code;
          return (
            <Reveal key={l.code} delay={i * 0.06} className="h-full">
              <article
                className="group relative flex h-full flex-col p-5 transition-colors"
                style={{
                  background: isOpen
                    ? "var(--color-ink-2)"
                    : "var(--color-ink)",
                }}
              >
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
                  onClick={() => runCheck(i)}
                  className="u-mono mt-4 w-full border px-3 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors"
                  style={{
                    borderColor: isOpen
                      ? "var(--color-signal)"
                      : verified[i]
                        ? "var(--color-verify)"
                        : "var(--color-rule-bright)",
                    color: isOpen
                      ? "var(--color-signal)"
                      : verified[i]
                        ? "var(--color-verify)"
                        : "var(--color-bone)",
                  }}
                >
                  {isOpen ? "Showing ▾" : verified[i] ? "✓ View output" : "Run check"}
                </button>

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
          );
        })}
      </div>

      {/* evidence drawer */}
      <AnimatePresence mode="wait">
        {open && <Drawer key={open} code={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Section>
  );
}
