"use client";

import { stack } from "@/lib/content";
import { Section, Label, Reveal } from "./primitives";

export function StackSheet() {
  return (
    <Section
      id="stack"
      index="08"
      title="BILL OF MATERIALS"
      code="REF · TOOLCHAIN"
      className="py-16 md:py-24"
    >
      <Reveal>
        <h2 className="u-display max-w-[20ch] text-4xl md:text-5xl">
          The toolchain, by function.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.04} className="h-full">
            <div className="flex h-full flex-col bg-[var(--color-ink)] p-5">
              <Label className="block">{s.group.toUpperCase()}</Label>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-sm text-bone">
                    <span
                      className="inline-block h-1.5 w-1.5 shrink-0"
                      style={{ background: "var(--color-signal)" }}
                      aria-hidden
                    />
                    <span className="u-mono text-[0.8125rem]">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
