"use client";

import { airgap, secrets, iac } from "@/lib/content";
import { Section, Label, Reveal, Barcode } from "./primitives";

export function AirgapIac() {
  return (
    <Section
      id="airgap"
      index="06"
      title="AIR-GAPPED & AS CODE"
      code="SPEC · OFFLINE / IAC"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="u-display text-4xl md:text-6xl lg:col-span-8">
            Built to run where the internet doesn&apos;t reach.
          </h2>
          <p className="text-lg leading-relaxed text-bone-dim lg:col-span-4">
            Banking and high-security networks restrict public egress. The build
            and deploy path never reaches the internet; the only outbound traffic
            is two caches you control — and pre-seed them, and even that goes away.
          </p>
        </div>
      </Reveal>

      {/* air-gap specs */}
      <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-4">
        {airgap.map((a, i) => (
          <Reveal key={a.code} delay={i * 0.05} className="h-full">
            <div className="flex h-full flex-col bg-[var(--color-ink)] p-5">
              <Label className="text-signal">{a.code}</Label>
              <h3 className="mt-4 text-base font-bold leading-snug text-bone">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {a.desc}
              </p>
            </div>
          </Reveal>
        ))}
        {/* closing tile — turns the grid's last cell into a deliberate stamp */}
        <Reveal delay={airgap.length * 0.05} className="h-full">
          <div className="flex h-full flex-col items-start justify-between gap-6 bg-[var(--color-ink)] p-5">
            <Label>SPEC · AG</Label>
            <div>
              <span
                className="u-mono inline-block border px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
                style={{
                  color: "var(--color-verify)",
                  borderColor: "var(--color-verify)",
                  background: "color-mix(in srgb, var(--color-verify) 10%, transparent)",
                }}
              >
                AIR-GAP READY
              </span>
              <p className="mt-3 text-sm leading-relaxed text-bone-faint">
                Every item above holds with egress closed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* secrets, centralized */}
      <Reveal>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Label className="mb-3 block">SECRETS, CENTRALIZED</Label>
            <h2 className="u-display text-4xl md:text-5xl">
              No credential ever lives in a repo.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-bone-dim lg:col-span-4">
            A complementary piece of the platform: a centralized secret store so
            applications fetch credentials at runtime instead of baking them into
            code or config.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-3">
        {secrets.map((s, i) => (
          <Reveal key={s.code} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col bg-[var(--color-ink)] p-5">
              <Label className="text-signal">{s.code}</Label>
              <h3 className="mt-4 text-base font-bold leading-snug text-bone">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Barcode seed={13} className="mx-auto my-16 w-full max-w-md" bars={80} />

      {/* IaC */}
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Label className="mb-3 block">ONBOARDING AS CODE</Label>
            <h2 className="u-display text-4xl md:text-5xl">
              A new app is one file and one apply.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-bone-dim lg:col-span-4">
            Registry projects, scoped CI/CD variables, branch protections,
            approval rules, and secret-store policies — all provisioned from
            Terraform, with managed remote state.
          </p>
        </div>
      </Reveal>

      <ol className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-4">
        {iac.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.06} className="h-full" as="li">
            <div className="flex h-full flex-col bg-[var(--color-ink)] p-6">
              <span className="u-display text-5xl text-[var(--color-rule-bright)]">
                {s.step}
              </span>
              <h3 className="mt-5 text-lg font-bold leading-tight text-bone">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
