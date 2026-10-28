"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ---------------------------------------------------------------------------
   Datasheet primitives. Each carries the world with content removed:
   ruled grid, hairline rules, tracked micro-labels, spec-code dividers,
   the VERIFIED provenance stamp, and the one live metered signal strip.
--------------------------------------------------------------------------- */

export function Label({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`u-label ${className}`} style={style}>
      {children}
    </span>
  );
}

/** A barcode-style divider — the datasheet's section separator. Decorative,
 *  derived deterministically so it never jitters between renders. */
export function Barcode({
  seed = 7,
  className = "",
  bars = 48,
}: {
  seed?: number;
  className?: string;
  bars?: number;
}) {
  const widths: number[] = [];
  let s = seed * 9973;
  for (let i = 0; i < bars; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    widths.push(1 + (s % 4));
  }
  return (
    <div
      aria-hidden
      className={`flex items-end gap-[2px] h-5 ${className}`}
      style={{ opacity: 0.55 }}
    >
      {widths.map((w, i) => (
        <span
          key={i}
          style={{
            width: `${w}px`,
            height: i % 7 === 0 ? "100%" : "70%",
            background: "var(--color-bone-faint)",
          }}
        />
      ))}
    </div>
  );
}

/** The ruled 12-column grid backdrop for a region. */
export function GridRules({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 u-grid-lines ${className}`}
      style={{ opacity: 0.4 }}
    />
  );
}

/** Section wrapper: hairline top rule + spec-coded header on the rule line. */
export function Section({
  id,
  code,
  title,
  index,
  children,
  className = "",
}: {
  id: string;
  code: string;
  title: string;
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative u-hairline-top ${className}`}>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <header className="flex items-baseline justify-between gap-4 py-4 u-hairline-bottom">
          <div className="flex items-baseline gap-4">
            <Label className="text-signal">{index}</Label>
            <Label>{title}</Label>
          </div>
          <Label className="hidden sm:block">{code}</Label>
        </header>
        {children}
      </div>
    </section>
  );
}

/** Provenance stamp. Starts UNVERIFIED; stamps to VERIFIED on demand.
 *  This is the raise from the roll's assigned direction: the supply-chain
 *  story is literally the page's visual language. */
export function Stamp({
  verified,
  label = "VERIFIED",
  deniedLabel = "UNVERIFIED",
}: {
  verified: boolean;
  label?: string;
  deniedLabel?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="u-mono inline-flex select-none items-center justify-center whitespace-nowrap border px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
      initial={false}
      animate={{
        rotate: verified ? -6 : 0,
        scale: verified ? 1 : 0.98,
      }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 16 }
      }
      style={{
        color: verified ? "var(--color-verify)" : "var(--color-bone-faint)",
        borderColor: verified
          ? "var(--color-verify)"
          : "var(--color-rule-bright)",
        background: verified
          ? "color-mix(in srgb, var(--color-verify) 10%, transparent)"
          : "transparent",
      }}
    >
      {verified ? label : deniedLabel}
    </motion.span>
  );
}

/** A number that counts up when scrolled into view. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    return spring.on("change", (v) => setVal(v));
  }, [spring, reduce, to]);

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** The ONE live instrument on the page: a metered signal strip with weighted,
 *  damped motion (true-ballistics raise from the VU-meter challenger). It reads
 *  as live pipeline/security telemetry, never an instant toggle. */
export function SignalStrip({
  rows = 5,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: rows }, () => 0.3)
  );

  useEffect(() => {
    if (reduce) {
      setLevels(Array.from({ length: rows }, (_, i) => 0.5 + i * 0.08));
      return;
    }
    let raf = 0;
    const targets = Array.from({ length: rows }, () => Math.random());
    let t = 0;
    const tick = () => {
      t += 1;
      if (t % 40 === 0) {
        for (let i = 0; i < rows; i++) targets[i] = 0.25 + Math.random() * 0.7;
      }
      setLevels((prev) =>
        prev.map((v, i) => v + (targets[i] - v) * 0.06) // weighted integration (mass + damping)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rows, reduce]);

  const labels = ["BUILD", "SAST", "SIGN", "SCAN", "DEPLOY"];

  return (
    <div className={`u-plate p-3 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <Label>SIGNAL · LIVE</Label>
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full"
            style={{
              background: "var(--color-signal)",
              animation: reduce ? "none" : "ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "var(--color-signal)" }}
          />
        </span>
      </div>
      <div className="space-y-2">
        {levels.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="u-label w-16 shrink-0 text-right">
              {labels[i % labels.length]}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden bg-[var(--color-ink-3)]">
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${Math.min(100, v * 100)}%`,
                  background:
                    v > 0.85 ? "var(--color-signal)" : "var(--color-bone-faint)",
                  transition: "background 120ms linear",
                }}
              />
            </div>
            <span className="u-mono w-9 shrink-0 text-right text-[0.625rem] text-bone-dim tabular">
              {Math.round(v * 100)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reveal-on-scroll wrapper. One authored motion moment, not scattered.
 *  Resilient by design: the entrance plays on scroll, but a mount fallback and
 *  an in-view check guarantee content is never stranded at opacity 0 on an
 *  anchor jump, a fast scroll, or a missed IntersectionObserver fire. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    // Safety net: if already within the viewport on mount (anchor land / fast
    // scroll), reveal it so a section can never render blank.
    const id = setTimeout(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (r.top < vh && r.bottom > 0) {
        setShown(true);
        observer.disconnect();
      }
    }, 700);

    return () => {
      observer.disconnect();
      clearTimeout(id);
    };
  }, [reduce]);

  const target = reduce
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : shown
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 16, filter: "blur(6px)" };

  if (as === "li") {
    return (
      <motion.li
        ref={ref as React.Ref<HTMLLIElement>}
        className={className}
        initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={target}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={target}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
