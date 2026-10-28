"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section, Label, Reveal } from "./primitives";

/* Sysbox UID-mapping demo. Shows that root (UID 0) inside the isolated build
   is an unprivileged, namespaced UID on the host. Illustrative values. */

const HOST_BASE = 296608; // illustrative subuid base, mirrors a real uid_map row

function Mono({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <span className={`u-mono ${dim ? "text-bone-faint" : "text-bone"}`}>
      {children}
    </span>
  );
}

export function IsolationDemo() {
  const [view, setView] = useState<"container" | "host">("container");
  const reduce = useReducedMotion();

  return (
    <Section
      id="isolation"
      index="03"
      title="BUILD ISOLATION"
      code="DEMO · SYSBOX UID MAP"
      className="py-16 md:py-24"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="u-display text-4xl md:text-5xl">
              Root in the build is <span className="text-signal">not</span> root
              on the host.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-bone-dim">
              The CI container runs on a runtime that gives each build VM-grade
              isolation — without privileged mode. User namespaces remap IDs, so
              the all-powerful <Mono>uid 0</Mono> inside the container is just an
              ordinary, unprivileged account on the host.
            </p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-bone-faint">
              Flip the perspective and read the same process two ways.
            </p>

            <div className="mt-8 inline-flex border border-[var(--color-rule-bright)]" role="tablist" aria-label="Perspective">
              {(["container", "host"] as const).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className="u-mono px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                  style={{
                    background: view === v ? "var(--color-signal)" : "transparent",
                    color: view === v ? "var(--color-ink)" : "var(--color-bone-dim)",
                  }}
                >
                  {v === "container" ? "Inside container" : "On the host"}
                </button>
              ))}
            </div>
          </div>

          {/* terminal */}
          <div className="lg:col-span-7">
            <div className="u-plate overflow-hidden">
              <div className="flex items-center justify-between u-hairline-bottom px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-rule-bright)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-rule-bright)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-signal)" }} />
                </div>
                <Label>
                  {view === "container" ? "ci-build (sysbox)" : "host : runner"}
                </Label>
              </div>

              <div className="p-5 text-sm leading-relaxed min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {view === "container" ? (
                      <>
                        <div>
                          <Mono dim>build $ </Mono>
                          <Mono>whoami</Mono>
                          <div className="mt-1">
                            <Mono>root</Mono>
                          </div>
                        </div>
                        <div>
                          <Mono dim>build $ </Mono>
                          <Mono>id</Mono>
                          <div className="mt-1">
                            <Mono>uid=0(root) gid=0(root) groups=0(root)</Mono>
                          </div>
                        </div>
                        <div>
                          <Mono dim>build $ </Mono>
                          <Mono>cat /proc/self/uid_map</Mono>
                          <div className="mt-1 u-mono text-bone">
                            <span className="text-signal">0</span>
                            {"      "}
                            <span className="text-verify">{HOST_BASE}</span>
                            {"      "}65536
                          </div>
                        </div>
                        <div className="u-hairline-top pt-4 text-bone-dim">
                          <Mono dim>
                            # container uid 0 ─ maps to ─▶ host uid {HOST_BASE}
                          </Mono>
                          <div className="mt-2">
                            <Mono dim>build $ </Mono>
                            <Mono>ls /host 2&gt;&amp;1</Mono>
                          </div>
                          <div className="mt-1">
                            <Mono>ls: /host: No such file or directory</Mono>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Mono dim>host $ </Mono>
                          <Mono>ps -o uid,user,cmd -C dockerd-build</Mono>
                          <div className="mt-1 u-mono">
                            <span className="text-verify">{HOST_BASE}</span>{"  "}
                            <span className="text-bone-dim">_sysbox</span>{"  "}
                            <span className="text-bone-dim">/usr/bin/build …</span>
                          </div>
                        </div>
                        <div>
                          <Mono dim>host $ </Mono>
                          <Mono>id {HOST_BASE}</Mono>
                          <div className="mt-1">
                            <Mono>uid={HOST_BASE} gid={HOST_BASE} groups={HOST_BASE}</Mono>
                          </div>
                        </div>
                        <div className="u-hairline-top pt-4 text-bone-dim">
                          <Mono dim>
                            # the &ldquo;root&rdquo; build process owns nothing privileged here
                          </Mono>
                          <div className="mt-2">
                            <Mono dim>host $ </Mono>
                            <Mono>cat /etc/shadow # as that uid</Mono>
                          </div>
                          <div className="mt-1" style={{ color: "var(--color-signal)" }}>
                            <Mono>Permission denied</Mono>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 u-plate p-4">
              <span
                className="mt-0.5 inline-block h-4 w-4 shrink-0"
                style={{ background: "var(--color-verify)" }}
                aria-hidden
              />
              <p className="text-sm leading-snug text-bone-dim">
                <span className="text-bone">Takeaway:</span> a fully compromised
                build — even running as root — maps to an unprivileged host user
                with no host filesystem and no privileged capabilities. The blast
                radius ends at the container boundary.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
